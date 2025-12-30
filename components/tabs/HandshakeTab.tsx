import React, { useState } from 'react';
import { Bot, FileBadge, Key, ShieldCheck, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const HandshakeTab: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Idle", desc: "Ready to connect." },
    { title: "Client Hello", desc: "Client sends supported ciphers & random number." },
    { title: "Server Hello", desc: "Server picks cipher, sends certificate & random number." },
    { title: "Verification", desc: "Client verifies the server's certificate." },
    { title: "Key Exchange", desc: "Both parties generate the 'Session Key'." },
    { title: "Secure Connection", desc: "Encrypted tunnel established!" }
  ];

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const reset = () => setStep(0);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">TLS Handshake</h2>
          <p className="text-cyan-400 font-medium">Step {step}: {steps[step].title}</p>
          <p className="text-slate-400 text-sm">{steps[step].desc}</p>
        </div>
        <div className="flex gap-2">
          {step < 5 ? (
            <Button onClick={nextStep} disabled={step === 5}>
              {step === 0 ? 'Start Handshake' : 'Next Step'}
            </Button>
          ) : (
            <Button onClick={reset} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          )}
        </div>
      </div>

      <div className="relative flex-grow bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        {/* Connection Tunnel Effect (Visible at Step 5) */}
        <div className={`absolute top-1/2 left-24 right-24 h-32 -translate-y-1/2 bg-purple-500/10 blur-xl transition-opacity duration-1000 ${step === 5 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/2 left-24 right-24 h-1 bg-slate-700 -translate-y-1/2 transition-colors duration-1000 ${step === 5 ? 'bg-purple-500 shadow-[0_0_20px_#a855f7]' : ''}`}></div>

        {/* Client Robot */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
          <div className={`transition-transform duration-500 ${step === 1 ? 'scale-110' : ''}`}>
             <Bot size={64} className="text-cyan-400" />
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded text-cyan-400 font-bold border border-cyan-900">Client</div>
          {step === 3 && <ShieldCheck className="text-emerald-400 animate-bounce" />}
        </div>

        {/* Server Robot */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
          <div className={`transition-transform duration-500 ${step === 2 ? 'scale-110' : ''}`}>
             <Bot size={64} className="text-rose-400" />
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded text-rose-400 font-bold border border-rose-900">Server</div>
        </div>

        {/* Objects Moving */}
        
        {/* Step 1: Blue Ball (Client Hello) */}
        <div className={`absolute top-1/2 left-24 w-8 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] -translate-y-1/2 transition-all duration-1000 z-10 ${step >= 1 ? 'opacity-100' : 'opacity-0'} ${step >= 2 ? 'left-[calc(100%-8rem)]' : ''} ${step > 3 ? 'opacity-0' : ''}`}></div>

        {/* Step 2: Red Ball (Server Hello + Cert) */}
        <div className={`absolute top-1/2 right-24 w-8 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)] -translate-y-1/2 transition-all duration-1000 z-10 ${step >= 2 ? 'opacity-100' : 'opacity-0'} ${step >= 3 ? 'right-[calc(100%-8rem)]' : ''} ${step > 3 ? 'opacity-0' : ''}`}>
           <FileBadge size={16} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Step 4: Key Exchange (Mixing) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${step === 4 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
           <div className="relative w-20 h-20 animate-spin-slow">
              <div className="absolute inset-0 bg-cyan-500 rounded-full mix-blend-screen opacity-70 blur-md animate-pulse"></div>
              <div className="absolute inset-0 bg-rose-500 rounded-full mix-blend-screen opacity-70 blur-md animate-pulse translate-x-2"></div>
           </div>
        </div>

        {/* Step 5: Session Key */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-300 ${step === 5 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
           <div className="bg-purple-600 p-4 rounded-full shadow-[0_0_30px_#a855f7] border-2 border-white">
              <Key size={32} className="text-white" />
           </div>
        </div>

      </div>
    </div>
  );
};
