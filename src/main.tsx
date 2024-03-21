import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/chatui.css';
import { NextUIProvider } from '@nextui-org/react';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { SigninView } from './components/SigninView';

// import { SpeedInsights } from '@vercel/speed-insights/next';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

document.addEventListener('DOMContentLoaded', (_event) => {
  // we can move only if we are not in a browser's tab
  const isBrowser = matchMedia('(display-mode: browser)').matches;
  if (!isBrowser) {
    window.moveTo(100, 100);
    window.resizeTo(1500, 1000);
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <SignedIn>
          <App />
        </SignedIn>
        <SignedOut>
          <SigninView />
        </SignedOut>
        <Analytics />
        {/* <SpeedInsights /> */}
      </ClerkProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
