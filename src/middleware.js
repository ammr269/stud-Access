import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    {
      source: `/((?!assets|legal-assets|images|js|_next/static|_next|pdf|favicon.ico|sw.jss|icon|apple-icon|manifest).*)`,
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

// do not allow js, css, map files, and other assets to be prefetched
const matcherRegex = new RegExp('^(?!/.*(?:map|legal-assets|js|icon|robot)).*');

export default withAuth(middleware, {
  callbacks: {
    authorized: () => {
      return true;
    },
  },
});

async function middleware(req) {
  // const reqLogger = new RequestLogger(logger, req);
  const isMiddlewareAllowed = matcherRegex.test(req.nextUrl.pathname);
  console.log(
    `  => Middleware: ${req.method.toUpperCase()} `,
    req.nextUrl.pathname,
  );
  if (!isMiddlewareAllowed) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    console.log(`  => API: ${req.method.toUpperCase()} `, req.nextUrl.pathname);
    return NextResponse.next();
  }

  // Redirect to `login` page if not logged in yet
  const token = req.nextauth.token;
  const shouldSigning = forceToLoginOnProtectedRoutes(req, token);
  if (shouldSigning) {
    return shouldSigning();
  }

  // redirect to the home page if the user is logged in and tries to access the login/signup page
  if (IsAuthPageAndIsLoggedIn(req, token)) {
    console.log('  => You are already connected redirecting to home page...');
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  // Handle simple requests
  return NextResponse.next();
}

export function forceToLoginOnProtectedRoutes(req, token) {
  if (
    !token &&
    !['/', '/authentification', '/inscription'].includes(req.nextUrl.pathname)
  ) {
    console.log(`   => Path '${req.nextUrl.pathname}' is protected`);
    const nextQueryParams = req.nextUrl.searchParams;
    const nextQuery = new URLSearchParams({
      next: `${req.nextUrl.pathname}${
        nextQueryParams.toString() ? `?${nextQueryParams}` : ''
      }`,
    });
    const redirectUrl = new URL(`/authentification?${nextQuery}`, req.url);
    console.log(`   => Redirecting to '${redirectUrl}'`);
    return () => NextResponse.redirect(redirectUrl);
  }
}

function IsAuthPageAndIsLoggedIn(req, token) {
  return (
    (req.nextUrl.pathname.startsWith(`/authentification`) ||
      req.nextUrl.pathname.startsWith(`/inscription`)) &&
    token
  );
}
