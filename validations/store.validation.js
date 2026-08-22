import { z } from "zod";

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
  })
  .superRefine((day, ctx) => {
    if (day.isEnabled && !day.open) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["open"],
        message: "Opening time is required when the day is enabled",
      });
    }

    if (day.isEnabled && !day.close) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["close"],
        message: "Closing time is required when the day is enabled",
      });
    }
  });