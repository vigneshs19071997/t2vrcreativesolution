import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'T2VR Creative Solution | Next-Gen IT Solutions',
  description:
    'T2VR Creative Solution – Transforming your digital vision into reality with innovative web development, mobile apps, and IT consulting services.',
  keywords:
    't2vr creative solution, IT company, web development, mobile app development, IT consulting, software solutions',
  openGraph: {
    title: 'T2VR Creative Solution | Next-Gen IT Solutions',
    description:
      'We craft innovative IT solutions that drive growth, efficiency, and success for your business.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a1628',
              color: '#fff',
              border: '1px solid rgba(0,212,255,0.3)',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
