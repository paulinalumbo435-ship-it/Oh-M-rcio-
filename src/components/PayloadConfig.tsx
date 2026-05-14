import React from 'react';
import { Terminal, Network, Send, Zap, ShieldCheck } from 'lucide-react';

interface PayloadConfigProps {
  payload: string;
  setPayload: (val: string) => void;
  sni: string;
  setSni: (val: string) => void;
  disabled?: boolean;
}

export function PayloadConfig({ payload, setPayload, sni, setSni, disabled }: PayloadConfigProps) {
  return (
    <div className="glass-morphism rounded-[2rem] p-6 space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-vpn-cyan" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] font-display">Injeção Dinâmica</h3>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-vpn-cyan/10 border border-vpn-cyan/20">
          <span className="text-[8px] font-black text-vpn-cyan uppercase">Bypass Ativo</span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono mb-2 block font-black">
            Point-of-Entry (SNI)
          </label>
          <div className="relative">
            <Network size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input 
              type="text" 
              value={sni}
              onChange={(e) => setSni(e.target.value)}
              disabled={disabled}
              className="w-full bg-black/60 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-[10px] font-mono text-zinc-300 focus:border-vpn-cyan/50 outline-none transition-all disabled:opacity-50 tracking-tighter"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono mb-2 block font-black">
            Scripts de Encapsulamento
          </label>
          <div className="relative h-[80px]">
            <Terminal size={14} className="absolute left-3 top-3 text-zinc-600" />
            <textarea 
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              disabled={disabled}
              className="w-full h-full bg-black/60 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-[9px] font-mono text-vpn-matrix/70 focus:border-vpn-cyan/50 outline-none transition-all resize-none disabled:opacity-50 no-scrollbar"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-vpn-cyan/5 rounded-[1.25rem] border border-vpn-cyan/10">
        <ShieldCheck size={14} className="text-vpn-cyan" />
        <p className="text-[8px] text-zinc-500 font-mono font-bold leading-tight uppercase tracking-wider">
          Handshake optimizado para <span className="text-white">Redes Angolanas</span> (Bypass v4).
        </p>
      </div>
    </div>
  );
}
