import React, { useState } from 'react';
import { Truck, Car, Plane, Play, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const EvolutionTab: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const startRace = () => {
    if (started) {
       // Reset first if already started/finished (Race Again)
       setStarted(false);
       setFinished(false);
       // Small delay to allow CSS to register the reset state before starting again
       setTimeout(() => {
           setStarted(true);
           setTimeout(() => setFinished(true), 4000); 
       }, 100);
    } else {
       // Just start if currently reset
       setStarted(true);
       setTimeout(() => setFinished(true), 4000); 
    }
  };

  const resetRace = () => {
    setStarted(false);
    setFinished(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Protocol Evolution</h2>
          <p className="text-slate-400">See how speed and efficiency improved over time.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={resetRace} variant="outline" disabled={!started}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button onClick={startRace} disabled={started && !finished}>
                {started && !finished ? (
                    'Racing...'
                ) : (
                    <><Play className="w-4 h-4 mr-2" /> {finished ? 'Race Again' : 'Start Race'}</>
                )}
            </Button>
        </div>
      </div>

      <div className="flex-grow bg-slate-900 rounded-xl border border-slate-700 p-8 flex flex-col justify-center gap-8 relative overflow-hidden">
        
        {/* Finish Line */}
        <div className="absolute right-12 top-0 bottom-0 w-2 bg-slate-700 border-l border-dashed border-slate-500 flex flex-col justify-center items-center z-0">
            <div className="bg-slate-800 text-xs text-slate-500 -rotate-90 whitespace-nowrap mb-4">FINISH</div>
        </div>

        {/* Lane 1: HTTP/1.1 */}
        <div className="relative">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-sm font-bold">
            <span>HTTP/1.1 (TCP + Head-of-Line Blocking)</span>
          </div>
          <div className="h-16 bg-slate-800 rounded-lg border border-slate-700 relative overflow-hidden flex items-center px-2">
            <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all ease-linear"
                style={{ 
                    left: started ? 'calc(100% - 6rem)' : '1rem', 
                    transitionDuration: started ? '4000ms' : '500ms' // Faster return on reset
                }}
            >
                <div className="bg-rose-600 p-2 rounded-lg text-white shadow-lg flex items-center gap-2">
                    <Car size={24} />
                </div>
            </div>
          </div>
        </div>

        {/* Lane 2: HTTP/2 */}
        <div className="relative">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-sm font-bold">
            <span>HTTP/2 (Multiplexing)</span>
          </div>
          <div className="h-16 bg-slate-800 rounded-lg border border-slate-700 relative overflow-hidden flex items-center px-2">
             <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all ease-out"
                style={{ 
                    left: started ? 'calc(100% - 6rem)' : '1rem', 
                    transitionDuration: started ? '2500ms' : '500ms'
                }}
            >
                <div className="bg-yellow-600 p-2 rounded-lg text-white shadow-lg flex items-center gap-2">
                    <Truck size={24} />
                </div>
            </div>
          </div>
        </div>

        {/* Lane 3: HTTP/3 */}
        <div className="relative">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-sm font-bold">
            <span>HTTP/3 (QUIC / UDP)</span>
          </div>
          <div className="h-16 bg-slate-800 rounded-lg border border-slate-700 relative overflow-hidden flex items-center px-2">
             <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all ease-out"
                style={{ 
                    left: started ? 'calc(100% - 6rem)' : '1rem', 
                    transitionDuration: started ? '1500ms' : '500ms'
                }}
            >
                <div className="bg-emerald-600 p-2 rounded-lg text-white shadow-lg flex items-center gap-2">
                    <Plane size={24} />
                    <span className="text-xs font-bold animate-pulse">FAST</span>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
