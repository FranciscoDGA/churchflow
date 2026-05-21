import type { Person, Visitor, Cell, FinancialTransaction, Event, Ministry, PrayerRequest } from '@/types'

export const mockMembers: Person[] = [
  { id: '1', church_id: '1', name: 'João Silva Santos', phone: '(11) 99999-0001', whatsapp: '(11) 99999-0001', email: 'joao@email.com', birth_date: '1985-03-15', marital_status: 'casado', gender: 'masculino', type: 'membro', status: 'ativo', entry_date: '2018-01-10', baptism_date: '2018-03-20', ministry: 'Louvor', created_at: '2018-01-10', updated_at: '2024-01-01' },
  { id: '2', church_id: '1', name: 'Maria Oliveira Costa', phone: '(11) 99999-0002', whatsapp: '(11) 99999-0002', email: 'maria@email.com', birth_date: '1990-07-22', marital_status: 'casado', gender: 'feminino', type: 'membro', status: 'ativo', entry_date: '2019-05-15', baptism_date: '2019-07-01', ministry: 'Intercessão', created_at: '2019-05-15', updated_at: '2024-01-01' },
  { id: '3', church_id: '1', name: 'Pedro Almeida Ferreira', phone: '(11) 99999-0003', birth_date: '1978-11-08', gender: 'masculino', type: 'membro', status: 'ativo', entry_date: '2015-08-20', baptism_date: '2015-10-12', ministry: 'Diaconato', created_at: '2015-08-20', updated_at: '2024-01-01' },
  { id: '4', church_id: '1', name: 'Ana Paula Rodrigues', phone: '(11) 99999-0004', email: 'ana@email.com', birth_date: '1995-05-20', marital_status: 'solteiro', gender: 'feminino', type: 'membro', status: 'ativo', entry_date: '2021-02-14', ministry: 'Infantil', created_at: '2021-02-14', updated_at: '2024-01-01' },
  { id: '5', church_id: '1', name: 'Carlos Eduardo Lima', phone: '(11) 99999-0005', birth_date: '1982-09-12', gender: 'masculino', type: 'membro', status: 'afastado', entry_date: '2016-06-01', created_at: '2016-06-01', updated_at: '2024-01-01' },
  { id: '6', church_id: '1', name: 'Fernanda Souza Melo', phone: '(11) 99999-0006', birth_date: '1998-01-30', marital_status: 'solteiro', gender: 'feminino', type: 'jovem', status: 'ativo', entry_date: '2022-03-10', ministry: 'Jovens', created_at: '2022-03-10', updated_at: '2024-01-01' },
  { id: '7', church_id: '1', name: 'Roberto Carvalho Neto', phone: '(11) 99999-0007', birth_date: '1975-12-05', marital_status: 'casado', gender: 'masculino', type: 'membro', status: 'ativo', entry_date: '2012-09-15', baptism_date: '2012-11-20', ministry: 'Evangelismo', created_at: '2012-09-15', updated_at: '2024-01-01' },
  { id: '8', church_id: '1', name: 'Luciana Martins Dias', phone: '(11) 99999-0008', birth_date: '1992-04-18', marital_status: 'solteiro', gender: 'feminino', type: 'membro', status: 'ativo', entry_date: '2020-07-22', ministry: 'Mídia', created_at: '2020-07-22', updated_at: '2024-01-01' },
]

export const mockVisitors: Visitor[] = [
  { id: '1', church_id: '1', name: 'Thiago Pereira', phone: '(11) 98888-0001', whatsapp: '(11) 98888-0001', origin: 'Indicação de amigo', visit_date: '2025-05-10', status: 'em_acompanhamento', created_at: '2025-05-10' },
  { id: '2', church_id: '1', name: 'Camila Ferraz', phone: '(11) 98888-0002', email: 'camila@email.com', origin: 'Redes sociais', visit_date: '2025-05-14', status: 'novo', created_at: '2025-05-14' },
  { id: '3', church_id: '1', name: 'Diego Nascimento', phone: '(11) 98888-0003', origin: 'Culto ao ar livre', visit_date: '2025-05-07', status: 'convertido', created_at: '2025-05-07' },
  { id: '4', church_id: '1', name: 'Patrícia Gomes', phone: '(11) 98888-0004', origin: 'Família de membro', visit_date: '2025-04-28', status: 'integrado', created_at: '2025-04-28' },
  { id: '5', church_id: '1', name: 'Marcos Vieira', phone: '(11) 98888-0005', origin: 'Busca espiritual', visit_date: '2025-05-18', status: 'novo', created_at: '2025-05-18' },
]

