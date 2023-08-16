import { db } from "@/lib/drizzle/client"

export default async function Home() {
  const transactions = await db.query.transaction.findMany()
  return (
    <main className="flex flex-col min-h-screen  items-center justify-center">
      <h1>Hello</h1>

      <div>
        {transactions.length > 0 ? (
          transactions.map(
            ({ id, accountId, amount, category, date, description, type }) => {
              return (
                <div className="border rounded-2xl p-4" key={id}>
                  <div>{accountId}</div>
                  <div>{amount}</div>
                  <div>{category}</div>
                  <div>{date}</div>
                  <div>{description}</div>
                  <div>{type}</div>
                </div>
              )
            }
          )
        ) : (
          <div>No transactions</div>
        )}
      </div>
    </main>
  )
}
