import React, { useState, useEffect } from 'react';
import { Laptop, Router, Landmark, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '../ui/Button';

type Stage = 'idle' | 'sending' | 'intercepted' | 'forwarding' | 'finished';

export const MitmTab: React.FC = () => {
  const [mode, setMode] = useState<'http' | 'https'>('http');
  const [stage, setStage] = useState<Stage>('idle');
  const [amount, setAmount] = useState(100);
  const [log, setLog] = useState<string[]>([]);

  const isSecure = mode === 'https';

  const reset = () => {
    setStage('idle');
    setAmount(100);
    setLog([]);
  };

  const startSimulation = () => {
    reset();
    setStage('sending');
    setLog(prev => [...prev, `Client sending: "Transfer $100"`]);
  };

  useEffect(() => {
    let timer: number;

    if (stage === 'sending') {
      timer = window.setTimeout(() => {
        setStage('intercepted');
        setLog(prev => [...prev, 'Packet reached Router (Hacker)']);
      }, 1500);
    } else if (stage === 'intercepted') {
      timer = window.setTimeout(() => {
        if (!isSecure) {
          setAmount(1000); // Hacker modifies amount
          setLog(prev => [...prev, 'MITM Attack! Hacker changed amount to $1000']);
        } else {
           setLog(prev => [...prev, 'Hacker attempted access... FAILED (Encrypted)']);
        }
        setStage('forwarding');
      }, 2000);
    } else if (stage === 'forwarding') {
      timer = window.setTimeout(() => {
        setStage('finished');
        if (!isSecure) {
          setLog(prev => [...prev, 'Server received: "Transfer $1000" 😱']);
        } else {
          setLog(prev => [...prev, 'Server received: "Transfer $100" ✅']);
        }
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [stage, isSecure]);

  // Position logic for packet
  const getPacketPosition = () => {
    switch (stage) {
      case 'idle': return 'left-[10%]';
      case 'sending': return 'left-[50%]';
      case 'intercepted': return 'left-[50%]';
      case 'forwarding': return 'left-[90%]';
      case 'finished': return 'left-[90%]';
      default: return 'left-[10%]';
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          {isSecure ? <Lock className="text-emerald-400"/> : <AlertTriangle className="text-rose-500"/>}
          Man-in-the-Middle Attack Simulation
        </h2>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => { setMode('http'); reset(); }}
            disabled={stage !== 'idle' && stage !== 'finished'}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isSecure ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HTTP
          </button>
          <button
            onClick={() => { setMode('https'); reset(); }}
            disabled={stage !== 'idle' && stage !== 'finished'}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isSecure ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HTTPS
          </button>
        </div>
      </div>

      <div className="relative bg-slate-900 rounded-xl border border-slate-700 h-64 overflow-hidden p-8 flex items-center justify-between">
         {/* Background connecting line */}
         <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-800 -translate-y-1/2"></div>

         {/* Client */}
         <div className="relative z-10 flex flex-col items-center gap-2">
            <Laptop size={48} className="text-cyan-400" />
            <div className="text-sm font-bold text-cyan-400">User</div>
            <div className="text-xs bg-slate-800 p-1 px-2 rounded border border-slate-700">Send $100</div>
         </div>

         {/* Router / Hacker */}
         <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`p-4 rounded-full transition-colors duration-300 ${stage === 'intercepted' ? 'bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.5)]' : 'bg-slate-800'}`}>
                <Router size={48} className={`${stage === 'intercepted' ? 'text-rose-500' : 'text-slate-500'}`} />
            </div>
            <div className={`text-sm font-bold ${stage === 'intercepted' ? 'text-rose-500' : 'text-slate-500'}`}>Public Wi-Fi</div>
            {stage === 'intercepted' && (
              <div className="absolute -top-12 animate-bounce bg-rose-500 text-white text-xs px-2 py-1 rounded">
                HACKER ACTIVE
              </div>
            )}
         </div>

         {/* Server */}
         <div className="relative z-10 flex flex-col items-center gap-2">
            <Landmark size={48} className="text-emerald-400" />
            <div className="text-sm font-bold text-emerald-400">Bank Server</div>
            {stage === 'finished' && (
               <div className={`text-xs p-1 px-2 rounded border font-bold animate-pulse ${isSecure ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400' : 'bg-rose-900/50 border-rose-500 text-rose-400'}`}>
                  Received: ${amount}
               </div>
            )}
         </div>

         {/* Packet */}
         <div 
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-[1500ms] ease-linear z-20 ${getPacketPosition()}`}
         >
            <div className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap
              ${isSecure 
                ? 'bg-emerald-600 text-white border border-emerald-400' 
                : 'bg-yellow-400 text-black border border-yellow-600'
              }
            `}>
              {isSecure ? <Lock size={12} /> : null}
              {isSecure ? 'Encrypted' : `$${amount}`}
            </div>
         </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={startSimulation} disabled={stage !== 'idle' && stage !== 'finished'} className="w-32">
          {stage === 'idle' || stage === 'finished' ? 'Send $100' : 'Sending...'}
        </Button>
        
        <div className="flex-grow bg-black rounded-lg border border-slate-700 p-4 font-mono text-sm h-32 overflow-y-auto">
           {log.map((entry, i) => (
             <div key={i} className="mb-1">
               <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> <span className="text-slate-300">{entry}</span>
             </div>
           ))}
           {log.length === 0 && <span className="text-slate-600 italic">Simulation log will appear here...</span>}
        </div>
      </div>
    </div>
  );
};
