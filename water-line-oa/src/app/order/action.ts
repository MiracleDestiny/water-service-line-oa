"use server"

import { Liff } from "@line/liff";
import { prisma } from "@/lib/db";
import { Order, RoleEnum, User } from "@prisma/client";
import type { OrderFormData } from "@/components/order/OrderForm";


export async function createOrder(data: OrderFormData , liff : Liff): Promise<{user : User, order : Order} | undefined> {
  
  if(!liff.getIDToken() || !liff.getDecodedIDToken()) return;
  
  const lineInfo = await prisma.lineInfo.findUnique({
    where : {
      lineIdToken : liff.getIDToken() ?? undefined
    },
    select : {
      user : true
    }
  });
  let user: User;
  if(!lineInfo) {
    user = await createUser(liff);
  }else{
    user = lineInfo.user;
  };

  const currentProducts = await prisma.product.findMany({
    where : {
      id : {
        in : data.products.map((item) => item.productId)
      }
    }
  });

  const order = await prisma.order.create({
    data : {
      userId : user.id,
      status : "PENDING",
      orderItems : {
        create : currentProducts.map((item, i) => {
          return {
            productId : item.id,
            priceAtPurchase : item.currentPrice,
            quantity : data.products[i].quantity
          }
        })
      },
      deliveryLocation : data.location,
      deliveryDate : data.deliveryDate, 
    }
  });

  return {user : user, order : order}; 
}

async function createUser(liff: Liff): Promise<User> {
  const user = await prisma.user.create({
    data : {
      name : liff.getDecodedIDToken()?.name ?? "",
      email : liff.getDecodedIDToken()?.email ?? "",
      role : RoleEnum.USER,
      lineInfo : {
        create : {
          lineIdToken : liff.getIDToken() ?? "",
          name : liff.getDecodedIDToken()?.name ?? ""
        }
    }
  }
  });
  return user;
}