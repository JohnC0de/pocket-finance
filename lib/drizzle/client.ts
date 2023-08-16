import { drizzle as drizzleConnection } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "./schema"
import process from "process"

const client = createClient({
  url: process.env.DB_URL || "",
  authToken: process.env.DB_TOKEN
})

export const db = drizzleConnection(client, { schema })
