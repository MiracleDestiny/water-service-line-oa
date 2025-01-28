import React from "react";
import { getOrders } from "./action";
import LiffDashboard from "@/components/dashboard/LiffDashboard";

export default async function DashboardPage() {
  const orders = await getOrders();

  return <LiffDashboard orders={orders} />;
}
