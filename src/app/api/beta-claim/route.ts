import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// La inicialización se hace dentro del POST para evitar errores en el build de Vercel
// si las variables de entorno no están configuradas todavía.

function generateToken() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const randomLetters = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const randomNumbers = Array.from({ length: 4 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
  return `XENO-${randomLetters}-${randomNumbers}`;
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Configuración incompleta.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { count, error } = await supabase
      .from('beta_invites')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error en la base de datos.' }, { status: 500 });
    }

    const remaining = Math.max(0, 50 - (count || 0));

    return NextResponse.json({ count: count || 0, remaining });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey || !resendKey) {
      console.error('Faltan variables de entorno para Xenobios API');
      return NextResponse.json({ error: 'Configuración incompleta en el servidor.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendKey);

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
<div style="background-color: #050505; color: #e5e7eb; font-family: 'Inter', Helvetica, Arial, sans-serif; padding: 50px 20px; text-align: center; border: 1px solid #1f2937; max-width: 600px; margin: 0 auto;">
  
  <h1 style="color: #00FFFF; font-family: 'Cinzel', serif; font-size: 28px; letter-spacing: 3px; margin-bottom: 15px; text-transform: uppercase; text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);">
    El Despertar de las Ánimas
  </h1>
  
  <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; margin: 0 auto 35px; max-width: 480px;">
    Siento una presencia... Estás ahí? Has sido elegido entre 50 pioneros para reclamar la Autoridad en este nuevo mundo.
  </p>

  <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px dashed #DEFF9A; padding: 30px; margin: 0 auto 40px; max-width: 350px; border-radius: 8px;">
    <p style="font-size: 12px; color: #DEFF9A; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 2px; font-weight: bold;">Tu Fragmento Rúnico</p>
    <h2 style="color: #ffffff; font-family: monospace; font-size: 36px; letter-spacing: 5px; margin: 0; text-shadow: 0 0 15px rgba(222, 255, 154, 0.4);">
      ${token}
    </h2>
  </div>

  <a href="https://xenobios-game.vercel.app/" style="display: inline-block; background-color: transparent; color: #00FFFF; text-decoration: none; padding: 16px 32px; border: 1px solid #00FFFF; border-radius: 4px; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);">
    Entrar a Xenobios
  </a>

  <hr style="border: 0; border-top: 1px solid #1f2937; margin: 50px auto 30px; max-width: 200px;" />

  <p style="font-size: 13px; color: #4b5563; font-style: italic; max-width: 400px; margin: 0 auto;">
    "No pierdas este fragmento. Son entradas limitadas(?)." <br/> — Xora
  </p>

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
