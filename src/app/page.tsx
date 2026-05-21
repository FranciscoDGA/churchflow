'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Users, BarChart3, Calendar, Shield, BookOpen, Church,
  CheckCircle, ArrowRight, Menu, X, Star, ChevronDown, ChevronUp, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  { icon: Users, title: 'Gestão de Membros', desc: 'Cadastro completo, histórico pastoral, ministérios e muito mais.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: BarChart3, title: 'Financeiro Completo', desc: 'Dízimos, ofertas, despesas, extrato e relatórios em tempo real.', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Calendar, title: 'Agenda Inteligente', desc: 'Cultos, eventos, reuniões e aniversários em um só lugar.', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Church, title: 'Gestão de Células', desc: 'Redes, setores, líderes, reuniões e consolidação de visitantes.', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: BookOpen, title: 'Ensino e Cursos', desc: 'Turmas, professores, alunos, presença e certificados digitais.', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Shield, title: 'Multi-Igreja', desc: 'Gerencie várias sedes e filiais em uma única conta.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
]

const testimonials = [
  { name: 'Pr. Marcos Andrade', church: 'Igreja Vida Nova — SP', text: 'O ChurchFlow transformou a administração da nossa igreja. Antes levávamos horas em planilhas, hoje tudo está centralizado.', stars: 5 },
  { name: 'Sec. Juliana Lima', church: 'Comunidade Cristã — RJ', text: 'A gestão de membros e células ficou incrivelmente simples. A equipe de suporte é muito atenciosa.', stars: 5 },
  { name: 'Pr. Ricardo Neves', church: 'Igreja Renovação — MG', text: 'O módulo financeiro é completo e os relatórios ajudam muito na tomada de decisão pastoral.', stars: 5 },
]

const faqs = [
  { q: 'Preciso instalar algum software?', a: 'Não. O ChurchFlow é 100% online. Acesse pelo navegador de qualquer dispositivo, sem instalação.' },
  { q: 'Meus dados são seguros?', a: 'Sim. Usamos criptografia de ponta e banco de dados com isolamento total por igreja. Seus dados pertencem a você.' },
  { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim. Você pode fazer upgrade ou downgrade do seu plano quando quiser, sem multas ou burocracia.' },
  { q: 'Há limite de usuários por conta?', a: 'No plano ID Max você tem usuários ilimitados. Nos planos Lite e Plus há limites conforme o plano escolhido.' },
  { q: 'Funciona no celular?', a: 'Sim. O sistema é totalmente responsivo e funciona em celular, tablet e computador.' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
                <Church className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A]">ChurchFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#funcionalidades" className="text-sm text-gray-600 hover:text-[#0EA5E9] transition-colors">Funcionalidades</a>
              <a href="#planos" className="text-sm text-gray-600 hover:text-[#0EA5E9] transition-colors">Planos</a>
              <a href="#depoimentos" className="text-sm text-gray-600 hover:text-[#0EA5E9] transition-colors">Depoimentos</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-[#0EA5E9] transition-colors">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login"><Button variant="ghost" size="sm">Entrar</Button></Link>
              <Link href="/register"><Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white">Começar grátis</Button></Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <a href="#funcionalidades" className="block text-sm text-gray-600">Funcionalidades</a>
            <a href="#planos" className="block text-sm text-gray-600">Planos</a>
            <a href="#depoimentos" className="block text-sm text-gray-600">Depoimentos</a>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Entrar</Button></Link>
              <Link href="/register" className="flex-1"><Button size="sm" className="w-full bg-[#0EA5E9] text-white">Cadastrar</Button></Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-50 text-[#0EA5E9] border-blue-100 hover:bg-blue-50">
            <Zap className="w-3 h-3 mr-1" /> Sistema completo para sua igreja
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
            Organize sua igreja com<br />
            <span className="text-[#0EA5E9]">mais eficiência, cuidado</span><br />
            e propósito.
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10">
            Um sistema completo para gestão de membros, células, finanças, agenda, ensino, patrimônio e comunicação ministerial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-8 gap-2">
                Registrar minha igreja <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#funcionalidades">
              <Button size="lg" variant="outline" className="px-8">Ver demonstração</Button>
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">14 dias grátis • Sem cartão de crédito • Cancele quando quiser</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1.200+', label: 'Igrejas cadastradas' },
              { value: '180 mil', label: 'Membros gerenciados' },
              { value: '98%', label: 'Taxa de satisfação' },
              { value: '24/7', label: 'Suporte disponível' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#0EA5E9] mb-1">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#0EA5E9] border-blue-100">Funcionalidades</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Tudo que sua igreja precisa</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Módulos completos pensados para a realidade das igrejas brasileiras.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#0EA5E9] border-blue-100">Planos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Escolha o plano ideal</h2>
            <p className="text-gray-500">Comece grátis por 14 dias. Sem cartão de crédito.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              { name: 'ID Lite', price: 49, color: 'border-gray-200', popular: false, features: ['1 igreja/sede', 'Até 100 membros', 'Secretaria básica', 'Agenda', 'Visitantes', 'Suporte básico'] },
              { name: 'ID Plus', price: 99, color: 'border-[#0EA5E9]', popular: true, features: ['Até 3 igrejas', 'Até 500 membros', 'Financeiro completo', 'Células', 'Ensino', 'Documentos', 'Relatórios'] },
              { name: 'ID Max', price: 199, color: 'border-purple-500', popular: false, features: ['Igrejas ilimitadas', 'Membros ilimitados', 'Multiusuários', 'QR Code', 'App da Igreja', 'Suporte prioritário'] },
            ].map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 ${plan.popular ? 'shadow-xl' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0EA5E9] text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Mais popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                <div className="mb-6"><span className="text-4xl font-bold text-[#0F172A]">R${plan.price}</span><span className="text-gray-400">/mês</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className={`w-full ${plan.popular ? 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Começar agora
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#0EA5E9] border-blue-100">Depoimentos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">O que dizem sobre o ChurchFlow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex mb-3">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="font-semibold text-sm text-[#0F172A]">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.church}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#0EA5E9] border-blue-100">FAQ</Badge>
            <h2 className="text-3xl font-bold text-[#0F172A]">Perguntas frequentes</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-[#0F172A]">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-gray-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para organizar sua igreja?</h2>
          <p className="text-gray-400 mb-8 text-lg">Junte-se a mais de 1.200 igrejas que já usam o ChurchFlow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-10 gap-2">
                Registrar minha igreja <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-10">Já tenho conta</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
              <Church className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">ChurchFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          </div>
          <p className="text-xs text-gray-500">© 2025 ChurchFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
