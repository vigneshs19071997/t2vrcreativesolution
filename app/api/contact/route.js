import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    // ── 1. Save enquiry to MongoDB ──
    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      email,
      phone: phone || '',
      service: service || 'Other',
      subject,
      message,
    });

    // ── 2. Configure Nodemailer transporter ──
    const transporter = nodemailer.createTransport({
      service: 'gmail',       // Change to your SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use Gmail App Password
      },
    });

    // ── 3. Email to T2VR team (notification) ──
    const adminMailOptions = {
      from: `"T2VR Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Enquiry: ${subject} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #050d1a; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #00d4ff, #0066cc); padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; }
            .body { padding: 30px; }
            .field { margin-bottom: 18px; }
            .label { color: #00d4ff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
            .value { color: #ffffff; font-size: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #00d4ff; }
            .message-box { color: #ffffff; font-size: 15px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #00d4ff; white-space: pre-wrap; line-height: 1.6; }
            .footer { text-align: center; padding: 20px; color: #5a6a7e; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Client Enquiry — T2VR Creative Solution</h1>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              ${phone ? `<div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>` : ''}
              <div class="field">
                <div class="label">Service Interested In</div>
                <div class="value">${service || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At</div>
                <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
              </div>
            </div>
            <div class="footer">T2VR Creative Solution | Enquiry ID: ${enquiry._id}</div>
          </div>
        </body>
        </html>
      `,
    };

    // ── 4. Auto-response email to client ──
    const clientMailOptions = {
      from: `"T2VR Creative Solution" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ We've Received Your Enquiry — T2VR Creative Solution`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #050d1a; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #00d4ff, #0066cc); padding: 40px 30px; text-align: center; }
            .logo { color: white; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-bottom: 8px; }
            .tagline { color: rgba(255,255,255,0.8); font-size: 13px; }
            .body { padding: 40px 30px; }
            .greeting { color: #00d4ff; font-size: 22px; font-weight: 700; margin-bottom: 16px; }
            p { color: #aab4c0; font-size: 15px; line-height: 1.7; margin-bottom: 16px; }
            .highlight { color: #ffffff; }
            .divider { height: 1px; background: rgba(0,212,255,0.2); margin: 24px 0; }
            .detail-box { background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.15); border-radius: 10px; padding: 20px; margin: 20px 0; }
            .detail-row { display: flex; margin-bottom: 10px; }
            .detail-label { color: #00d4ff; font-size: 13px; min-width: 120px; font-weight: 600; }
            .detail-value { color: #ffffff; font-size: 13px; }
            .cta-btn { display: inline-block; background: linear-gradient(135deg, #00d4ff, #0066cc); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; margin-top: 10px; }
            .services { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0; }
            .service-tag { background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.25); color: #00d4ff; padding: 6px 14px; border-radius: 20px; font-size: 12px; }
            .footer { background: rgba(0,0,0,0.3); padding: 20px 30px; text-align: center; }
            .footer p { color: #5a6a7e; font-size: 12px; margin-bottom: 4px; }
            .social-links a { color: #00d4ff; text-decoration: none; margin: 0 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">T2VR</div>
              <div class="tagline">Creative Solution — Where Innovation Meets Excellence</div>
            </div>
            <div class="body">
              <div class="greeting">Hello, ${name}! 👋</div>
              <p>
                Thank you for reaching out to <span class="highlight">T2VR Creative Solution</span>!
                We're thrilled that you're considering us for your IT needs.
              </p>
              <p>
                We have successfully received your enquiry and our team of experts is already
                reviewing your requirements. We will get back to you within
                <span class="highlight">24 business hours</span>.
              </p>

              <div class="divider"></div>

              <p style="color: #ffffff; font-weight: 600; margin-bottom: 12px;">📋 Your Enquiry Summary:</p>
              <div class="detail-box">
                <div class="detail-row">
                  <span class="detail-label">Subject:</span>
                  <span class="detail-value">${subject}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">${service || 'General Enquiry'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Reference ID:</span>
                  <span class="detail-value">#T2VR-${enquiry._id.toString().slice(-6).toUpperCase()}</span>
                </div>
              </div>

              <div class="divider"></div>

              <p style="color: #ffffff; font-weight: 600; margin-bottom: 12px;">🚀 What Happens Next?</p>
              <p>1. Our team will <span class="highlight">review your requirements</span> carefully.</p>
              <p>2. A dedicated project consultant will <span class="highlight">contact you</span> to discuss your project in detail.</p>
              <p>3. We'll provide a <span class="highlight">customized solution proposal</span> tailored to your needs.</p>

              <div class="divider"></div>

              <p>While you wait, explore what we can do for you:</p>
              <div class="services">
                <span class="service-tag">🌐 Web Development</span>
                <span class="service-tag">📱 Mobile Apps</span>
                <span class="service-tag">💻 IT Consulting</span>
              </div>

              <p style="margin-top: 20px;">
                Feel free to contact us directly at
                <span class="highlight">${process.env.EMAIL_USER}</span>
                if you have any immediate questions.
              </p>

              <p><strong style="color: #00d4ff;">— Team T2VR Creative Solution</strong></p>
              <p style="font-style: italic; color: #5a6a7e; font-size: 13px;">"Transforming visions into digital reality, one solution at a time."</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} T2VR Creative Solution. All rights reserved.</p>
              <p>This is an automated response. Please do not reply to this email directly.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // ── 5. Send both emails ──
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully! We will contact you soon.',
        id: enquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
