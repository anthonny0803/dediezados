import { NextResponse } from 'next/server';

const CONTACT_API_URL = process.env.CONTACT_API_URL ?? 'https://api.dediezados.com/contact.php';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo de la petición inválido.' },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();

    let data: unknown;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return NextResponse.json(
        { success: false, message: 'Respuesta inválida del servidor de contacto.' },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: upstream.status });
  } catch (error) {
    console.error('Error proxying contact form:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
      },
      { status: 502 }
    );
  }
}
