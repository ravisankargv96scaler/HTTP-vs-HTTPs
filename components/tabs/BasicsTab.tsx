import React, { useState, useEffect, useRef } from 'react';
import { Mail, Briefcase, User, Server, Search } from 'lucide-react';

export const BasicsTab: React.FC = () => {
  const [mode, setMode] = useState<'http' | 'https'>('http');
  const [packetPos, setPacketPos] = useState(0);
  const [isHoveringPacket, setIsHoveringPacket] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animation Loop for the packet
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPos((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for spyglass
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isSecure = mode === 'https';

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-100">
            {isSecure ? 'HTTPS: The Sealed Envelope' : 'HTTP: The Open Postcard'}
          </h2>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setMode('http')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !isSecure ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTTP
            </button>
            <button
              onClick={() => setMode('https')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isSecure ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTTPS
            </button>
          </div>
        </div>

        <p className="text-slate-400 mb-8">
          {isSecure 
            ? "Data is encrypted before sending. Even if intercepted, it looks like gibberish." 
            : "Data is sent in plaintext. Anyone inspecting the network can read it."}
        </p>

        {/* Animation Area */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative h-64 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden cursor-none group"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

          {/* User */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <User size={32} className="text-cyan-400" />
            </div>
            <span className="text-sm font-bold text-cyan-400">User</span>
          </div>

          {/* Server */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <Server size={32} className="text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-emerald-400">Server</span>
          </div>

          {/* Connection Line */}
          <div className="absolute top-1/2 left-24 right-24 h-0.5 bg-slate-700 -translate-y-1/2"></div>

          {/* Moving Packet */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-transform will-change-transform z-20"
            style={{ left: `calc(10% + ${packetPos * 0.8}%)` }}
            onMouseEnter={() => setIsHoveringPacket(true)}
            onMouseLeave={() => setIsHoveringPacket(false)}
          >
            <div className={`
              relative p-3 rounded-lg shadow-xl transform transition-all duration-300
              ${isSecure 
                ? 'bg-slate-800 border-2 border-emerald-500' 
                : 'bg-yellow-50 border-2 border-yellow-400'
              }
            `}>
              {isSecure ? (
                <Briefcase className="text-emerald-400" size={32} />
              ) : (
                <Mail className="text-yellow-600" size={32} />
              )}
            </div>
          </div>

          {/* Spyglass Cursor (Follows Mouse) */}
          <div 
            className="pointer-events-none absolute w-32 h-32 border-4 border-rose-500 rounded-full z-50 flex items-center justify-center backdrop-blur-sm bg-rose-900/10 shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-opacity opacity-0 group-hover:opacity-100"
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <Search className="absolute -right-4 -bottom-4 text-rose-500 transform rotate-90" size={48} />
            
            {/* Reveal Content if over packet */}
            {isHoveringPacket && (
              <div className="bg-black/90 text-xs p-2 rounded border border-rose-500 text-center font-mono">
                <div className="text-rose-400 font-bold mb-1">INTERCEPTED</div>
                {isSecure ? (
                  <span className="text-emerald-400">
                    Encrypted:<br/>
                    x8#jd9@kL2
                  </span>
                ) : (
                  <span className="text-yellow-400">
                    Password:<br/>
                    123456
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-sm animate-pulse">
            Hover over the moving packet to spy on it
          </div>

        </div>
      </div>
    </div>
  );
};
