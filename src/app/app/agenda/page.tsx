'use client'

import { useState } from 'react'
import { Plus, Calendar, Clock, MapPin, MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { mockEvents } from '@/lib/mock-data'
import type { Event, EventType } from '@/types'

const EVENT_COLORS: Record<EventType, string> = {
  culto: '#0EA5E9',
  reuniao: '#7C3AED',
  ensaio: '#F59E0B',
  aconselhamento: '#10B981',
  evento: '#F43F5E',
  aniversario: '#EC4899',
  casamento: '#EF4444',
  outro: '#64748B',
}

const EVENT_LABELS: Record<EventType, string> = {
  culto: 'Culto',
  reuniao: 'Reunião',
  ensaio: 'Ensaio',
  aconselhamento: 'Aconselhamento',
  evento: 'Evento',
  aniversario: 'Aniversário',
  casamento: 'Casamento',
  outro: 'Outro',
}

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function AgendaPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)) // May 2025
  const [form, setForm] = useState({ title: '', description: '', type: 'culto', start_date: '', location: '', recurrence: 'nenhuma', color: '#0EA5E9' })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  function getEventsForDay(day: number) {
    return events.filter(e => {
      const d = new Date(e.start_date)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  function openAdd() { setForm({ title: '', description: '', type: 'culto', start_date: new Date().toISOString().slice(0, 16), location: '', recurrence: 'nenhuma', color: '#0EA5E9' }); setEditingEvent(null); setShowForm(true) }
  function openEdit(e: Event) { setForm({ title: e.title, description: e.description || '', type: e.type, start_date: e.start_date, location: e.location || '', recurrence: e.recurrence || 'nenhuma', color: e.color || '#0EA5E9' }); setEditingEvent(e); setShowForm(true) }

  function handleSave() {
    if (!form.title.trim() || !form.start_date) { toast.error('Preencha os campos obrigatórios'); return }
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...form, type: form.type as EventType, recurrence: form.recurrence as any } : e))
      toast.success('Evento atualizado!')
    } else {
      const newEvent: Event = { id: Date.now().toString(), church_id: '1', ...form as any, type: form.type as EventType, created_at: new Date().toISOString() }
      setEvents(prev => [...prev, newEvent])
      toast.success('Evento criado!')
    }
    setShowForm(false)
  }

  const upcomingEvents = events
    .filter(e => new Date(e.start_date) >= new Date())
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, 8)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Agenda</h1>
          <p className="text-sm text-gray-500 mt-0.5">Cultos, eventos e reuniões</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
          <Plus className="w-4 h-4" />Novo evento
        </Button>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-[#0F172A]">{MONTHS[month]} {year}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Hoje</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {WEEKDAYS.map(d => (
                  <div key={d} className="bg-gray-50 text-center text-xs font-medium text-gray-500 py-2">{d}</div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-white min-h-[80px]" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayEvents = getEventsForDay(day)
                  const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year
                  return (
                    <div key={day} className={`bg-white min-h-[80px] p-1.5 ${isToday ? 'bg-blue-50' : ''}`}>
                      <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[#0EA5E9] text-white' : 'text-gray-700'}`}>{day}</div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map(e => (
                          <div key={e.id} className="text-xs px-1.5 py-0.5 rounded text-white truncate cursor-pointer" style={{ backgroundColor: e.color || EVENT_COLORS[e.type] }} onClick={() => openEdit(e)}>
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && <div className="text-xs text-gray-400 pl-1">+{dayEvents.length - 2}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lista" className="mt-4">
          <Card className="border border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-base">Próximos Eventos</CardTitle></CardHeader>
            <CardContent className="p-0">
              {upcomingEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500">Nenhum evento agendado</p>
                  <Button size="sm" className="mt-4 bg-[#0EA5E9] text-white" onClick={openAdd}>Criar evento</Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {upcomingEvents.map((e) => (
                    <div key={e.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50/50">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: e.color || EVENT_COLORS[e.type] }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-[#0F172A]">{e.title}</span>
                          <Badge className="text-xs border-0 bg-gray-100 text-gray-600">{EVENT_LABELS[e.type]}</Badge>
                          {e.recurrence && e.recurrence !== 'nenhuma' && <Badge className="text-xs border-0 bg-blue-50 text-blue-600">Recorrente</Badge>}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(e.start_date).toLocaleDateString('pt-BR')}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(e.start_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          {e.location && <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(e)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setEvents(prev => prev.filter(x => x.id !== e.id)); toast.success('Evento removido.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editingEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Título *</Label>
              <Input placeholder="Ex: Culto Dominical" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v) => { if (v) setForm({ ...form, type: v, color: EVENT_COLORS[v as EventType] }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(EVENT_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Recorrência</Label>
              <Select value={form.recurrence} onValueChange={(v) => { if (v) setForm({ ...form, recurrence: v }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhuma">Não repete</SelectItem>
                  <SelectItem value="diaria">Diária</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Data e hora *</Label>
              <Input type="datetime-local" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Local</Label>
              <Input placeholder="Ex: Templo Principal" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Descrição</Label>
              <Textarea placeholder="Detalhes do evento..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingEvent ? 'Salvar' : 'Criar evento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
