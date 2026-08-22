import { z } from "zod";

 const storeTypeValidation  = z.object({
    name: z
    .string({ required_error: "name is required" }).trim(),
    description:z.string().trim().optional(),
    icon:z.string().trim().optional(),
})

export default storeTypeValidation;