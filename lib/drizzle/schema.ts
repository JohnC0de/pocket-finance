import {
  integer,
  numeric,
  real,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import type { InferModel } from "drizzle-orm"

export const transaction = sqliteTable("transaction", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  accountId: integer("accountId").notNull(),
  description: text("description").notNull(),
  amount: real("amount"),
  date: integer("date", { mode: "number" }).notNull(),
  category: text("category").notNull(),
  type: text("type").notNull()
})

export const budget = sqliteTable("budget", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  amount: real("amount"),
  category: text("category").notNull(),
  startDate: integer("startDate").notNull(),
  endDate: integer("endDate").notNull()
})

export const category = sqliteTable("category", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description") // Since it's optional
})

export const bill = sqliteTable("bill", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  name: text("name").notNull(),
  dueDate: integer("dueDate").notNull(),
  amount: real("amount"),
  isPaid: integer("isPaid", { mode: "boolean" }).notNull()
})

export const savingsGoal = sqliteTable("savingsGoal", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  name: text("name").notNull(),
  targetAmount: numeric("targetAmount").notNull(),
  currentAmount: integer("currentAmount", { mode: "boolean" }).notNull(),
  targetDate: integer("targetDate").notNull()
})

export type Transaction = InferModel<typeof transaction>
export type Budget = InferModel<typeof budget>
export type Category = InferModel<typeof category>
export type Bill = InferModel<typeof bill>
export type SavingsGoal = InferModel<typeof savingsGoal>
