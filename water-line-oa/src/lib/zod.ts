import { z } from 'zod';

// Enum for Order status
const OrderEnum = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);

// User schema
const UserSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  name: z.string().optional(),
});

// Order schema
const OrderSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: OrderEnum.default("PENDING"),
  userId: z.string().cuid().nullable().optional(),
  user: UserSchema.optional(), // Optional relation
  orderItems: z.array(
    z.object({
      id: z.string().cuid(),
      orderId: z.string().cuid(),
      productId: z.string().cuid(),
      priceAtPurchase: z.number(),
      quantity: z.number().int(),
      createdAt: z.date(),
    })
  ),
});

// Product schema
const ProductSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  currentPrice: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  orderItems: z.array(
    z.object({
      id: z.string().cuid(),
      orderId: z.string().cuid(),
      productId: z.string().cuid(),
      priceAtPurchase: z.number(),
      quantity: z.number().int(),
      createdAt: z.date(),
    })
  ),
});

// OrderItem schema
const OrderItemSchema = z.object({
  id: z.string().cuid(),
  orderId: z.string().cuid(),
  productId: z.string().cuid(),
  priceAtPurchase: z.number(),
  quantity: z.number().int(),
  createdAt: z.date(),
});
type ZodUserSchema = z.infer<typeof UserSchema>;
type ZodOrderSchema = z.infer<typeof OrderSchema>;
type ZodOrderItemSchema = z.infer<typeof OrderItemSchema>;


// Export schemas
export { OrderEnum, UserSchema, OrderSchema, ProductSchema, OrderItemSchema };
export type { ZodUserSchema, ZodOrderSchema, ZodOrderItemSchema };
