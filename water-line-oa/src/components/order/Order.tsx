import type { Liff } from "@line/liff";
import OrderForm from "./OrderForm";

export default function Order({
  liff,
  liffError,
}: {
  liff: Liff | null;
  liffError: string | null;
}) {
  return (
    <main
      className={`bg-gradient-to-b from-black to-slate-500 min-h-screen text-white flex flex-col items-center justify-center`}
    >
      <h1 className="text-4xl font-bold">Ordering Water Tech Demo</h1>
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
      <OrderForm />
    </main>
  );
}
