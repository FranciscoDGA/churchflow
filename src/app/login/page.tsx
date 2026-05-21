'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Church, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: integrate with Supabase auth
      await new Promise((r) => setTimeout(r, 1000))
      toast.success('Login realizado com sucesso!')
      router.push('/app')
    } catch {
      toast.error('Email ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0EA5E9] flex items-center justify-center">
            <Church className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ChurchFlow</span>
        </div>
        <div>
          <blockquote className="text-2xl font-semibold text-white leading-relaxed mb-4">
            "Organize sua igreja com mais eficiência, cuidado e propósito."
          </blockquote>
          <p className="text-gray-400">Mais de 1.200 igrejas confiam no ChurchFlow para gerenciar sua comunidade.</p>
        </div>
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#0EA5E9] opacity-60" />
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
              <Church className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0F172A]">ChurchFlow</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Bem-vindo de volta</h1>
            <p className="text-sm text-gray-500 mb-6">Entre com sua conta para continuar</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-xs text-[#0EA5E9] hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Entrando...</> : 'Entrar'}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Não tem conta?{' '}
              <Link href="/register" className="text-[#0EA5E9] font-medium hover:underline">
                Registrar minha igreja
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
