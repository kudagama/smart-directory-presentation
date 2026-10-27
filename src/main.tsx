import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PerformanceApp from './PerformanceApp.tsx'

const RootApp = () => {
  const [view, setView] = useState<'presentation' | 'performance'>('presentation');

  return (
    <>
      {view === 'presentation' ? <App /> : <PerformanceApp />}
      
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setView(view === 'presentation' ? 'performance' : 'presentation')}
        className="fixed bottom-6 right-6 z-[9999] bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors shadow-xl text-sm"
      >
        {view === 'presentation' ? 'Manager Login' : 'Back to Presentation'}
      </button>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
