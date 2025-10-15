import { z } from "zod"

export const SchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be 10 digits"),
  email_id: z.string().email("Invalid email format"),
  image: z.instanceof(File, { message: "Image file is required" }),
})

export type SchoolInput = z.infer<typeof SchoolSchema>