export const mockCells: Cell[] = [
  { id: '1', church_id: '1', name: 'Célula Esperança', leader_name: 'João Silva', sector: 'Norte', network: 'Rede Família', meeting_day: 'Terça-feira', meeting_time: '19:30', status: 'ativa', members_count: 12, created_at: '2020-01-01' },
  { id: '2', church_id: '1', name: 'Célula Renovação', leader_name: 'Maria Oliveira', sector: 'Sul', network: 'Rede Família', meeting_day: 'Quinta-feira', meeting_time: '20:00', status: 'ativa', members_count: 8, created_at: '2020-06-01' },
  { id: '3', church_id: '1', name: 'Célula Jovem Fogo', leader_name: 'Fernanda Souza', sector: 'Centro', network: 'Rede Jovens', meeting_day: 'Sábado', meeting_time: '17:00', status: 'ativa', members_count: 15, created_at: '2021-01-01' },
  { id: '4', church_id: '1', name: 'Célula Vitória', leader_name: 'Roberto Carvalho', sector: 'Leste', network: 'Rede Família', meeting_day: 'Quarta-feira', meeting_time: '19:30', status: 'ativa', members_count: 10, created_at: '2021-08-01' },
  { id: '5', church_id: '1', name: 'Célula Nova Vida', leader_name: 'Ana Paula', sector: 'Oeste', network: 'Rede Família', meeting_day: 'Segunda-feira', meeting_time: '20:00', status: 'em_formacao', members_count: 4, created_at: '2025-04-01' },
]

export const mockTransactions: FinancialTransaction[] = [
  { id: '1', church_id: '1', description: 'Dízimo - João Silva', amount: 500, type: 'receita', category_name: 'Dízimos', date: '2025-05-18', payment_method: 'Pix', created_at: '2025-05-18' },
  { id: '2', church_id: '1', description: 'Oferta Culto Domingo', amount: 1250, type: 'receita', category_name: 'Ofertas', date: '2025-05-18', payment_method: 'Dinheiro', created_at: '2025-05-18' },
  { id: '3', church_id: '1', description: 'Conta de Energia', amount: 380, type: 'despesa', category_name: 'Contas Fixas', date: '2025-05-15', payment_method: 'Débito', created_at: '2025-05-15' },
  { id: '4', church_id: '1', description: 'Dízimo - Maria Oliveira', amount: 300, type: 'receita', category_name: 'Dízimos', date: '2025-05-17', payment_method: 'Pix', created_at: '2025-05-17' },
  { id: '5', church_id: '1', description: 'Aluguel do Templo', amount: 2500, type: 'despesa', category_name: 'Aluguel', date: '2025-05-05', payment_method: 'Transferência', created_at: '2025-05-05' },
  { id: '6', church_id: '1', description: 'Campanha Missionária', amount: 800, type: 'receita', category_name: 'Campanhas', date: '2025-05-11', payment_method: 'Pix', created_at: '2025-05-11' },
  { id: '7', church_id: '1', description: 'Material de Limpeza', amount: 145, type: 'despesa', category_name: 'Manutenção', date: '2025-05-10', payment_method: 'Dinheiro', created_at: '2025-05-10' },
  { id: '8', church_id: '1', description: 'Oferta Especial Células', amount: 620, type: 'receita', category_name: 'Ofertas', date: '2025-05-09', payment_method: 'Pix', created_at: '2025-05-09' },
  { id: '9', church_id: '1', description: 'Internet', amount: 120, type: 'despesa', category_name: 'Contas Fixas', date: '2025-05-08', payment_method: 'Débito', created_at: '2025-05-08' },
  { id: '10', church_id: '1', description: 'Dízimo - Pedro Almeida', amount: 450, type: 'receita', category_name: 'Dízimos', date: '2025-05-07', payment_method: 'Pix', created_at: '2025-05-07' },
]

export const mockEvents: Event[] = [
  { id: '1', church_id: '1', title: 'Culto Dominical', type: 'culto', start_date: '2025-05-25T09:00', end_date: '2025-05-25T11:00', location: 'Templo Principal', recurrence: 'semanal', color: '#0EA5E9', created_at: '2025-01-01' },
  { id: '2', church_id: '1', title: 'Culto de Quarta', type: 'culto', start_date: '2025-05-21T19:30', end_date: '2025-05-21T21:00', location: 'Templo Principal', recurrence: 'semanal', color: '#0EA5E9', created_at: '2025-01-01' },
  { id: '3', church_id: '1', title: 'Reunião de Líderes', type: 'reuniao', start_date: '2025-05-23T19:00', end_date: '2025-05-23T21:00', location: 'Sala de Reuniões', color: '#7C3AED', created_at: '2025-05-01' },
  { id: '4', church_id: '1', title: 'Seminário de Liderança', type: 'evento', start_date: '2025-05-31T08:00', end_date: '2025-05-31T18:00', location: 'Auditório', color: '#10B981', created_at: '2025-05-01' },
  { id: '5', church_id: '1', title: 'Ensaio da Banda', type: 'ensaio', start_date: '2025-05-22T19:00', location: 'Sala de Música', recurrence: 'semanal', color: '#F59E0B', created_at: '2025-01-01' },
]

