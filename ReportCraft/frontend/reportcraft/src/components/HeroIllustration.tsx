"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroIllustration() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, yDest: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles([...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
      yDest: Math.random() * -100 - 50,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5
    })));
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center pointer-events-none" aria-hidden="true">
      {/* Background Radiance */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Central Nexus Orb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[40px] glass border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        
        {/* Animated Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i }
            }}
            className="absolute border border-white/10 rounded-full"
            style={{ 
              inset: `${i * 20}px`,
              opacity: 0.5 / i
            }}
          />
        ))}

        {/* Central Core */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_80px_rgba(34,211,238,0.4)] transition-all duration-700">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400">
             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ 
                x: p.x, 
                y: p.y,
                opacity: 0 
              }}
              animate={{ 
                y: [null, p.yDest],
                opacity: [0, 0.4, 0] 
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay 
              }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
            />
          ))}
        </div>
      </motion.div>

      {/* Exterior Satellites */}
      {[
        { x: -50, y: -40, delay: 0.8, color: "bg-cyan-400" },
        { x: 60, y: -20, delay: 1, color: "bg-indigo-400" },
        { x: -20, y: 70, delay: 1.2, color: "bg-purple-400" }
      ].map((sat, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: sat.delay, duration: 0.6 }}
           className="absolute"
           style={{ 
             left: `calc(50% + ${sat.x}%)`, 
             top: `calc(50% + ${sat.y}%)` 
           }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className={`w-4 h-4 rounded-lg glass border border-white/20 flex items-center justify-center ${sat.color}/20`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${sat.color}`} />
          </motion.div>
          {/* Connection Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100px" }}
            transition={{ delay: sat.delay + 0.3, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/20 to-transparent origin-top rotate-[190deg]"
          />
        </motion.div>
      ))}
    </div>
  );
}
