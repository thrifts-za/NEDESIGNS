import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is not set, log to console instead
    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission:', { name, email, message });
      return NextResponse.json(
        { message: 'Message logged (email service not configured)' },
        { status: 200 }
      );
    }

    const data = await resend.emails.send({
      from: 'NE Designs Portfolio <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your email
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
