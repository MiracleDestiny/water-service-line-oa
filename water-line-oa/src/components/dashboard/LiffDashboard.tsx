"use client";

import { OrderWithDetails } from "@/app/dashboard/action";
import Dashboard from "@/components/dashboard/Dashboard";
import { Liff } from "@line/liff";
import React, { useEffect, useState } from "react";

export default async function LiffDashboard({
  orders,
}: {
  orders: OrderWithDetails[];
}) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        console.log(process.env.NEXT_PUBLIC_LIFF_ID);
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? "" })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  return <Dashboard liff={liffObject} liffError={liffError} orders={orders} />;
}
