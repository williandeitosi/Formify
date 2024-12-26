import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.coerce.string(),
});

const apiConfig = configSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
export default apiConfig;
