import { z } from "zod";


const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

 const storeTypeValidation  = z.object({
    name: z
    .string({ required_error: "name is required" }).trim(),
    description:z.string().trim().optional(),
    icon:z.string().trim().optional(),
});

const workingDayValidation = z.object({
    isEnabled:z.boolean().default(true),
    open:z.string().regex(timeRegex,"Opening time must be in HH:mm").optional(),
    close:z.string().regex(timeRegex,"Closing time must be in HH:mm format").optional(),
});


export const createStoreValidation = z.object({
    owner:z.string({required_error:"User is required"}),
    storeType:z.string({required_error:"Store type is required"}),
    name:z.string({required_error:"name is required"}).trim().min(2,"Store name must be at least 2 character"),
    description:z.string().trim().optional(),
    logo:z.string().trim().optional(),
    coverImage:z.string().trim().optional(),
    phone:z.string({required_error:"Phone number is required"}),
    email:z.string().email("invalid email address").trim().optional(),

  workingHours: z
    .object({
      monday: workingDayValidation,
      tuesday: workingDayValidation,
      wednesday: workingDayValidation,
      thursday: workingDayValidation,
      friday: workingDayValidation,
      saturday: workingDayValidation,
      sunday: workingDayValidation,
    })
    .optional(),

  deliveryEnabled: z
    .boolean()
    .default(true),

  pickupEnabled: z
    .boolean()
    .default(true),

  settings: z
    .record(z.any())
    .optional(),
})
export default storeTypeValidation;