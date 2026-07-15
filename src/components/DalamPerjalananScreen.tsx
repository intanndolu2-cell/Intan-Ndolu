import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AppScreen, BookingDetails, DriverInfo } from "../types";
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Play, FastForward } from "lucide-react";

interface DalamPerjalananScreenProps {
  booking: BookingDetails | null;
  driver: DriverInfo;
  onNavigate: (screen: AppScreen) => void;
  onTripCompleted: () => void;
}

export default function DalamPerjalananScreen({
  booking,
  driver,
  onNavigate,
  onTripCompleted
}: DalamPerjalananScreenProps) {
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [eta, setEta] = useState(15); // minutes left
  const [isPaused, setIsPaused] = useState(false);

  // Default fallback if booking is null
  const activeBooking = booking || {
    pickup: "SMK N 36 Jakarta",
    dropoff: "RS Jakarta, Setiabudi",
    price: 18000,
    payment: "Gopay",
    service: "goride"
  };

  // Simulate travel progression
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const nextProgress = prev + 5;
        // Decrease ETA corresponding to progress
        setEta(Math.max(1, Math.ceil(15 - (nextProgress / 100) * 14)));
        return nextProgress;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle immediate completion for fast evaluation
  const handleFastForward = () => {
    setProgress(100);
    setEta(1);
    onTripCompleted();
  };

  // Animated Coordinates for moving marker on the map path
  const getMarkerCoords = () => {
    // Starting coordinates
    const startX = 150;
    const startY = 240;

    // Turn 1
    const turn1X = 150;
    const turn1Y = 170;

    // Turn 2
    const turn2X = 270;
    const turn2Y = 170;

    // Destination
    const endX = 270;
    const endY = 350;

    // Segment 1: from (150, 240) to (150, 170) -> length 70 (approx 19% of path)
    // Segment 2: from (150, 170) to (270, 170) -> length 120 (approx 32% of path, up to 51%)
    // Segment 3: from (270, 170) to (270, 350) -> length 180 (approx 49% of path)

    if (progress < 19) {
      const p = progress / 19;
      return {
        x: startX,
        y: startY + p * (turn1Y - startY),
        angle: 270
      };
    } else if (progress < 51) {
      const p = (progress - 19) / 32;
      return {
        x: turn1X + p * (turn2X - turn1X),
        y: turn1Y,
        angle: 0
      };
    } else {
      const p = (progress - 51) / 49;
      return {
        x: turn2X,
        y: turn1Y + p * (endY - turn1Y),
        angle: 90
      };
    }
  };

  const coords = getMarkerCoords();

  return (
    <div id="trip_screen_container" className="relative flex flex-col justify-between h-full bg-slate-50 overflow-hidden rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      
      {/* Simulation Banner Info overlay */}
      <div className="absolute top-12 left-5 right-5 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          Perjalanan Sedang Berlangsung...
        </div>

        {/* Fast-forward simulation tool */}
        <button
          id="btn_fast_forward_trip"
          onClick={handleFastForward}
          className="pointer-events-auto bg-white/90 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-lg text-gojek transition-transform active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-bold px-3.5"
          title="Selesaikan Perjalanan (Instan)"
        >
          <FastForward className="w-4 h-4" /> Lewati
        </button>
      </div>

      {/* Animated Vector Navigation Map Grid */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 400 600" className="w-full h-full text-slate-200" fill="none">
          <rect width="400" height="600" fill="#f8fafc" />
          
          {/* Street Blocks */}
          <rect x="20" y="40" width="80" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="120" y="40" width="160" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="300" y="40" width="80" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />

          <rect x="20" y="180" width="120" height="100" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="160" y="180" width="100" height="100" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="280" y="180" width="100" height="100" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />

          <rect x="20" y="300" width="120" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="160" y="300" width="100" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <rect x="280" y="300" width="100" height="120" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />

          {/* Road Grids */}
          <path d="M 0,170 L 400,170" stroke="#ffffff" strokeWidth="20" />
          <path d="M 0,290 L 400,290" stroke="#ffffff" strokeWidth="20" />
          <path d="M 110,0 L 110,600" stroke="#ffffff" strokeWidth="20" />
          <path d="M 270,0 L 270,600" stroke="#ffffff" strokeWidth="20" />

          {/* Map labels */}
          <text x="35" y="80" fill="#cbd5e1" fontSize="8" fontWeight="bold">Univ Yarsi</text>
          <text x="170" y="80" fill="#cbd5e1" fontSize="8" fontWeight="bold">RS Islam Jakarta</text>
          <text x="40" y="220" fill="#cbd5e1" fontSize="8" fontWeight="bold">SMK N 36</text>
          <text x="290" y="220" fill="#cbd5e1" fontSize="8" fontWeight="bold">7-Eleven</text>

          {/* Static Full Route Line */}
          <path 
            d="M 150,240 L 150,170 L 270,170 L 270,350" 
            stroke="#cbd5e1" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />

          {/* Active Passed Route Line (Green) */}
          <path 
            d="M 150,240 L 150,170 L 270,170 L 270,350" 
            stroke="#10b981" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeDasharray="370"
            strokeDashoffset={370 - (progress / 100) * 370}
            transition="stroke-dashoffset 0.5s ease-out"
          />

          {/* Ending dropoff marker pin */}
          <g transform="translate(270, 350)">
            <circle cx="0" cy="0" r="14" fill="#2563eb" fillOpacity="0.15" />
            <circle cx="0" cy="0" r="6" fill="#2563eb" />
          </g>

          {/* Moving Simulated Driver scooter/car icon */}
          <g transform={`translate(${coords.x}, ${coords.y}) rotate(${coords.angle})`}>
            {/* Pulsing beacon */}
            <circle cx="0" cy="0" r="12" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
            <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#00aa13" stroke="#ffffff" strokeWidth="2" shadow-md />
            <text x="-4" y="4" fontSize="11" fill="#ffffff" fontWeight="bold">
              {activeBooking.service === "gocar" ? "🚗" : "🛵"}
            </text>
          </g>
        </svg>
      </div>

      {/* Driver Card Panel (Overlay at bottom) */}
      <div className="relative z-20 bg-white/95 backdrop-blur-md p-5 rounded-t-[36px] shadow-2xl border-t border-gray-100 space-y-4">
        
        {/* Progress Bar indicator */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-gray-400 font-bold">
            <span>Sisa Jarak: {((100 - progress) / 20).toFixed(1)} km</span>
            <span>Sisa Waktu: {eta} menit</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gojek transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Driver Details Row */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            {/* Driver Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-base shadow-sm">
                CW
              </div>
              <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-gray-900 text-[9px] font-extrabold px-1 rounded-md border border-white">
                ★ 4.9
              </span>
            </div>

            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">{driver.name}</h4>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">{driver.type} • {driver.vehicle}</p>
            </div>
          </div>

          {/* Quick Communication Actions (Chat & Phone) */}
          <div className="flex items-center gap-3">
            {/* Phone Icon */}
            <button
              id="btn_call_driver"
              onClick={() => {
                alert(`Memanggil ${driver.name} (${driver.phone})...`);
              }}
              className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 text-gray-600 rounded-2xl cursor-pointer transition-colors"
            >
              <Phone className="w-5 h-5" />
            </button>

            {/* Chat Icon with active pulse reminder */}
            <button
              id="btn_trip_chat"
              onClick={() => onNavigate(AppScreen.CHAT)}
              className="p-3 bg-gojek-light hover:bg-emerald-100 text-gojek rounded-2xl cursor-pointer transition-colors relative"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border border-white animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Delivery Details List */}
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase">Lokasi Antar</p>
              <p className="text-xs font-bold text-gray-800 truncate w-32">{activeBooking.dropoff}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase">Metode & Biaya</p>
              <p className="text-xs font-bold text-gray-800">{activeBooking.payment} • Rp {activeBooking.price.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>

        {/* Security / Assurance label */}
        <div className="bg-emerald-50 p-2.5 rounded-xl flex items-center gap-2 text-[10px] text-emerald-800 font-medium">
          <ShieldCheck className="w-4 h-4 text-gojek shrink-0" />
          <span>Perjalanan Anda diasuransikan & dipantau standar keselamatan Gojek.</span>
        </div>

      </div>

    </div>
  );
}
