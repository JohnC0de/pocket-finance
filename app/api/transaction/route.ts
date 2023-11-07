import { db } from "@/lib/drizzle/client"
import { category, transaction } from "@/lib/drizzle/schema"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name } = body

    if (!userId) return new NextResponse("Unauthorized", { status: 401 })

    if (!name) return new NextResponse("Name is required", { status: 400 })

    // const store = await prismadb.store.create({
    //   data: {
    //     name,
    //     userId
    //   }
    // })

    const transactionData = await db.insert(category).values({
      name
    })

    return NextResponse.json(transactionData, { status: 201 })
  } catch (error) {
    console.log("TRANSACTION POST ERROR: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
