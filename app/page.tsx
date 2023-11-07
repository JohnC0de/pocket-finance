import BillsPerMonth from '@/components/Bill'
import { UserButton } from '@clerk/nextjs'

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
    month: 'Junho',
    debts: [
      {
        id: '0',
        data: '2023-06-17T17:52',
        nome: 'Uber Viagem',
        valor: 59.92,
        conta: 'Nubank',
        categoria: 'Transporte',
        tipo: 'Débito',
      },
      {
        id: '1',
        data: '2023-06-04T20:23',
        nome: 'Burger King App',
        valor: 115.38,
        parcelas: 2,
        conta: 'Nubank',
        categoria: 'Alimentação',
        tipo: 'Débito',
      },
      {
        id: '2',
        data: '2023-06-17T17:52',
        nome: 'Mercado Carrefour',
        valor: 253.41,
        conta: 'Nubank',
        categoria: 'Transporte',
        tipo: 'Débito',
      },
      {
        id: '3',
        data: '2023-06-10T10:12',
        nome: 'Netflix Assinatura',
        valor: 45.9,
        conta: 'Nubank',
        categoria: 'Entretenimento',
        tipo: 'Débito',
      },
      {
        id: '4',
        data: '2023-06-22T12:15',
        nome: 'Academia SportLife',
        valor: 100.5,
        conta: 'Nubank',
        categoria: 'Saúde',
        tipo: 'Débito',
      },
    ],
  },
  {
    month: 'Julho',
    debts: [
      {
        id: '5',
        data: '2023-07-05T09:10',
        nome: 'Spotify Assinatura',
        valor: 26.9,
        conta: 'Nubank',
        categoria: 'Entretenimento',
        tipo: 'Débito',
      },
      {
        id: '6',
        data: '2023-07-15T14:20',
        nome: 'Padaria Estrela',
        valor: 18.75,
        conta: 'Nubank',
        categoria: 'Alimentação',
        tipo: 'Débito',
      },
    ],
  },
  {
    month: 'Agosto',
    debts: [
      {
        id: '7',
        data: '2023-08-12T11:30',
        nome: 'Posto Ipiranga Combustível',
        valor: 150.35,
        conta: 'Nubank',
        categoria: 'Transporte',
        tipo: 'Débito',
      },
      {
        id: '8',
        data: '2023-08-20T13:40',
        nome: 'Livraria Cultura',
        valor: 48.2,
        conta: 'Nubank',
        categoria: 'Educação',
        tipo: 'Débito',
      },
    ],
  },
  {
    month: 'Setembro',
    debts: [],
  },
]

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <UserButton afterSignOutUrl="/" />
      <div className="w-96 overflow-clip rounded-lg">
        {/* If is open bg-slate-50 and hover 100 */}
        {dataPerMonth.map(({ month, debts }) => (
          <BillsPerMonth key={month} month={month} debts={debts} />
        ))}
      </div>
    </main>
  )
}
