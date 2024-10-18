const { z } = require("zod");

// AUTH VALIDATION SCHEMA
const authRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Must be not less than 6 characters" }),
  name: z.string().min(1, { message: "Field cannot be empty" }),
});

const authLoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Must be not less than 6 characters" }),
});

// USER VALIDATION SCHEMA
const getUserSchema = z.coerce.number();

const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required.").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .optional(),
});

// MARKET LIST VALIDATION SCHEMA

const marketItemSchema = z.object({
  productName: z.string().min(1, "Product name is required."),
  price: z.number().min(0, "Price must be a non-negative number."),
  quantity: z
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer.")
    .default(1),
});

const marketListSchema = z.object({
  items: z.array(marketItemSchema).nonempty("At least one item is required."),
});

module.exports = {
  marketListSchema,
  authRegisterSchema,
  authLoginSchema,
  getUserSchema,
  userUpdateSchema,
  marketItemSchema,
};
