-- ============================================================
-- ChurchFlow — Schema completo
-- Execute no SQL Editor do seu projeto Supabase
-- ============================================================

-- Organizations (uma por assinatura/plano)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'lite' CHECK (plan IN ('lite', 'plus', 'max')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Churches (pode ter várias por organização)
CREATE TABLE churches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  pastor TEXT,
  cnpj TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (vinculados a auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  church_id UUID NOT NULL REFERENCES churches(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'pastor', 'secretario', 'lider', 'membro')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- People (membros, jovens, crianças, etc.)
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'membro' CHECK (type IN ('membro', 'visitante', 'crianca', 'adolescente', 'jovem', 'congregado', 'novo_convertido')),
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'transferido', 'falecido')),
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  birth_date DATE,
  wedding_date DATE,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  ministry_name TEXT,
  baptism_date DATE,
  join_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visitors
CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'em_acompanhamento', 'convertido', 'integrado', 'inativo')),
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  origin TEXT,
  visit_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cells (células / grupos)
CREATE TABLE cells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativa' CHECK (status IN ('ativa', 'inativa', 'em_formacao')),
  leader_name TEXT,
  network TEXT,
  sector TEXT,
  meeting_day TEXT,
  meeting_time TEXT,
  address TEXT,
  city TEXT,
  members_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ministries
CREATE TABLE ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  leader_name TEXT,
  members_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'culto' CHECK (type IN ('culto', 'reuniao', 'ensaio', 'aconselhamento', 'evento', 'aniversario', 'casamento', 'outro')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  recurrence TEXT DEFAULT 'nenhuma',
  color TEXT DEFAULT '#0EA5E9',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial Transactions
CREATE TABLE financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('receita', 'despesa')),
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  category_name TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prayer Requests
CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  person_name TEXT NOT NULL,
  category TEXT,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'media' CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
  status TEXT NOT NULL DEFAULT 'aberto' CHECK (status IN ('aberto', 'em_oracao', 'respondido', 'arquivado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Helper: retorna church_id do usuário autenticado
CREATE OR REPLACE FUNCTION auth_church_id()
RETURNS UUID LANGUAGE SQL STABLE SECURITY DEFINER AS $$
  SELECT church_id FROM profiles WHERE id = auth.uid()
$$;

-- Helper: retorna organization_id do usuário autenticado
CREATE OR REPLACE FUNCTION auth_org_id()
RETURNS UUID LANGUAGE SQL STABLE SECURITY DEFINER AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid()
$$;

-- Organizations: usuário vê apenas a própria org
CREATE POLICY "users see own org" ON organizations
  FOR ALL USING (id = auth_org_id());

-- Churches: usuário vê igrejas da própria org
CREATE POLICY "users see own churches" ON churches
  FOR ALL USING (organization_id = auth_org_id());

-- Profiles: usuário vê perfis da própria igreja
CREATE POLICY "users see own church profiles" ON profiles
  FOR ALL USING (church_id = auth_church_id());

-- People: usuário vê pessoas da própria igreja
CREATE POLICY "church members" ON people
  FOR ALL USING (church_id = auth_church_id());

-- Visitors
CREATE POLICY "church visitors" ON visitors
  FOR ALL USING (church_id = auth_church_id());

-- Cells
CREATE POLICY "church cells" ON cells
  FOR ALL USING (church_id = auth_church_id());

-- Ministries
CREATE POLICY "church ministries" ON ministries
  FOR ALL USING (church_id = auth_church_id());

-- Events
CREATE POLICY "church events" ON events
  FOR ALL USING (church_id = auth_church_id());

-- Financial Transactions
CREATE POLICY "church transactions" ON financial_transactions
  FOR ALL USING (church_id = auth_church_id());

-- Prayer Requests
CREATE POLICY "church prayer requests" ON prayer_requests
  FOR ALL USING (church_id = auth_church_id());

-- ============================================================
-- TRIGGER: atualiza updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER people_updated_at BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER visitors_updated_at BEFORE UPDATE ON visitors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER prayer_requests_updated_at BEFORE UPDATE ON prayer_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
