'use client'

import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useState } from 'react'

export default function BillsPerMonth({ month, debts }: BillsPerMonthProps) {
  const [isOpen, setIsOpen] = useState(false)
  const debtsGroupedByDay = groupDebtsByDay(debts)

  return (
    <Collapsible>
      <CollapsibleTrigger
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full justify-between border-b border-slate-400 p-2 font-semibold text-slate-700 hover:bg-slate-50 ${
          isOpen ? 'bg-slate-100' : ''
        }`}
      >
        <div className="space-x-2">
          <span>{month}</span>
          {!isOpen && debts.length ? (
            <Badge variant={'outline'} className="border-slate-300 ">
              {debts.length}
            </Badge>
          ) : null}
        </div>
        <span>
          {debts.length ? (
            toCurrency(sumDebtValues(debts))
          ) : (
            <p className="font-medium text-slate-400">Sem gastos</p>
          )}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {Object.entries(debtsGroupedByDay).map(([day, dayDebts]) => (
          <DayDebts key={day} day={day} dayDebts={dayDebts} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function DayDebts({ day, dayDebts }: { day: string; dayDebts: Bill[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible key={day}>
      <CollapsibleTrigger
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full justify-between border-b border-slate-200 px-6 py-2 font-medium text-slate-700 hover:bg-slate-50 ${
          isOpen ? 'bg-slate-100' : ''
        }`}
      >
        <span>Dia {day.split('-')[2]}</span>
        <span>{toCurrency(sumDebtValues(dayDebts))}</span>
      </CollapsibleTrigger>
      {dayDebts.map((debt) => (
        <DebtDetails key={debt.id} debt={debt} />
      ))}
    </Collapsible>
  )
}

function DebtDetails({ debt }: { debt: Bill }) {
  return (
    <CollapsibleContent className="px-8 py-2 text-slate-700 hover:bg-slate-50">
      <div className="flex justify-between">
        <span>{debt.nome}</span>
        <span>{toCurrency(debt.valor)}</span>
      </div>
      <div className="flex justify-between">
        <span>{debt.data.split('T')[1]}</span>
        <span>{debt.parcelas ? `em ${debt.parcelas}x` : null}</span>
      </div>
      {/* <div className="flex justify-between border-b border-slate-100 pb-2 leading-none tracking-tighter">
        <Badge className="cursor-pointer bg-purple-700 p-1 leading-none tracking-tighter opacity-60 hover:bg-purple-600">
          {debt.conta}
        </Badge>
        <Badge className="cursor-pointer p-1 leading-none  tracking-tighter opacity-60">
          {debt.categoria}
        </Badge>
      </div> */}
    </CollapsibleContent>
  )
}

function sumDebtValues(debts: Bill[]): number {
  return debts.reduce((total, { valor }) => total + valor, 0)
}

function toCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function groupDebtsByDay(debts: Bill[]): { [key: string]: Bill[] } {
  return debts.reduce<{ [key: string]: Bill[] }>((groupedDebts, debt) => {
    const [calendar] = debt.data.split('T')
    if (!groupedDebts[calendar]) groupedDebts[calendar] = []
    groupedDebts[calendar].push(debt)
    return groupedDebts
  }, {})
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

type BillsPerMonthProps = {
  month: string
  debts: Bill[]
}
