import React from 'react';
import { Download, Upload, Activity, ShieldCheck, Zap, Database } from 'lucide-react';

export interface TrafficData {
  downloadSpeed: number;
  uploadSpeed: number;
  totalData: number;
  ping: number;
  uptime: string;
}

interface VPNStatsProps {
  isConnected: boolean;
  data: TrafficData;
}

interface StatItemProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  subValue?: string;
}

function StatItem({ label, value, unit, icon, color, subValue }: StatItemProps) {
  return (
    <div className="glass-morphism border border-white/5 p-5 rounded-[2rem] flex items-center gap-5 flex-1 shadow-2xl transition-all hover:scale-[1.02]">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-100 shadow-xl border border-white/5`}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-black font-mono mb-1">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-mono font-black tracking-tighter text-zinc-100">{value}</span>
          <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase">{unit}</span>
        </div>
        {subValue && (
          <p className="text-[8px] text-zinc-700 font-mono font-bold mt-0.5">{subValue}</p>
        )}
      </div>
    </div>
  );
}

export function VPNStats({ isConnected, data }: VPNStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      <StatItem 
        label="Download" 
        value={isConnected ? data.downloadSpeed.toFixed(1) : "0.0"} 
        unit="Mbps" 
        icon={<Download size={22} />} 
        color="text-vpn-cyan bg-vpn-cyan"
        subValue={isConnected ? "Fluxo Estabilizado" : ""}
      />
      <StatItem 
        label="Upload" 
        value={isConnected ? data.uploadSpeed.toFixed(1) : "0.0"} 
        unit="Mbps" 
        icon={<Upload size={22} />} 
        color="text-vpn-purple bg-vpn-purple"
        subValue={isConnected ? "Tunelamento Prioritário" : ""}
      />
      <StatItem 
        label="Consumido" 
        value={isConnected ? data.totalData.toFixed(2) : "0.00"} 
        unit="MB" 
        icon={<Database size={22} />} 
        color="text-orange-500 bg-orange-500"
        subValue="Internet Ilimitada"
      />
      <StatItem 
        label="Sessão" 
        value={isConnected ? data.uptime : "00:00:00"} 
        unit="" 
        icon={<ShieldCheck size={22} />} 
        color="text-vpn-matrix bg-vpn-matrix"
        subValue="Proteção Máxima"
      />
    </div>
  );
}
