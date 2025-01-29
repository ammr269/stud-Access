import { Band } from '@/components/packages/Band';
import Navbar from '@/components/packages/Barnav';
import { Footer } from '@/components/packages/Footer';
import { Providers } from '@/components/packages/providers/Providers';
import { Provider } from '@/components/ui/provider';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title:
    'Stud-Access | Votre guide pour l’orientation et l’inscription aux études supérieures',
  description:
    "Stud-Access est une plateforme dédiée à l'orientation et à l'accompagnement des étudiants dans leurs démarches d'inscription aux études supérieures. Trouvez la filière qui vous correspond et facilitez vos admissions.",
  keywords:
    'Études, orientation, inscription, université, formation, filière, étudiants, éducation, supérieur, admission, Comores, Afrique, bourses, guide étudiant, avenir professionnel',
  openGraph: {
    title:
      'Stud-Access | Votre guide pour l’orientation et l’inscription aux études supérieures',
    description:
      "Stud-Access est une plateforme dédiée à l'orientation et à l'accompagnement des étudiants dans leurs démarches d'inscription aux études supérieures. Trouvez la filière qui vous correspond et facilitez vos admissions.",
    url: 'https://stud-access.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@StudAccess',
    title:
      'Stud-Access | Votre guide pour l’orientation et l’inscription aux études supérieures',
    description:
      'Trouvez la filière qui vous correspond et facilitez vos admissions.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Provider>
            <Navbar />
            <Band />
            {children}
            <ToastContainer />
            <Footer />
          </Provider>
        </Providers>
      </body>
    </html>
  );
}
