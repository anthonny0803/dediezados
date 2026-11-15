import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidenav } from '@/components/layout/Sidenav';
import { Footer } from '@/components/layout/Footer';
import { Chatbot } from '@/components/widgets/Chatbot';

interface SectionPageShellProps {
  children: ReactNode;
}

export const SectionPageShell = ({ children }: SectionPageShellProps) => (
  <>
    <Navbar />
    <Sidenav />
    <main>{children}</main>
    <Footer />
    <Chatbot />
  </>
);
