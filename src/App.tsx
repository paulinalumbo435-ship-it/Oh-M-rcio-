import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Power, 
  Settings, 
  Lock, 
  RefreshCw,
  Globe,
  Terminal,
  Activity,
  Zap,
  Cpu,
  Database,
  BarChart3,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  EyeOff
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { TrafficData } from './components/VPNStats';
import { ServerList, Server } from './components/ServerList';
import { PayloadConfig } from './components/PayloadConfig';

interface ChartDataPoint {
  time: string;
  download: number;
  upload: number;
}

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isStealthMode, setIsStealthMode] = useState(true);
  const [sni, setSni] = useState('internet.unitel.ao');
  const [payload, setPayload] = useState('CONNECT [host_port] HTTP/1.1[crlf]Host: internet.unitel.ao[crlf]Connection: Keep-Alive[crlf][crlf]');
  const [connectionLog, setConnectionLog] = useState<string[]>([]);
  const [trafficHistory, setTrafficHistory] = useState<ChartDataPoint[]>([]);
  
  const [traffic, setTraffic] = useState<TrafficData>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    totalData: 0,
    ping: 0,
    uptime: '00:00:00'
  });
  
  const [selectedServer, setSelectedServer] = useState<Server>({
    id: 'ao-luanda-unitel', 
    name: 'AO - Unitel (Direct)', 
    country: 'Angola', 
    latency: 4, 
    load: 15, 
    flag: '🇦🇴' 
  });

  const [selectedMethod, setSelectedMethod] = useState('SSH Direct');
  const methods = ['SSH Direct', 'V2Ray (BETA)', 'Trojan-Go', 'Shadowsocks', 'DNSTT'];

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    setConnectionLog(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 15));
  };

  // Initialize chart data
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: i.toString(),
      download: 0,
      upload: 0
    }));
    setTrafficHistory(initialData);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      const start = Date.now();
      addLog('⚡ Fluxo de dados encriptado ativo.');
      
      interval = setInterval(() => {
        setTraffic(prev => {
          const ds = Math.random() * 120 + 30;
          const us = Math.random() * 45 + 5;
          const addedData = (ds + us) * 0.125;
          
          const now = Date.now();
          const diff = now - start;
          const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
          const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
          const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

          setTrafficHistory(history => {
            const newPoint = {
              time: s,
              download: Number(ds.toFixed(1)),
              upload: Number(us.toFixed(1))
            };
            return [...history.slice(1), newPoint];
          });

          return {
            downloadSpeed: ds,
            uploadSpeed: us,
            totalData: prev.totalData + addedData,
            ping: Math.floor(Math.random() * 10) + 2,
            uptime: `${h}:${m}:${s}`
          };
        });
      }, 1000);
    } else {
      setTraffic(prev => ({ ...prev, downloadSpeed: 0, uploadSpeed: 0, ping: 0 }));
      setTrafficHistory(prev => prev.map(p => ({ ...p, download: 0, upload: 0 })));
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const toggleConnection = async () => {
    if (isConnected) {
      setIsConnected(false);
      addLog('X Sessão finalizada. Túnel encerrado.');
    } else {
      setIsConnecting(true);
      setConnectionLog([]);
      addLog('> [BOOT] Carregando kernel Márcio ULTRA PRO...');
      addLog(`> [PROTOCOL] Configurando ${selectedMethod}...`);
      
      try {
        await new Promise(r => setTimeout(r, 800));
        addLog(`> [SECURITY] Camada Stealth: ${isStealthMode ? 'ATIVA (AES-GCM-256)' : 'INATIVA'}`);
        addLog(`> [HANDSHAKE] Enviando SNI v2: ${sni}`);
        
        await new Promise(r => setTimeout(r, 1000));
        addLog('> [INJECT] Forçando cabeçalhos HTTP customizados...');
        addLog(`> [REMOTE] Conectando ao Host: ${selectedServer.name}`);
        
        const response = await fetch('/api/tunnel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: 'https://google.com', payload, sni, stealth: isStealthMode })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
          addLog('✓ Sucesso: Handshake SSH-2.0 estabelecido.');
          addLog(`✓ IP Virtual Atribuído: 10.8.0.${Math.floor(Math.random() * 254)}`);
          addLog('⚡ SISTEMA ULTRA PRO ONLINE - NAVEGAÇÃO ILIMITADA');
          setIsConnected(true);
        } else {
          addLog('! FALHA: Servidor remoto recusou a chave de acesso.');
        }
      } catch (e) {
        addLog('! TIMEOUT: Tempo de resposta do servidor excedido.');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-vpn-black ultra-grid ultra-grid-fine flex flex-col items-center p-4 md:p-8 font-sans overflow-x-hidden selection:bg-vpn-cyan selection:text-black">
      <div className="scanline" />
      
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${isConnected ? 'opacity-20' : 'opacity-10'}`}>
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-vpn-cyan rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-vpn-purple opacity-50 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <main className="w-full max-w-7xl z-10 space-y-6">
        {/* Header: Branding & Global Controls */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-morphism rounded-[2rem] p-6 lg:p-8">
          <div className="flex items-center gap-5">
            <motion.div 
              animate={isConnected ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                isConnected ? 'bg-vpn-matrix/10 border-vpn-matrix glow-success text-vpn-matrix' : 'bg-vpn-cyan/10 border-vpn-cyan glow-cyan text-vpn-cyan'
              }`}
            >
              <Shield size={32} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black font-display tracking-tighter uppercase italic bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  Márcio VPN <span className="text-vpn-cyan tracking-normal not-italic">ULTRA PRO</span>
                </h1>
                <span className="bg-vpn-cyan text-black text-[8px] font-black px-1.5 py-0.5 rounded leading-none uppercase">v3.0.4</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-vpn-matrix shadow-[0_0_10px_#00ff41]' : 'bg-zinc-700'}`} />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
                  {isConnected ? 'Encriptação AES-256 Ativa' : 'Tunelamento em Standby'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-center">
            <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/5">
              {['SSH', 'V2RAY', 'SSL', 'UDP'].map(p => (
                <button
                  key={p}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                    p === 'SSH' ? 'bg-vpn-cyan text-black shadow-lg glow-cyan' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Core Controls */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            
            {/* Connection Node */}
            <section className="glass-morphism rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-vpn-cyan/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleConnection}
                  disabled={isConnecting}
                  className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center transition-all duration-700 border-[10px] ${
                    isConnected 
                      ? 'bg-vpn-matrix/10 border-vpn-matrix glow-success shadow-[inset_0_0_40px_rgba(0,255,65,0.2)]' 
                      : isConnecting 
                        ? 'bg-vpn-cyan/10 border-vpn-cyan animate-pulse shadow-[0_0_60px_rgba(0,247,255,0.2)]'
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-500 shadow-xl'
                  }`}
                >
                  <AnimatePresence>
                    {isConnected && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border-2 border-vpn-matrix/40"
                            animate={{ scale: [1, 1.4, 1.8], opacity: [0.8, 0.4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Power 
                    size={72} 
                    className={`relative z-20 transition-all duration-700 ${
                      isConnected ? 'text-vpn-matrix rotate-0' : isConnecting ? 'text-vpn-cyan' : 'text-zinc-700'
                    }`} 
                  />
                  <span className="relative z-20 mt-4 font-mono text-[10px] lowercase tracking-[0.3em] font-black opacity-50">
                    {isConnected ? 'shutdown' : isConnecting ? 'executing' : 'ready_v3'}
                  </span>
                </motion.button>

                <div className="mt-12 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-2">Protocol Matrix</span>
                  <div className="flex gap-1.5">
                    {[1, 1, 1, 0, 1].map((active, i) => (
                      <div key={i} className={`w-3 h-1.5 rounded-full ${active ? (isConnected ? 'bg-vpn-matrix' : 'bg-vpn-cyan') : 'bg-zinc-800'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Stealth & Settings */}
            <section className="glass-morphism rounded-[2rem] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isStealthMode ? 'bg-vpn-purple/20 text-vpn-purple border border-vpn-purple/30' : 'bg-zinc-800/50 text-zinc-600'}`}>
                    <EyeOff size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Modo Stealth</h3>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase mt-0.5">Bypass Deep Packet Inspection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsStealthMode(!isStealthMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${isStealthMode ? 'bg-vpn-purple' : 'bg-zinc-800'}`}
                >
                  <motion.div 
                    animate={{ x: isStealthMode ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-md" 
                  />
                </button>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Turbo Boost</h3>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase mt-0.5">Otimização de Rota Local</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 uppercase tracking-tighter">Ativo</span>
              </div>
            </section>
          </div>

          {/* Center Column: Charts & Metrics */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            {/* Real-time Graph */}
            <section className="glass-morphism rounded-[2.5rem] p-6 h-[320px] flex flex-col relative overflow-hidden">
               <div className="flex items-center justify-between mb-4 px-2">
                 <div className="flex items-center gap-3">
                    <BarChart3 size={18} className="text-vpn-cyan" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 font-mono">Tráfego de Rede (Live)</h3>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-vpn-cyan" />
                      <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">Down</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-vpn-purple" />
                      <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">Up</span>
                    </div>
                 </div>
               </div>
               
               <div className="flex-1 -ml-8 -mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficHistory}>
                    <defs>
                      <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f7ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f7ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#bd00ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#bd00ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 150]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }} 
                      itemStyle={{ color: '#00f7ff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="download" 
                      stroke="#00f7ff" 
                      fillOpacity={1} 
                      fill="url(#colorDown)" 
                      strokeWidth={3}
                      isAnimationActive={false}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="upload" 
                      stroke="#bd00ff" 
                      fillOpacity={1} 
                      fill="url(#colorUp)" 
                      strokeWidth={3}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
               </div>
            </section>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-morphism rounded-[2rem] p-6 flex flex-col items-center text-center">
                 <ArrowDownLeft size={24} className="text-vpn-cyan mb-3" />
                 <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Download</span>
                 <p className="text-2xl font-black font-mono tracking-tighter">
                   {isConnected ? traffic.downloadSpeed.toFixed(1) : '0.0'}
                   <span className="text-[10px] text-zinc-500 ml-1">Mbps</span>
                 </p>
              </div>
              <div className="glass-morphism rounded-[2rem] p-6 flex flex-col items-center text-center">
                 <ArrowUpRight size={24} className="text-vpn-purple mb-3" />
                 <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Upload</span>
                 <p className="text-2xl font-black font-mono tracking-tighter">
                   {isConnected ? traffic.uploadSpeed.toFixed(1) : '0.0'}
                   <span className="text-[10px] text-zinc-500 ml-1">Mbps</span>
                 </p>
              </div>
            </div>

            {/* Terminal Log */}
            <section className="glass-morphism rounded-[2rem] p-6 h-[180px] overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={16} className="text-zinc-500" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 font-mono">Kernel Output</h3>
              </div>
              <div className="flex-1 font-mono text-[9px] space-y-1.5 overflow-y-auto no-scrollbar mask-gradient-b">
                {connectionLog.length === 0 && <p className="text-zinc-800 italic uppercase tracking-tighter">Engine ready for execution...</p>}
                {connectionLog.map((log, i) => (
                  <div key={i} className="flex gap-3 leading-tight">
                    <span className="text-zinc-700">[{i}]</span>
                    <p className={`${
                      log.includes('✓') || log.includes('⚡') ? 'text-vpn-matrix' : 
                      log.includes('!') || log.includes('X') ? 'text-vpn-danger' : 
                      'text-zinc-400'
                    }`}>
                      {log}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Settings & Server */}
          <div className="lg:col-span-12 xl:col-span-3 space-y-6">
            
            {/* Active Identity */}
            <section className="glass-morphism rounded-[2rem] p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-vpn-cyan/20 to-vpn-purple/20 flex items-center justify-center">
                      <Cpu size={28} className="text-zinc-500" />
                   </div>
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-1">ID da Sessão</h3>
                <p className="text-[10px] font-mono text-zinc-500">PRO_TUNNEL_X284_ANG</p>
                
                <div className="mt-6 w-full space-y-3">
                   <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-600 uppercase">Status IP</span>
                      <span className={isConnected ? 'text-vpn-matrix' : 'text-zinc-400'}>
                        {isConnected ? 'Oculto' : 'Exposto'}
                      </span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-600 uppercase">Ping</span>
                      <span className="text-zinc-300">{isConnected ? traffic.ping : '--'} ms</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-600 uppercase">Tempo</span>
                      <span className="text-zinc-300">{isConnected ? traffic.uptime : '00:00:00'}</span>
                   </div>
                </div>
              </div>
            </section>

            {/* Config Panels */}
            <ServerList 
              selectedId={selectedServer.id} 
              onSelect={setSelectedServer}
              disabled={isConnecting || isConnected}
            />
            
            <PayloadConfig 
              payload={payload}
              setPayload={setPayload}
              sni={sni}
              setSni={setSni}
              disabled={isConnecting || isConnected}
            />

          </div>
        </div>

        {/* Global Footer */}
        <footer className="glass-morphism rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-8">
             <div className="flex flex-col">
                <span className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-[0.3em]">Rede Luanda</span>
                <span className="text-[10px] font-bold text-zinc-300">Unitel / Africell Bypassed</span>
             </div>
             <div className="w-px h-8 bg-white/5" />
             <div className="flex gap-4">
                <button className="text-zinc-500 hover:text-vpn-cyan transition-colors"><Globe size={18} /></button>
                <button className="text-zinc-500 hover:text-vpn-cyan transition-colors"><ShieldAlert size={18} /></button>
                <button className="text-zinc-500 hover:text-vpn-cyan transition-colors"><Settings size={18} /></button>
             </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-xs font-black uppercase tracking-tighter text-zinc-300 italic">Unlimited Ultra Pass</p>
                 <p className="text-[9px] font-mono text-vpn-matrix uppercase tracking-[0.2em] font-bold leading-none">Acesso Vitalício Ativado</p>
              </div>
              <button className="bg-vpn-cyan text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] glow-cyan transition-all hover:scale-105 active:scale-95">
                MAX PRO ACTIVE
              </button>
           </div>
        </footer>
      </main>

      {/* Futuristic Key Indicator */}
      <AnimatePresence>
        {isConnected && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 90 }}
            className="fixed top-8 right-8 z-50 flex items-center gap-3 bg-vpn-black border-2 border-vpn-matrix p-4 rounded-3xl glow-success"
          >
             <Lock size={24} className="text-vpn-matrix" />
             <div className="flex flex-col">
               <span className="text-[8px] font-mono font-black text-zinc-600 uppercase tracking-widest leading-none">Chave</span>
               <span className="text-[10px] font-black text-vpn-matrix uppercase leading-tight font-display italic">ULTRA PRO</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-32 h-32 mb-8">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-4 border-vpn-cyan/20 border-t-vpn-cyan rounded-full shadow-[0_0_40px_rgba(0,247,255,0.2)]" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-4 border-2 border-vpn-purple/20 border-b-vpn-purple rounded-full" 
               />
               <Shield className="absolute inset-0 m-auto text-vpn-cyan/40" size={32} />
            </div>
            <h2 className="text-2xl font-black font-display uppercase tracking-widest glow-text-cyan mb-2">Tunelando Tráfego</h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] animate-pulse">Estabelecendo Handshake Seguro V2</p>
            
            <div className="mt-12 w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
                 className="h-full bg-vpn-cyan glow-cyan" 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
