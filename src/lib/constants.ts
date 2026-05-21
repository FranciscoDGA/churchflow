import type { SidebarMenuItem } from '@/types'

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    id: 'novidades',
    label: 'Novidades',
    children: [
      { id: 'atualizacoes', label: 'Atualizações', href: '/app/novidades/atualizacoes' },
      { id: 'avisos', label: 'Avisos do Sistema', href: '/app/novidades/avisos' },
    ],
  },
  {
    id: 'planos',
    label: 'Planos',
    children: [
      { id: 'id-lite', label: 'ID Lite', href: '/app/planos/lite' },
      { id: 'id-plus', label: 'ID Plus', href: '/app/planos/plus' },
      { id: 'id-max', label: 'ID Max', href: '/app/planos/max' },
      { id: 'meu-plano', label: 'Meu Plano', href: '/app/planos' },
    ],
  },
  {
    id: 'secretaria',
    label: 'Secretaria',
    children: [
      { id: 'painel', label: 'Painel', href: '/app' },
      { id: 'pessoas', label: 'Pessoas', href: '/app/pessoas' },
      { id: 'membros', label: 'Membros', href: '/app/membros' },
      { id: 'visitantes', label: 'Visitantes', href: '/app/visitantes' },
      { id: 'criancas', label: 'Crianças', href: '/app/criancas' },
      { id: 'adolescentes', label: 'Adolescentes', href: '/app/adolescentes' },
      { id: 'jovens', label: 'Jovens', href: '/app/jovens' },
      { id: 'novos-convertidos', label: 'Novos Convertidos', href: '/app/convertidos' },
      { id: 'oracao', label: 'Oração', href: '/app/oracao' },
      { id: 'aconselhamento', label: 'Aconselhamento', href: '/app/aconselhamento', requiredPlan: 'plus' },
      { id: 'agenda', label: 'Agenda', href: '/app/agenda' },
      { id: 'cultos', label: 'Cultos', href: '/app/cultos' },
      { id: 'documentos', label: 'Documentos', href: '/app/documentos', requiredPlan: 'plus' },
      { id: 'qrcode', label: 'QR Code', href: '/app/qrcode', requiredPlan: 'max' },
    ],
  },
  {
    id: 'celulas',
    label: 'Células',
    requiredPlan: 'plus',
    children: [
      { id: 'redes', label: 'Redes', href: '/app/celulas/redes' },
      { id: 'grupos', label: 'Grupos', href: '/app/celulas' },
      { id: 'lideres', label: 'Líderes', href: '/app/celulas/lideres' },
      { id: 'reunioes-cel', label: 'Reuniões', href: '/app/celulas/reunioes' },
      { id: 'consolidacao', label: 'Consolidação', href: '/app/celulas/consolidacao' },
      { id: 'relatorios-cel', label: 'Relatórios', href: '/app/celulas/relatorios' },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    requiredPlan: 'plus',
    children: [
      { id: 'receitas', label: 'Receitas', href: '/app/financeiro/receitas' },
      { id: 'despesas', label: 'Despesas', href: '/app/financeiro/despesas' },
      { id: 'contas-pagar', label: 'Contas a Pagar', href: '/app/financeiro/contas' },
      { id: 'extrato', label: 'Extrato', href: '/app/financeiro' },
      { id: 'graficos-fin', label: 'Gráficos', href: '/app/financeiro/graficos' },
      { id: 'fornecedores', label: 'Fornecedores', href: '/app/financeiro/fornecedores' },
      { id: 'recibos', label: 'Recibos', href: '/app/financeiro/recibos' },
    ],
  },
  {
    id: 'ensino',
    label: 'Ensino',
    requiredPlan: 'plus',
    children: [
      { id: 'cursos', label: 'Cursos', href: '/app/ensino/cursos' },
      { id: 'classes', label: 'Classes', href: '/app/ensino/classes' },
      { id: 'professores', label: 'Professores', href: '/app/ensino/professores' },
      { id: 'alunos', label: 'Alunos', href: '/app/ensino/alunos' },
    ],
  },
  {
    id: 'organizacao',
    label: 'Organização',
    children: [
      { id: 'ministerios', label: 'Ministérios', href: '/app/organizacao/ministerios' },
      { id: 'departamentos', label: 'Departamentos', href: '/app/organizacao/departamentos' },
      { id: 'escalas', label: 'Escalas', href: '/app/organizacao/escalas' },
    ],
  },
  {
    id: 'patrimonio',
    label: 'Patrimônio',
    requiredPlan: 'plus',
    children: [
      { id: 'bens', label: 'Bens', href: '/app/patrimonio/bens' },
      { id: 'ambientes', label: 'Ambientes', href: '/app/patrimonio/ambientes' },
      { id: 'reservas', label: 'Reservas', href: '/app/patrimonio/reservas' },
    ],
  },
  {
    id: 'controle',
    label: 'Controle',
    children: [
      { id: 'igrejas', label: 'Igrejas', href: '/app/igrejas', requiredPlan: 'max' },
      { id: 'usuarios', label: 'Usuários', href: '/app/usuarios', requiredPlan: 'plus' },
      { id: 'meu-perfil', label: 'Meu Perfil', href: '/app/perfil' },
      { id: 'configuracoes', label: 'Configurações', href: '/app/configuracoes' },
    ],
  },
  {
    id: 'suporte',
    label: 'Suporte',
    children: [
      { id: 'ajuda', label: 'Central de Ajuda', href: '/app/suporte' },
      { id: 'chamado', label: 'Abrir Chamado', href: '/app/suporte/chamado' },
    ],
  },
]

