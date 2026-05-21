import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { email, password, name, churchName, city, state, pastor, plan } = await req.json()

    if (!email || !password || !name || !churchName) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    })
    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

    const userId = authData.user.id

    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({ name: churchName, plan: plan || 'lite' })
      .select()
      .single()
    if (orgError) return NextResponse.json({ error: orgError.message }, { status: 500 })

    const { data: church, error: churchError } = await supabaseAdmin
      .from('churches')
      .insert({ organization_id: org.id, name: churchName, city: city || '', state: state || '', pastor: pastor || '' })
      .select()
      .single()
    if (churchError) return NextResponse.json({ error: churchError.message }, { status: 500 })

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({ id: userId, organization_id: org.id, church_id: church.id, name, role: 'admin' })
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro interno do servidor.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
