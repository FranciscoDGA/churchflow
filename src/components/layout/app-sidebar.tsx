'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Church, ChevronDown, ChevronRight, Lock, LayoutDashboard,
  Users, UserPlus, UserCheck, Baby, GraduationCap, Heart, Calendar,
  DollarSign, BookOpen, Building, Package, Settings, HelpCircle,
  BarChart3, Bell, CreditCard, Layers, Shield, QrCode, FileText,
  LogOut, ChevronLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SIDEBAR_MENU } from '@/lib/constants'
import type { Plan } from '@/types'

const ICON_MAP: Record<string, React.ElementType> = {
  novidades: Bell,
  atualizacoes: Bell,
  avisos: Bell,
  planos: CreditCard,
  'id-lite': CreditCard,
  'id-plus': CreditCard,
  'id-max': CreditCard,
  'meu-plano': CreditCard,
  secretaria: LayoutDashboard,
  painel: LayoutDashboard,
  pessoas: Users,
  membros: UserCheck,
  visitantes: UserPlus,
  criancas: Baby,
  adolescentes: Users,
  jovens: Users,
  'novos-convertidos': Heart,
  oracao: Heart,
  aconselhamento: Heart,
  agenda: Calendar,
  cultos: Church,
  documentos: FileText,
  qrcode: QrCode,
  celulas: Layers,
  redes: Layers,
  grupos: Layers,
  lideres: UserCheck,
  'reunioes-cel': Calendar,
  consolidacao: UserPlus,
  'relatorios-cel': BarChart3,
  financeiro: DollarSign,
  receitas: DollarSign,
  despesas: DollarSign,
  'contas-pagar': DollarSign,
  extrato: DollarSign,
  'graficos-fin': BarChart3,
  fornecedores: Building,
  recibos: FileText,
  ensino: BookOpen,
  cursos: BookOpen,
  classes: BookOpen,
  professores: GraduationCap,
  alunos: Users,
  organizacao: Building,
  ministerios: Building,
  departamentos: Building,
  escalas: Calendar,
  patrimonio: Package,
  bens: Package,
  ambientes: Building,
  reservas: Calendar,
  controle: Shield,
  igrejas: Church,
  usuarios: Users,
  'meu-perfil': Users,
  configuracoes: Settings,
  suporte: HelpCircle,
  ajuda: HelpCircle,
  chamado: HelpCircle,
}

interface AppSidebarProps {
  currentPlan?: Plan
  collapsed?: boolean
  onCollapse?: () => void
}

export function AppSidebar({ currentPlan = 'plus', collapsed = false, onCollapse }: AppSidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['secretaria', 'financeiro', 'celulas']))

  function toggleMenu(id: string) {
    setOpenMenus((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function planAllows(required?: Plan): boolean {
    if (!required) return true
    const order: Plan[] = ['lite', 'plus', 'max']
    return order.indexOf(currentPlan) >= order.indexOf(required)
  }

  return (
    <aside className={cn(
      'flex flex-col bg-[#111827] h-full transition-all duration-300 select-none',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-[#374151]', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center flex-shrink-0">
              <Church className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">ChurchFlow</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
            <Church className="w-5 h-5 text-white" />
          </div>
        )}
        {!collapsed && onCollapse && (
          <button onClick={onCollapse} className="text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Church selector */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-[#374151]">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-colors text-left">
            <div className="w-7 h-7 rounded-md bg-[#0EA5E9] flex items-center justify-center flex-shrink-0">
              <Church className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">Igreja Central</div>
              <div className="text-gray-400 text-xs truncate">São Paulo - SP</div>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
          </button>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin space-y-0.5">
        {SIDEBAR_MENU.map((section) => {
          const SectionIcon = ICON_MAP[section.id] || Layers
          const isLocked = !planAllows(section.requiredPlan)
          const isOpen = openMenus.has(section.id)

          if (!section.children) {
            return (
              <Link key={section.id} href={section.href || '#'} className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === section.href ? 'bg-[#0EA5E9] text-white' : 'text-gray-300 hover:bg-[#1F2937] hover:text-white'
              )}>
                <SectionIcon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{section.label}</span>}
              </Link>
            )
          }

          return (
            <div key={section.id}>
              <button
                onClick={() => !collapsed && toggleMenu(section.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                  'text-gray-300 hover:bg-[#1F2937] hover:text-white',
                  isOpen && !collapsed && 'text-white'
                )}
              >
                <SectionIcon className={cn('w-4 h-4 flex-shrink-0', isLocked && 'opacity-50')} />
                {!collapsed && (
                  <>
                    <span className={cn('flex-1 text-left', isLocked && 'opacity-50')}>{section.label}</span>
                    {isLocked && <Lock className="w-3 h-3 text-gray-500" />}
                    {!isLocked && (isOpen ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronRight className="w-3 h-3 text-gray-400" />)}
                  </>
                )}
              </button>

              {!collapsed && isOpen && !isLocked && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#374151] pl-3">
                  {section.children.map((item) => {
                    const ItemIcon = ICON_MAP[item.id] || ChevronRight
                    const itemLocked = !planAllows(item.requiredPlan)
                    const isActive = pathname === item.href

                    if (itemLocked) {
                      return (
                        <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 cursor-not-allowed">
                          <Lock className="w-3 h-3 flex-shrink-0" />
                          <span>{item.label}</span>
                        </div>
                      )
                    }

                    return (
                      <Link key={item.id} href={item.href || '#'} className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
                        isActive ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]' : 'text-gray-400 hover:text-white hover:bg-[#1F2937]'
                      )}>
                        <ItemIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[#374151]">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">J</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">João Silva</div>
              <div className="text-gray-400 text-xs">Pastor</div>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1F2937] transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Link>
        </div>
      )}
    </aside>
  )
}
