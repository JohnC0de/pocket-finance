import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { UserButton } from "@clerk/nextjs"

type BillsPerMonth = {
  month: string
  debts: Bill[]
}

type Bill = {
  id: string
  data: string
  nome: string
  valor: number
  parcelas?: number
  conta: string
  categoria: string
  tipo: string
}

const dataPerMonth: BillsPerMonth[] = [
  {
    month: "Junho",
    debts: [
      {
        id: "0",
        data: "2023-06-17T17:52",
        nome: "Uber Viagem",
        valor: 59.92,
        conta: "Nubank",
        categoria: "Transporte",
        tipo: "Débito"
      },
      {
        id: "1",
        data: "2023-06-04T20:23",
        nome: "Burger King App",
        valor: 115.92,
        parcelas: 2,
        conta: "Nubank",
        categoria: "Alimentação",
        tipo: "Débito"
      },
      {
        id: "2",
        data: "2023-06-17T17:52",
        nome: "Uber Viagem",
        valor: 59.92,
        conta: "Nubank",
        categoria: "Transporte",
        tipo: "Débito"
      }
    ]
  },
  { month: "Julho", debts: [] },
  { month: "Agosto", debts: [] }
]

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-8">
      <UserButton afterSignOutUrl="/" />
      <div className="w-96 rounded-lg border border-slate-600">
        {/* If is open bg-slate-50 and hover 100 */}
        {dataPerMonth.map(({ month, debts }) => (
          <BillsPerMonth key={month} month={month} debts={debts} />
        ))}
      </div>
    </main>
  )
}

function groupDebtsByDay(debts: Bill[]): { [key: string]: Bill[] } {
  return debts.reduce<{ [key: string]: Bill[] }>((acc, debt) => {
    const [calendar] = debt.data.split("T")
    if (!acc[calendar]) acc[calendar] = []
    acc[calendar].push(debt)
    return acc
  }, {})
}

function BillsPerMonth({ month, debts }: BillsPerMonth) {
  const debtsGroupedByDay = groupDebtsByDay(debts)

  return (
    <Collapsible>
      <CollapsibleTrigger className="border-b border-slate-600 flex w-full py-2 px-2 justify-between hover:bg-slate-50">
        <div className="space-x-2">
          <span>{month}</span>
          <span>
            {debts.length ? (
              <Badge variant={"outline"}>{debts.length}</Badge>
            ) : null}
          </span>
        </div>
        <span>
          {debts.length ? (
            debts
              .reduce((acc, { valor }) => acc + valor, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })
          ) : (
            <p className="text-gray-400">Sem gastos</p>
          )}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {Object.entries(debtsGroupedByDay).map(([day, dayDebts]) => (
          <Collapsible key={day}>
            <CollapsibleTrigger className="border-b border-slate-400 flex w-full py-2 px-6 justify-between hover:bg-slate-50">
              <span>Dia {day.split("-")[2]}</span>
              {/* Total spent that day */}
              <span>
                {dayDebts
                  .reduce((acc, { valor }) => acc + valor, 0)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 px-12">
              {dayDebts.map(debt => (
                <div key={debt.id}>
                  <div className="flex gap-8 justify-between">
                    <span>{debt.nome}</span>
                    <span>
                      {debt.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </span>
                  </div>
                  <div className="flex gap-8 justify-between border-b">
                    <span>{debt.data.split("T")[1]}</span>
                    <span>{debt.parcelas ? `em ${debt.parcelas}x` : null}</span>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
