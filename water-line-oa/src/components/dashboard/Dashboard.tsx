import { OrderWithDetails } from "@/app/dashboard/action";
import type { Liff } from "@line/liff";

export default async function Dashboard({
  liff,
  liffError,
  orders,
}: {
  liff: Liff | null;
  liffError: string | null;
  orders: OrderWithDetails[];
}) {
  return (
    <main
      className={`bg-gradient-to-b from-black to-slate-500 min-h-screen text-white flex flex-col items-center justify-center w-full h-full`}
    >
      <h1 className="text-4xl font-bold text-center w-full">
        Ordering Water Tech Demo
      </h1>
      {liff && <p>{liff.getIDToken()}</p>}
      {liff && (
        <p>
          Name :{liff.getDecodedIDToken() ? liff.getDecodedIDToken()?.name : ""}
        </p>
      )}
      {liff && (
        <p>
          Email :
          {liff.getDecodedIDToken() ? liff.getDecodedIDToken()?.email : ""}
        </p>
      )}
      {liffError && <p>An error has occured</p>}
      {orders.map((order) => {
        return (
          <div key={order.id} className="flex flex-row">
            <p>Id : {order.id}</p>
            <p>Status : {order.status}</p>
            <p>User.name : {order.user?.name}</p>
            <p>
              {order.orderItems.map((orderItem) => {
                return (
                  <p
                    key={orderItem.id}
                  >{`${orderItem.product?.name}, ${orderItem.quantity}`}</p>
                );
              })}
            </p>
          </div>
        );
      })}
    </main>
  );
}
