import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@context/ThemeContext';
import { ScrollProvider } from '@context/ScrollContext';
import { AnimationProvider } from '@context/AnimationContext';
import App from './App';
import '@styles/globals.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find root element');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ScrollProvider>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </ScrollProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
