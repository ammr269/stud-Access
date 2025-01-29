import AppSessionProvider from '@/components/packages/providers/app-session-provider';

export default function DashLayout({ children }) {
  return <AppSessionProvider>{children}</AppSessionProvider>;
}
