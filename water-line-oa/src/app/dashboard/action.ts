"use server"

import { prisma } from "@/lib/db";
import { OrderEnum } from "@prisma/client";

export type OrderWithDetails = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderEnum;
    userId: string | null;
    deliveryLocation: string | null;
    deliveryDate: Date | null;
    orderItems: {
      id: number;
      priceAtPurchase: number;
      quantity: number;
      product: {
        name: string;
      };
    }[];
    user: {
      name: string | null;
    } | null;
  };
  
  export async function getOrders(): Promise<OrderWithDetails[]> {
    return await prisma.order.findMany({
    include : {
        orderItems : {
            select: {
                id : true,
                priceAtPurchase : true,
                quantity : true,
                product : {
                    select : {
                        name : true,
                    }
                }
            }
        },
        user : {
            select : {
                name : true
            }
        }
    }})
}