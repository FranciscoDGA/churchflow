'use client'

import { useState } from 'react'
import { Save, Church, Bell, Shield, Palette, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function ConfiguracoesPage() {
  const [church, setChurch] = useState({ name: 'Igreja Central', pastor: 'Pr. João Silva', cnpj: '', phone: '(11) 99999-0000', email: 'contato@igrejacentral.com', address: 'Rua das Flores, 123', city: 'São Paulo', state: 'SP', zip_code: '01310-100' })
  const [notifications, setNotifications] = useState({ birthdays: true, anniversaries: true, new_visitors: true, prayer_requests: true, financial_summary: false, cell_reports: true })

  function saveChurch() { toast.success('Dados da igreja salvos!') }
  function saveNotifications() { toast.success('Preferências de notificação salvas!') }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Configurações</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gerencie as configurações da sua conta e da igreja</p>
      </div>

      <Tabs defaultValue="igreja">
        <TabsList>
          <TabsTrigger value="igreja" className="gap-1.5"><Church className="w-4 h-4" />Igreja</TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-1.5"><Bell className="w-4 h-4" />Notificações</TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-1.5"><Shield className="w-4 h-4" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="igreja" className="mt-4">
          <Card className="border border-gray-200">
            <CardHeader><CardTitle className="text-base">Dados da Igreja</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Nome da Igreja</Label>
                  <Input value={church.name} onChange={e => setChurch({ ...church, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Pastor Responsável</Label>
                  <Input value={church.pastor} onChange={e => setChurch({ ...church, pastor: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>CNPJ</Label>
                  <Input placeholder="00.000.000/0000-00" value={church.cnpj} onChange={e => setChurch({ ...church, cnpj: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefone</Label>
                  <Input value={church.phone} onChange={e => setChurch({ ...church, phone: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>E-mail</Label>
                  <Input type="email" value={church.email} onChange={e => setChurch({ ...church, email: e.target.value })} />
                </div>
              </div>
              <Separator />
              <h3 className="text-sm font-medium text-gray-700">Endereço</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Endereço</Label>
                  <Input value={church.address} onChange={e => setChurch({ ...church, address: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Cidade</Label>
                  <Input value={church.city} onChange={e => setChurch({ ...church, city: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Estado</Label>
                  <Select value={church.state} onValueChange={(v) => { if (v) setChurch({ ...church, state: v }) }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>CEP</Label>
                  <Input placeholder="00000-000" value={church.zip_code} onChange={e => setChurch({ ...church, zip_code: e.target.value })} />
                </div>
              </div>
              <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-2" onClick={saveChurch}>
                <Save className="w-4 h-4" />Salvar alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="mt-4">
          <Card className="border border-gray-200">
            <CardHeader><CardTitle className="text-base">Preferências de Notificação</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'birthdays', label: 'Aniversariantes do dia', desc: 'Notificação diária com aniversariantes' },
                { key: 'anniversaries', label: 'Aniversários de casamento', desc: 'Alertas de datas especiais de casais' },
                { key: 'new_visitors', label: 'Novos visitantes', desc: 'Notificação quando um visitante é cadastrado' },
                { key: 'prayer_requests', label: 'Pedidos de oração urgentes', desc: 'Alertas para pedidos com prioridade urgente' },
                { key: 'financial_summary', label: 'Resumo financeiro semanal', desc: 'Relatório financeiro toda segunda-feira' },
                { key: 'cell_reports', label: 'Relatórios de células', desc: 'Notificação de reuniões e relatórios de células' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={v => setNotifications({ ...notifications, [item.key]: v })}
                  />
                </div>
              ))}
              <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-2 mt-2" onClick={saveNotifications}>
                <Save className="w-4 h-4" />Salvar preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="mt-4">
          <Card className="border border-gray-200">
            <CardHeader><CardTitle className="text-base">Segurança da Conta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Senha atual</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label>Nova senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label>Confirmar nova senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-2" onClick={() => toast.success('Senha alterada com sucesso!')}>
                <Shield className="w-4 h-4" />Alterar senha
              </Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Autenticação de dois fatores</p>
                  <p className="text-xs text-gray-400">Adicione uma camada extra de segurança</p>
                </div>
                <Switch onCheckedChange={v => v && toast.info('Funcionalidade em breve.')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
