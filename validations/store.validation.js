import { z } from "zod";
import { storeStatus } from "../utils/enums.js";

export const createStoreValidation = z.object({
  ownerId: z.string().optional(),

  storeTypeId: z.string({
    required_error: "storeTypeId is required",
  }),

  categoryId: z.string({
    required_error: "categoryId is required",
  }),

  name: z
    .string({
      required_error: "name is required",
    })
    .trim()
    .min(1, "name cannot be empty"),

  slug: z
    .string()
    .trim()
    .min(1, "slug cannot be empty")
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  logo: z
    .string()
    .trim()
    .optional(),

  coverImage: z
    .string()
    .trim()
    .optional(),

  phone: z
    .string()
    .trim()
    .optional(),

  email: z
    .string()
    .email("Invalid email")
    .optional(),

  deliveryEnabled: z
    .boolean()
    .optional(),

  pickupEnabled: z
    .boolean()
    .optional(),

  settings: z
    .record(z.any())
    .optional(),
});



const openingDayValidation = z
  .object({
    isEnabled: z.boolean().default(true),

    open: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Opening time must be in HH:mm format"
      )
      .optional(),

    close: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Closing time must be in HH:mm format"
      )
      .optional(),
  });


  const updateStoreSchema = z.object({
  storeType: z.string().optional(),
  category: z.string().optional(),
  name: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  deliveryEnabled: z.boolean().optional(),
  pickupEnabled: z.boolean().optional(),
  settings: z.record(z.any()).optional(),
});


const updateStoreStatusSchema = z.object({
  status: z.enum(storeStatus),
});