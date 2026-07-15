import React from "react";
import { motion } from "motion/react";
import { AppScreen } from "../types";

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div id="home_screen_container" className="relative flex flex-col justify-between h-full bg-white overflow-hidden rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      {/* Top Header / Logo Area */}
      <div className="pt-12 px-6 flex flex-col items-center">
        {/* Gojek Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Custom SVG Gojek Ring Logo */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Ring */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-gojek">
              <circle cx="50" cy="53" r="30" stroke="currentColor" strokeWidth="13" fill="none" />
              <circle cx="50" cy="53" r="10" fill="currentColor" />
              {/* Top opening/cutout */}
              <rect x="40" y="10" width="20" height="18" fill="white" />
            </svg>
          </div>
          <span className="text-gojek font-display font-bold text-2xl mt-2 tracking-wide">Gojek</span>
        </motion.div>
      </div>

      {/* Center Illustration Group */}
      <div className="relative flex-1 flex items-center justify-center py-2">
        {/* Abstract Backdrop Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
        
        {/* Scooter and Car Illustrations */}
        <div className="relative w-full px-4 flex justify-between items-center z-10">
          {/* Driver on Scooter (Left) */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-5/12 flex flex-col items-center"
          >
            <div className="relative w-28 h-28 flex items-center justify-center bg-emerald-50 rounded-full shadow-inner border border-emerald-100">
              {/* Custom SVG Scooter Driver */}
              <svg viewBox="0 0 120 120" className="w-20 h-20">
                {/* Road Line */}
                <line x1="10" y1="105" x2="110" y2="105" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                {/* Wheels */}
                <circle cx="35" cy="92" r="11" fill="#1f2937" />
                <circle cx="35" cy="92" r="5" fill="#9ca3af" />
                <circle cx="85" cy="92" r="11" fill="#1f2937" />
                <circle cx="85" cy="92" r="5" fill="#9ca3af" />
                {/* Scooter Body */}
                <path d="M 35 92 L 55 92 L 65 75 L 85 92" stroke="#00aa13" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 30 75 L 35 92" stroke="#00aa13" strokeWidth="6" />
                <path d="M 85 92 L 80 65 L 75 55" stroke="#00aa13" strokeWidth="6" strokeLinecap="round" fill="none" />
                {/* Driver Seat & Backbox */}
                <rect x="42" y="72" width="22" height="8" rx="2" fill="#111827" />
                <rect x="24" y="60" width="16" height="16" rx="2" fill="#00aa13" />
                {/* Front Shield */}
                <path d="M 80 65 L 85 48" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
                <circle cx="87" cy="46" r="3" fill="#fbbf24" /> {/* Headlight */}
                {/* Helmet and Body */}
                <circle cx="58" cy="35" r="8" fill="#10b981" /> {/* Helmet */}
                <path d="M 58 35 L 63 35" stroke="#111827" strokeWidth="3" strokeLinecap="round" /> {/* Visor */}
                <path d="M 50 45 C 50 55, 66 55, 66 45" fill="#00aa13" /> {/* Green Jacket */}
                {/* Arms & Handlebar */}
                <path d="M 60 48 L 78 55" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[10px] font-mono text-gray-400 mt-2">GoRide Driver</span>
          </motion.div>

          {/* Center Food & Car Pack (Right) */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="w-5/12 flex flex-col items-center"
          >
            <div className="relative w-28 h-28 flex items-center justify-center bg-emerald-50 rounded-full shadow-inner border border-emerald-100">
              {/* Custom SVG GoCar */}
              <svg viewBox="0 0 120 120" className="w-20 h-20">
                {/* Shadow */}
                <ellipse cx="60" cy="100" rx="40" ry="8" fill="#e5e7eb" />
                {/* Car Body */}
                <path d="M 25 90 L 95 90 C 95 90, 105 90, 102 75 C 98 62, 90 62, 85 62 L 35 62 C 30 62, 22 62, 18 75 C 15 90, 25 90, 25 90 Z" fill="#1f2937" />
                {/* Roof/Cabin */}
                <path d="M 38 62 L 48 42 L 72 42 L 82 62 Z" fill="#374151" />
                {/* Windows */}
                <path d="M 41 60 L 49 45 L 58 45 L 58 60 Z" fill="#60a5fa" />
                <path d="M 62 60 L 62 45 L 71 45 L 79 60 Z" fill="#60a5fa" />
                {/* Wheels */}
                <circle cx="38" cy="90" r="10" fill="#111827" />
                <circle cx="38" cy="90" r="4" fill="#9ca3af" />
                <circle cx="82" cy="90" r="10" fill="#111827" />
                <circle cx="82" cy="90" r="4" fill="#9ca3af" />
                {/* Lights */}
                <polygon points="18,74 14,78 18,82" fill="#fbb63f" />
                <polygon points="102,74 106,78 102,82" fill="#ef4444" />
                {/* Food Package on table next to car */}
                <rect x="75" y="78" width="18" height="18" rx="2" fill="#ef4444" />
                <circle cx="84" cy="84" r="3" fill="#ffffff" />
              </svg>
            </div>
            <span className="text-[10px] font-mono text-gray-400 mt-2">GoCar & Food</span>
          </motion.div>
        </div>
      </div>

      {/* Main Content Title Area */}
      <div className="px-8 text-center z-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display font-bold text-2xl text-gray-900 tracking-tight leading-snug"
        >
          Perjalanan aman di <br/>
          <span className="text-gojek">ujung jari anda</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm mt-3 leading-relaxed"
        >
          Siap mengantar kemanapun anda mau dengan standar keamanan terbaik.
        </motion.p>
      </div>

      {/* Buttons & Bottom Shapes Area */}
      <div className="relative pt-8 pb-12 px-8 flex flex-col gap-4 z-20 bg-gradient-to-t from-white via-white to-transparent">
        {/* Login Button */}
        <motion.button
          id="btn_home_login"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(AppScreen.LOGIN)}
          className="w-full bg-gojek hover:bg-gojek-hover text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors cursor-pointer text-center"
        >
          Login
        </motion.button>

        {/* Daftar / Register Button */}
        <motion.button
          id="btn_home_register"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(AppScreen.LOGIN)}
          className="w-full bg-white border-2 border-gojek hover:bg-gojek-light text-gojek font-semibold py-4 rounded-2xl shadow-sm transition-colors cursor-pointer text-center"
        >
          Daftar
        </motion.button>

        {/* Decorative clouds in the bottom area */}
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-400 rounded-full opacity-25 blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-10 w-44 h-44 bg-gojek rounded-full opacity-20 blur-xl pointer-events-none"></div>
      </div>

      {/* Stylized Curved Vector Bottom Grid like the design */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full text-gojek">
          <path d="M0,150 L500,150 L500,50 Q350,120 200,60 T0,110 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
