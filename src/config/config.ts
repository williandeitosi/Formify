import { z } from "zod";

const configSchema = z.object({
  BASE_URL: z.coerce.string(),
});

const config = configSchema.parse({
  BASE_URL: process.env.BASE_URL,
});

export default config;
