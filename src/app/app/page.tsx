'use client'

import Link from 'next/link'
import {
  Users, UserPlus, Layers, DollarSign, Heart, Calendar,
  TrendingUp, TrendingDown, ArrowRight, Cake, Gift, AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  mockMembers, mockVisitors, mockCells, mockTransactions,
  monthlyFinancialData, memberGrowthData, ministryDistributionData,
  birthdaysToday, weddingAnniversariesToday
} from '@/lib/mock-data'

const totalReceitas = mockTransactions.filter(t => t.type === 'receita').reduce((acc, t) => acc + t.amount, 0)
const totalDespesas = mockTransactions.filter(t => t.type === 'despesa').reduce((acc, t) => acc + t.amount, 0)

const kpis = [
  { title: 'Total de Membros', value: mockMembers.filter(m => m.status === 'ativo').length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', change: '+5 este mês', changeType: 'up', href: '/app/membros' },
  { title: 'Visitantes', value: mockVisitors.length, icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-50', change: '+3 esta semana', changeType: 'up', href: '/app/visitantes' },
  { title: 'Células Ativas', value: mockCells.filter(c => c.status === 'ativa').length, icon: Layers, color: 'text-orange-500', bg: 'bg-orange-50', change: '1 em formação', changeType: 'neutral', href: '/app/celulas' },
  { title: 'Receitas do Mês', value: `R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', change: '+12% vs mês ant.', changeType: 'up', href: '/app/financeiro' },
  { title: 'Despesas do Mês', value: `R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50', change: '-3% vs mês ant.', changeType: 'down', href: '/app/financeiro' },
  { title: 'Saldo do Mês', value: `R$ ${(totalReceitas - totalDespesas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-teal-500', bg: 'bg-teal-50', change: 'Saldo positivo', changeType: 'up', href: '/app/financeiro' },
  { title: 'Pedidos de Oração', value: 4, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50', change: '2 urgentes', changeType: 'neutral', href: '/app/oracao' },
  { title: 'Próximos Eventos', value: 3, icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50', change: 'Esta semana', changeType: 'neutral', href: '/app/agenda' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Painel Geral</h1>
          <p className="text-sm text-gray-500 mt-0.5">Quinta-feira, 21 de maio de 2025</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/relatorios" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>Ver relatórios</Link>
          <Link href="/app/pessoas" className={cn(buttonVariants({ size: 'sm' }), 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white')}>+ Cadastrar pessoa</Link>
        </div>
      </div>

      {(birthdaysToday.length > 0 || weddingAnniversariesToday.length > 0) && (
        <div className="flex flex-wrap gap-3">
          {birthdaysToday.map((b) => (
            <div key={b.name} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2.5">
              <Cake className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-[#0F172A]">{b.name}</span>
              <Badge className="text-xs bg-yellow-100 text-yellow-700 border-0">{b.age} anos</Badge>
            </div>
          ))}
          {weddingAnniversariesToday.map((w) => (
            <div key={w.name} className="flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-xl px-4 py-2.5">
              <Gift className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-[#0F172A]">{w.name}</span>
              <Badge className="text-xs bg-pink-100 text-pink-700 border-0">{w.years} anos juntos</Badge>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Link href={kpi.href} key={kpi.title} className="block group">
            <Card className="border border-gray-200 hover:shadow-md transition-all hover:border-[#0EA5E9]/30 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0EA5E9] transition-colors" />
                </div>
                <div className="text-2xl font-bold text-[#0F172A] mb-0.5">{kpi.value}</div>
                <div className="text-sm text-gray-500 mb-2">{kpi.title}</div>
                <div className={`flex items-center gap-1 text-xs ${kpi.changeType === 'up' ? 'text-green-600' : kpi.changeType === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                  {kpi.changeType === 'up' && <TrendingUp className="w-3 h-3" />}
                  {kpi.changeType === 'down' && <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Crescimento de Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={memberGrowthData}>
                <defs>
                  <linearGradient id="colorMembros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="membros" name="Membros" stroke="#0EA5E9" strokeWidth={2} fill="url(#colorMembros)" />
                <Area type="monotone" dataKey="visitantes" name="Visitantes" stroke="#7C3AED" strokeWidth={2} fill="url(#colorVisitantes)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Ministérios</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={ministryDistributionData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                  {ministryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {ministryDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-[#0F172A]">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Financeiro — Últimos 6 meses</CardTitle>
            <Link href="/app/financeiro" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-[#0EA5E9]')}>Ver tudo</Link>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyFinancialData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="receitas" name="Receitas" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" name="Despesas" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Movimentações Recentes</CardTitle>
            <Link href="/app/financeiro" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-[#0EA5E9] text-xs')}>Ver todas</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockTransactions.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0 mr-2">
                  <div className="text-sm font-medium text-[#0F172A] truncate">{t.description}</div>
                  <div className="text-xs text-gray-400">{t.category_name}</div>
                </div>
                <span className={`text-sm font-semibold flex-shrink-0 ${t.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                  {t.type === 'receita' ? '+' : '-'}R${t.amount.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Células</CardTitle>
            <Link href="/app/celulas" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-[#0EA5E9] text-xs')}>Ver todas</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockCells.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.leader_name} • {c.meeting_day}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#0F172A]">{c.members_count}</span>
                  <Badge className={`text-xs border-0 ${c.status === 'ativa' ? 'bg-green-100 text-green-700' : c.status === 'em_formacao' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.status === 'ativa' ? 'Ativa' : c.status === 'em_formacao' ? 'Em formação' : 'Inativa'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Novos Visitantes</CardTitle>
            <Link href="/app/visitantes" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-[#0EA5E9] text-xs')}>Ver todos</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockVisitors.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">{v.name}</div>
                  <div className="text-xs text-gray-400">{v.origin}</div>
                </div>
                <Badge className={`text-xs border-0 ${v.status === 'novo' ? 'bg-blue-100 text-blue-700' : v.status === 'convertido' ? 'bg-green-100 text-green-700' : v.status === 'integrado' ? 'bg-teal-100 text-teal-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {v.status === 'novo' ? 'Novo' : v.status === 'convertido' ? 'Convertido' : v.status === 'integrado' ? 'Integrado' : 'Acomp.'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#0F172A]">Pedidos de Oração</CardTitle>
            <Link href="/app/oracao" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-[#0EA5E9] text-xs')}>Ver todos</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: 'Família Santos', category: 'Saúde', priority: 'alta' },
              { name: 'Marcos Vieira', category: 'Família', priority: 'urgente' },
              { name: 'Camila Ferraz', category: 'Provisão', priority: 'media' },
              { name: 'Diego Nascimento', category: 'Salvação', priority: 'baixa' },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.category}</div>
                </div>
                <div className={`flex items-center gap-1 text-xs ${p.priority === 'urgente' ? 'text-red-500' : p.priority === 'alta' ? 'text-orange-500' : p.priority === 'media' ? 'text-yellow-500' : 'text-gray-400'}`}>
                  {(p.priority === 'urgente' || p.priority === 'alta') && <AlertCircle className="w-3 h-3" />}
                  {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
