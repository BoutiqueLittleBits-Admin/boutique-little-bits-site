import { getFormspreeUrl } from '../../../lib/formspree';

export async function POST(request) {
  const formspreeUrl = getFormspreeUrl();

  if (!formspreeUrl) {
    return Response.json(
      { error: 'Contact form is not configured in this local environment.' },
      { status: 400 }
    );
  }

  try {
    const data = await request.formData();

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return Response.json({ error: 'Message failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json({ error: 'Message failed' }, { status: 500 });
  }
}
