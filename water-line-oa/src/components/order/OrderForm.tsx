"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Liff } from "@line/liff";
import { createOrder } from "@/app/order/action";
import { useState } from "react";

const DEFAULT_PRODUCT_ID = 1;

const FormSchema = z.object({
  deliveryDate: z.date({
    required_error: "A delivery date is required.",
  }),
  name: z.string({}),
  waterAmount: z.number({}),
  location: z.string({}),
  phoneNumber: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

export interface OrderFormData extends FormData {
  products: { productId: number; quantity: number }[];
}

export default function OrderForm({
  liff,
  liffError,
}: {
  liff: Liff | null;
  liffError: string | null;
}) {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: FormData) {
    if (liffError) return;
    if (!liff) return;
    setIsLoading(true);
    const orderData = {
      ...data,
      products: [{ productId: DEFAULT_PRODUCT_ID, quantity: data.waterAmount }],
    };
    createOrder(orderData, liff).then((res) => {
      setIsLoading(false);
      if (res) {
        alert("Order created successfully");
        form.reset();
      } else {
        alert("Failed to create order");
      }
      window.location.reload();
    });
    console.log(orderData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>ชื่อผู้ติดต่อ</FormLabel>
              <FormControl>
                <Input onChange={field.onChange}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <FormControl>
                <Input onChange={field.onChange}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="waterAmount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>ปริมาณน้ำเปล่า (แพ็ค)</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>สถานที่จัดส่ง</FormLabel>
              <FormControl>
                <Input onChange={field.onChange}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>วันที่ส่งน้ำ</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal border border-white"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>เลือกวันที่</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black-500 hover:bg-black-600"
            }
          >
            ส่ง Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