export const PLAN_FEATURES = {
  lite: {
    name: 'ID Lite',
    color: '#64748B',
    churches: 1,
    members: 100,
    features: ['Secretaria básica', 'Agenda', 'Visitantes', 'Suporte básico'],
  },
  plus: {
    name: 'ID Plus',
    color: '#0EA5E9',
    churches: 3,
    members: 500,
    features: ['Tudo do Lite', 'Financeiro', 'Células', 'Ensino', 'Documentos', 'Relatórios'],
  },
  max: {
    name: 'ID Max',
    color: '#7C3AED',
    churches: -1,
    members: -1,
    features: ['Tudo do Plus', 'Igrejas ilimitadas', 'Membros ilimitados', 'QR Code', 'App da Igreja', 'Suporte prioritário'],
  },
}

export const PLAN_PRICES = {
  lite: { monthly: 49, yearly: 39 },
  plus: { monthly: 99, yearly: 79 },
  max: { monthly: 199, yearly: 159 },
}

export const PERSON_TYPE_LABELS: Record<string, string> = {
  membro: 'Membro',
  visitante: 'Visitante',
  crianca: 'Criança',
  adolescente: 'Adolescente',
  jovem: 'Jovem',
  congregado: 'Congregado',
  novo_convertido: 'Novo Convertido',
}

export const PERSON_STATUS_LABELS: Record<string, string> = {
  ativo: 'Ativo',
  afastado: 'Afastado',
  transferido: 'Transferido',
  falecido: 'Falecido',
  visitante_recorrente: 'Visitante Recorrente',
}

export const VISITOR_STATUS_LABELS: Record<string, string> = {
  novo: 'Novo',
  em_acompanhamento: 'Em Acompanhamento',
  convertido: 'Convertido',
  integrado: 'Integrado',
  inativo: 'Inativo',
}

export const PRAYER_STATUS_LABELS: Record<string, string> = {
  aberto: 'Aberto',
  em_oracao: 'Em Oração',
  respondido: 'Respondido',
  arquivado: 'Arquivado',
}

export const TRANSACTION_CATEGORIES_RECEITA = [
  'Dízimos', 'Ofertas', 'Doações', 'Campanhas', 'Eventos', 'Outras Receitas',
]

export const TRANSACTION_CATEGORIES_DESPESA = [
  'Aluguel', 'Energia', 'Água', 'Internet', 'Ajuda Missionária', 'Manutenção', 'Salários', 'Compras', 'Outras Despesas',
]
