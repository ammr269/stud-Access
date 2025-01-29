'use client';

import { SessionProvider, useSession } from 'next-auth/react';

function AppSessionLoader({ children }) {
  const { status } = useSession();
  const loading = status === 'loading';
  if (loading)
    return (
      <div className='d-flex align-items-center justify-content-center vh-100 fs-2'>
        Chargement...
      </div>
    );
  return children;
}

export function Providers({ children }) {
  return (
    <SessionProvider>
      <AppSessionLoader>{children}</AppSessionLoader>
    </SessionProvider>
  );
}
