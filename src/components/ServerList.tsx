import React from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, Signal } from 'lucide-react';

export interface Server {
  id: string;
  name: string;
  country: string;
  latency: number;
  load: number;
  flag: string;
}

const SERVERS: Server[] = [
  { id: 'ao-luanda-unitel', name: 'AO - Unitel (Direct)', country: 'Angola', latency: 4, load: 15, flag: '🇦🇴' },
  { id: 'ao-luanda-africel', name: 'AO - Africell (Ultra)', country: 'Angola', latency: 3, load: 22, flag: '🇦🇴' },
  { id: 'za-premium', name: 'Premium - Johannesburg', country: 'África do Sul', latency: 28, load: 45, flag: '🇿🇦' },
  { id: 'br-hq', name: 'BR - São Paulo Core', country: 'Brasil', latency: 58, load: 30, flag: '🇧🇷' },
  { id: 'us-military', name: 'US - Military Grade', country: 'Estados Unidos', latency: 110, load: 12, flag: '🇺🇸' },
  { id: 'eu-vanguard', name: 'EU - Frankfurt Fast', country: 'Alemanha', latency: 135, load: 55, flag: '🇩🇪' },
];

interface ServerListProps {
  selectedId: string;
  onSelect: (server: Server) => void;
  disabled?: boolean;
}

export function ServerList({ selectedId, onSelect, disabled }: ServerListProps) {
  return (
    <div className="glass-morphism rounded-[2rem] p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Globe size={18} className="text-vpn-cyan" />
        <h3 className="text-xs font-black uppercase tracking-[0.2em] font-display">Hub Global de Nós</h3>
      </div>

      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
        {SERVERS.map((server) => {
          const isSelected = selectedId === server.id;
          return (
            <motion.button
              key={server.id}
              whileHover={!disabled ? { x: 4 } : {}}
              onClick={() => onSelect(server)}
              disabled={disabled}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
                isSelected 
                  ? 'bg-vpn-cyan/10 border-vpn-cyan/40 shadow-inner' 
                  : 'bg-black/20 border-white/5 hover:border-zinc-700'
              } disabled:opacity-50`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-xl filter drop-shadow-md">{server.flag}</span>
                <div>
                  <p className={`text-[10px] font-black font-mono tracking-tighter uppercase leading-none ${isSelected ? 'text-vpn-cyan' : 'text-zinc-400'}`}>
                    {server.name}
                  </p>
                  <p className="text-[8px] text-zinc-600 font-bold uppercase mt-1">Latência: {server.latency}ms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${server.load > 70 ? 'bg-vpn-danger' : 'bg-vpn-matrix'}`} 
                    style={{ width: `${server.load}%` }} 
                  />
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-vpn-cyan animate-pulse shadow-[0_0_8px_#00f7ff]" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 p-2.5 bg-black/40 rounded-xl border border-white/5">
        <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center">
           <Signal size={12} className="text-zinc-500" />
        </div>
        <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold">
          Seleção Inteligente de Nó de Baixa Latência Ativada
        </p>
      </div>
    </div>
  );
}
