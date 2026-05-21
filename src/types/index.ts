export type UserRole = 'master' | 'pastor' | 'secretario' | 'financeiro' | 'lider_celula' | 'professor' | 'membro'

export type PersonType = 'membro' | 'visitante' | 'crianca' | 'adolescente' | 'jovem' | 'congregado' | 'novo_convertido'

export type PersonStatus = 'ativo' | 'afastado' | 'transferido' | 'falecido' | 'visitante_recorrente'

export type VisitorStatus = 'novo' | 'em_acompanhamento' | 'convertido' | 'integrado' | 'inativo'

export type PrayerStatus = 'aberto' | 'em_oracao' | 'respondido' | 'arquivado'

export type TransactionType = 'receita' | 'despesa'

export type CellStatus = 'ativa' | 'inativa' | 'em_formacao'

export type EventType = 'culto' | 'reuniao' | 'ensaio' | 'aconselhamento' | 'evento' | 'aniversario' | 'casamento' | 'outro'

export type Plan = 'lite' | 'plus' | 'max'

export interface Organization {
  id: string
  name: string
  plan: Plan
  created_at: string
}

export interface Church {
  id: string
  organization_id: string
  name: string
  cnpj?: string
  pastor?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  logo_url?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  role: UserRole
  church_id: string
  organization_id: string
  created_at: string
}

export interface Person {
  id: string
  church_id: string
  name: string
  photo_url?: string
  phone?: string
  whatsapp?: string
  email?: string
  birth_date?: string
  marital_status?: 'solteiro' | 'casado' | 'divorciado' | 'viuvo'
  gender?: 'masculino' | 'feminino'
  address?: string
  neighborhood?: string
  city?: string
  state?: string
  zip_code?: string
  type: PersonType
  status: PersonStatus
  entry_date?: string
  baptism_date?: string
  role?: string
  ministry?: string
  cell_id?: string
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Visitor {
  id: string
  church_id: string
  name: string
  phone?: string
  whatsapp?: string
  email?: string
  birth_date?: string
  origin?: string
  visit_date?: string
  event_id?: string
  responsible_id?: string
  status: VisitorStatus
  notes?: string
  created_at: string
}

export interface PrayerRequest {
  id: string
  church_id: string
  person_id?: string
  person_name: string
  category: string
  description: string
  priority: 'baixa' | 'media' | 'alta' | 'urgente'
  status: PrayerStatus
  team?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  church_id: string
  title: string
  description?: string
  type: EventType
  start_date: string
  end_date?: string
  location?: string
  responsible_id?: string
  recurrence?: 'nenhuma' | 'diaria' | 'semanal' | 'mensal'
  color?: string
  created_at: string
}

export interface Cell {
  id: string
  church_id: string
  name: string
  leader_id?: string
  leader_name?: string
  sector?: string
  supervisor?: string
  network?: string
  address?: string
  city?: string
  meeting_day?: string
  meeting_time?: string
  status: CellStatus
  members_count: number
  created_at: string
}

export interface CellMeeting {
  id: string
  cell_id: string
  date: string
  study_topic?: string
  presence_count: number
  visitors_count: number
  notes?: string
  created_at: string
}

export interface FinancialCategory {
  id: string
  church_id: string
  name: string
  type: TransactionType
  color?: string
}

export interface FinancialTransaction {
  id: string
  church_id: string
  description: string
  amount: number
  type: TransactionType
  category_id?: string
  category_name?: string
  date: string
  payment_method?: string
  person_id?: string
  person_name?: string
  notes?: string
  created_at: string
}

export interface Ministry {
  id: string
  church_id: string
  name: string
  leader_id?: string
  leader_name?: string
  description?: string
  members_count: number
  created_at: string
}

export interface Course {
  id: string
  church_id: string
  name: string
  teacher_id?: string
  teacher_name?: string
  description?: string
  start_date?: string
  end_date?: string
  students_count: number
  status: 'ativo' | 'concluido' | 'cancelado'
  created_at: string
}

export interface Asset {
  id: string
  church_id: string
  name: string
  category: string
  description?: string
  acquisition_date?: string
  value?: number
  condition: 'otimo' | 'bom' | 'regular' | 'ruim'
  responsible?: string
  photo_url?: string
  created_at: string
}

export interface KpiCard {
  id: string
  title: string
  value: string | number
  icon: string
  color: string
  bgColor: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  href?: string
}

export interface SidebarMenuItem {
  id: string
  label: string
  icon?: string
  href?: string
  children?: SidebarMenuItem[]
  requiredPlan?: Plan
  requiredRole?: UserRole[]
  badge?: string | number
}
