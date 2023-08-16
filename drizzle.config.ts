import type { Config } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({ path: "./.env.local" })

export default {
  schema: "./lib/drizzle/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN
  }
} satisfies Config