export const mockMinistries: Ministry[] = [
  { id: '1', church_id: '1', name: 'Ministério de Louvor', leader_name: 'João Silva', description: 'Louvor e adoração nos cultos', members_count: 12, created_at: '2020-01-01' },
  { id: '2', church_id: '1', name: 'Ministério Infantil', leader_name: 'Ana Paula', description: 'Cuidado e ensino das crianças', members_count: 8, created_at: '2020-01-01' },
  { id: '3', church_id: '1', name: 'Ministério de Intercessão', leader_name: 'Maria Oliveira', description: 'Equipe de oração e intercessão', members_count: 15, created_at: '2020-01-01' },
  { id: '4', church_id: '1', name: 'Ministério de Evangelismo', leader_name: 'Roberto Carvalho', description: 'Ações de evangelização e missões', members_count: 10, created_at: '2020-06-01' },
  { id: '5', church_id: '1', name: 'Ministério de Mídia', leader_name: 'Luciana Martins', description: 'Transmissão, redes sociais e tecnologia', members_count: 6, created_at: '2021-01-01' },
]

export const mockPrayerRequests: PrayerRequest[] = [
  { id: '1', church_id: '1', person_name: 'Família Santos', category: 'Saúde', description: 'Oração pela recuperação de saúde', priority: 'alta', status: 'em_oracao', created_at: '2025-05-15', updated_at: '2025-05-18' },
  { id: '2', church_id: '1', person_name: 'Marcos Vieira', category: 'Família', description: 'Restauração do casamento', priority: 'urgente', status: 'aberto', created_at: '2025-05-18', updated_at: '2025-05-18' },
  { id: '3', church_id: '1', person_name: 'Camila Ferraz', category: 'Provisão', description: 'Emprego e provisão financeira', priority: 'media', status: 'aberto', created_at: '2025-05-14', updated_at: '2025-05-14' },
  { id: '4', church_id: '1', person_name: 'Diego Nascimento', category: 'Salvação', description: 'Pedido pela família não convertida', priority: 'baixa', status: 'respondido', created_at: '2025-04-10', updated_at: '2025-05-10' },
]

export const monthlyFinancialData = [
  { month: 'Jan', receitas: 8500, despesas: 5200 },
  { month: 'Fev', receitas: 9200, despesas: 5800 },
  { month: 'Mar', receitas: 8800, despesas: 6100 },
  { month: 'Abr', receitas: 10500, despesas: 5900 },
  { month: 'Mai', receitas: 11200, despesas: 6300 },
  { month: 'Jun', receitas: 9800, despesas: 5700 },
]

export const memberGrowthData = [
  { month: 'Jan', membros: 142, visitantes: 18 },
  { month: 'Fev', membros: 148, visitantes: 22 },
  { month: 'Mar', membros: 152, visitantes: 25 },
  { month: 'Abr', membros: 158, visitantes: 19 },
  { month: 'Mai', membros: 163, visitantes: 28 },
  { month: 'Jun', membros: 168, visitantes: 31 },
]

export const ministryDistributionData = [
  { name: 'Louvor', value: 12, fill: '#0EA5E9' },
  { name: 'Infantil', value: 8, fill: '#10B981' },
  { name: 'Intercessão', value: 15, fill: '#7C3AED' },
  { name: 'Evangelismo', value: 10, fill: '#F59E0B' },
  { name: 'Mídia', value: 6, fill: '#F43F5E' },
]

export const birthdaysToday: { name: string; age: number; phone?: string }[] = [
  { name: 'Ana Paula Rodrigues', age: 30, phone: '(11) 99999-0004' },
  { name: 'Carlos Eduardo Lima', age: 43, phone: '(11) 99999-0005' },
]

export const weddingAnniversariesToday: { name: string; years: number; phone?: string }[] = [
  { name: 'João e Maria Silva', years: 12, phone: '(11) 99999-0001' },
]
