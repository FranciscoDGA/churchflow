'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Church, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const steps = ['Sua conta', 'Sua igreja', 'Plano']

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    churchName: '', city: '', state: '', pastor: '',
    plan: 'lite',
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step < 2) { setStep(step + 1); return }
    setLoading(true)
    try {
      // TODO: integrate with Supabase auth + org creation
      await new Promise((r) => setTimeout(r, 1500))
      toast.success('Igreja registrada com sucesso! Bem-vindo ao ChurchFlow.')
      router.push('/app')
    } catch {
      toast.error('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#0F172A] flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0EA5E9] flex items-center justify-center">
            <Church className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ChurchFlow</span>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Comece a organizar sua igreja hoje</h2>
          {['14 dias grátis, sem cartão', 'Setup em menos de 5 minutos', 'Suporte dedicado', 'Cancele quando quiser'].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">Já tem conta? <Link href="/login" className="text-[#0EA5E9]">Entrar</Link></p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${i <= step ? 'bg-[#0EA5E9] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm ${i === step ? 'text-[#0F172A] font-medium' : 'text-gray-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`h-px w-8 ${i < step ? 'bg-[#0EA5E9]' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
              {step === 0 ? 'Crie sua conta' : step === 1 ? 'Dados da igreja' : 'Escolha seu plano'}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {step === 0 ? 'Informe seus dados de acesso' : step === 1 ? 'Nos conte sobre sua igreja' : 'Você pode trocar de plano a qualquer momento'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 0 && (
                <>
                  <div className="space-y-1.5">
                    <Label>Nome completo</Label>
                    <Input placeholder="Seu nome" value={form.name} onChange={(e) => update('name', e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Senha</Label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" value={form.password} onChange={(e) => update('password', e.target.value)} required className="pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="space-y-1.5">
                    <Label>Nome da Igreja</Label>
                    <Input placeholder="Ex: Igreja Evangélica Graça de Deus" value={form.churchName} onChange={(e) => update('churchName', e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nome do Pastor(a)</Label>
                    <Input placeholder="Nome do pastor responsável" value={form.pastor} onChange={(e) => update('pastor', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Cidade</Label>
                      <Input placeholder="Sua cidade" value={form.city} onChange={(e) => update('city', e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Estado</Label>
                      <Select onValueChange={(v) => { if (v) update('state', v as string) }}>
                        <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                        <SelectContent>
                          {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => (
                            <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {[
                    { id: 'lite', name: 'ID Lite', price: 'R$49/mês', desc: '1 igreja • 100 membros' },
                    { id: 'plus', name: 'ID Plus', price: 'R$99/mês', desc: '3 igrejas • 500 membros', popular: true },
                    { id: 'max', name: 'ID Max', price: 'R$199/mês', desc: 'Ilimitado • Recursos completos' },
                  ].map((plan) => (
                    <label key={plan.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${form.plan === plan.id ? 'border-[#0EA5E9] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="plan" value={plan.id} checked={form.plan === plan.id} onChange={() => update('plan', plan.id)} className="accent-[#0EA5E9]" />
                        <div>
                          <div className="font-medium text-[#0F172A] flex items-center gap-2">
                            {plan.name}
                            {plan.popular && <span className="text-xs bg-[#0EA5E9] text-white px-2 py-0.5 rounded-full">Popular</span>}
                          </div>
                          <div className="text-xs text-gray-500">{plan.desc}</div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F172A]">{plan.price}</span>
                    </label>
                  ))}
                  <p className="text-xs text-gray-400 text-center">14 dias grátis em qualquer plano</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {step > 0 && (
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
                    Voltar
                  </Button>
                )}
                <Button type="submit" className="flex-1 bg-[#0EA5E9] hover:bg-[#0284C7] text-white" disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Criando...</> : step < 2 ? 'Continuar' : 'Criar conta grátis'}
                </Button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Já tem conta? <Link href="/login" className="text-[#0EA5E9] font-medium hover:underline">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
