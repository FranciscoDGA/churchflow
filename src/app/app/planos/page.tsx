'use client'

import { CheckCircle, Zap, Crown, Star, ArrowRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PLAN_FEATURES, PLAN_PRICES } from '@/lib/constants'
import { toast } from 'sonner'

const currentPlan = 'plus'

export default function PlanosPage() {
  function handleUpgrade(plan: string) {
    toast.info(`Redirecionando para pagamento do plano ${plan}...`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Planos</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gerencie sua assinatura e recursos disponíveis</p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-2">Plano atual</Badge>
            <h2 className="text-2xl font-bold">{PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES].name}</h2>
            <p className="text-white/70 text-sm mt-1">
              Até {PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES].churches === -1 ? 'ilimitadas' : PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES].churches} igrejas •
              Até {PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES].members === -1 ? 'ilimitados' : PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES].members} membros
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">R${PLAN_PRICES[currentPlan as keyof typeof PLAN_PRICES].monthly}</div>
            <div className="text-white/70 text-sm">/mês</div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: 'lite',
            icon: Star,
            color: 'text-gray-500',
            bg: 'bg-gray-50',
            border: 'border-gray-200',
          },
          {
            id: 'plus',
            icon: Zap,
            color: 'text-[#0EA5E9]',
            bg: 'bg-blue-50',
            border: 'border-[#0EA5E9]',
          },
          {
            id: 'max',
            icon: Crown,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-500',
          },
        ].map((p) => {
          const plan = PLAN_FEATURES[p.id as keyof typeof PLAN_FEATURES]
          const price = PLAN_PRICES[p.id as keyof typeof PLAN_PRICES]
          const isCurrent = p.id === currentPlan
          const isUpgrade = ['lite', 'plus', 'max'].indexOf(p.id) > ['lite', 'plus', 'max'].indexOf(currentPlan)

          return (
            <Card key={p.id} className={`border-2 ${p.border} relative ${isCurrent ? 'shadow-lg' : ''}`}>
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0EA5E9] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Plano atual
                </div>
              )}
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <p.icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#0F172A]">R${price.monthly}</span>
                  <span className="text-gray-400">/mês</span>
                  <div className="text-xs text-green-600 mt-0.5">ou R${price.yearly}/mês no plano anual</div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  {plan.churches === -1 ? 'Igrejas ilimitadas' : `${plan.churches} ${plan.churches === 1 ? 'igreja' : 'igrejas'}`} •
                  {plan.members === -1 ? ' Membros ilimitados' : ` ${plan.members} membros`}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button className="w-full" variant="outline" disabled>Plano atual</Button>
                ) : isUpgrade ? (
                  <Button className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-2" onClick={() => handleUpgrade(plan.name)}>
                    Fazer upgrade <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline" onClick={() => toast.info('Para fazer downgrade, entre em contato com o suporte.')}>
                    Fazer downgrade
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Locked Features Notice */}
      <Card className="border border-yellow-200 bg-yellow-50">
        <CardContent className="p-4 flex items-center gap-3">
          <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Recursos bloqueados no seu plano</p>
            <p className="text-xs text-yellow-600 mt-0.5">Recursos com cadeado estão disponíveis em planos superiores. Faça upgrade para desbloquear.</p>
          </div>
          <Button size="sm" className="ml-auto bg-yellow-600 hover:bg-yellow-700 text-white flex-shrink-0" onClick={() => handleUpgrade('ID Max')}>
            Ver ID Max
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim. Você pode fazer upgrade imediatamente e downgrade ao final do ciclo.' },
          { q: 'O que acontece com meus dados ao fazer downgrade?', a: 'Seus dados são mantidos. Apenas o acesso a recursos premium é bloqueado.' },
          { q: 'Há desconto no plano anual?', a: 'Sim! No plano anual você economiza até 20% em relação ao mensal.' },
          { q: 'Como cancelo minha assinatura?', a: 'Você pode cancelar a qualquer momento nas configurações, sem multas.' },
        ].map((faq) => (
          <Card key={faq.q} className="border border-gray-200">
            <CardContent className="p-4">
              <p className="font-medium text-sm text-[#0F172A] mb-1">{faq.q}</p>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
