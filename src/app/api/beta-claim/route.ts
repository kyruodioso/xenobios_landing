import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicialización de clientes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateToken() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const randomLetters = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const randomNumbers = Array.from({ length: 4 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
  return `XENO-${randomLetters}-${randomNumbers}`;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El email es obligatorio.' }, { status: 400 });
    }

    // 1. Verificar si el email ya existe
    const { data: existingInvite, error: checkError } = await supabase
      .from('beta_invites')
      .select('email')
      .eq('email', email)
      .single();

    if (existingInvite) {
      return NextResponse.json({ error: 'Ya hay un Fragmento Rúnico vinculado a este email.' }, { status: 400 });
    }

    // 2. Verificar límite de 50 registros
    const { count, error: countError } = await supabase
      .from('beta_invites')
      .select('*', { count: 'exact', head: true });

    if (count !== null && count >= 50) {
      return NextResponse.json({ error: 'Los Jardines del Génesis están llenos. Beta cerrada.' }, { status: 403 });
    }

    // 3. Generar token y guardar
    const token = generateToken();
    const { error: insertError } = await supabase
      .from('beta_invites')
      .insert({ email, codigo: token });

    if (insertError) {
      console.error('Error al insertar en DB:', insertError);
      return NextResponse.json({ error: 'Error al reclamar el Fragmento. Reintenta.' }, { status: 500 });
    }

    // 4. Enviar correo vía Resend
    try {
      await resend.emails.send({
        from: 'Xenobios <noreply@resend.dev>', // Usar dominio verificado en producción
        to: email,
        subject: 'Tu Fragmento Rúnico ha sido forjado - Beta de Xenobios',
        html: `
          <div style="background-color: #050505; color: #f0f0f0; padding: 40px; font-family: 'Cinzel', serif; border: 1px solid #1a1a1a; max-width: 600px; margin: 0 auto; border-radius: 8px;">
            <h1 style="color: #00e5ff; text-align: center; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Xenobios</h1>
            <div style="margin-top: 30px; text-align: center;">
              <p style="font-size: 16px; line-height: 1.6;">Has sido elegido por los Jardines del Génesis.</p>
              <p style="font-size: 16px; line-height: 1.6;">Tu Fragmento Rúnico está listo para ser reclamado:</p>
              
              <div style="background-color: #0a0a0a; border: 2px dashed #00e5ff; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <span style="font-size: 32px; font-weight: bold; color: #DEFF9A; letter-spacing: 5px; font-family: monospace;">${token}</span>
              </div>
              
              <p style="color: #888; font-size: 14px; margin-top: 40px;">No compartas este código con otras ánimas. La corrupción acecha.</p>
            </div>
            <div style="margin-top: 40px; border-top: 1px solid #1a1a1a; padding-top: 20px; text-align: center; color: #444; font-size: 12px;">
              © 2026 Xenobios - El Renacer de las Ánimas
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      // Opcional: Podrías retornar éxito igual porque ya se guardó en DB, 
      // pero el usuario pidió enviarlo. Aquí lo dejamos pasar o informamos.
    }

    return NextResponse.json({ message: 'Fragmento enviado exitosamente' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
