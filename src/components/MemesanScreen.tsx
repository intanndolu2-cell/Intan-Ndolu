import React, { useState } from "react";
import { motion } from "motion/react";
import { AppScreen, BookingDetails, ServiceType } from "../types";
import { MapPin, Navigation, Clock, CreditCard, DollarSign, ArrowLeft } from "lucide-react";

interface MemesanScreenProps {
  service: ServiceType;
  gopayBalance: number;
  onNavigate: (screen: AppScreen) => void;
  onConfirmOrder: (booking: BookingDetails) => void;
}

export default function MemesanScreen({ service, gopayBalance, onNavigate, onConfirmOrder }: MemesanScreenProps) {
  const [pickup, setPickup] = useState("SMK N 36 Jakarta");
  const [dropoff, setDropoff] = useState("RS Jakarta, Setiabudi");
  const [paymentMethod, setPaymentMethod] = useState<"Tunai" | "Gopay">("Gopay");
  const [isSelectingPickup, setIsSelectingPickup] = useState(false);
  const [isSelectingDropoff, setIsSelectingDropoff] = useState(false);

  // Sample favorite locations in Jakarta
  const locationsList = [
    "SMK N 36 Jakarta",
    "RS Jakarta, Setiabudi",
    "Kampus IT-PLN Duri Kosambi",
    "Universitas Yarsi Cempaka Putih",
    "Stasiun Gambir",
    "Mall Grand Indonesia",
    "Bandara Soekarno-Hatta T3",
    "Kota Tua Jakarta"
  ];

  // Base price calculations based on service type
  const getPrice = () => {
    let base = 12000;
    if (service === "gocar") base = 25000;
    if (service === "gofood") base = 15000;
    if (service === "gosend") base = 18000;
    if (service === "gomart") base = 10000;

    // Add slight variations based on length of strings to simulate distances
    const distFactor = (pickup.length + dropoff.length) * 150;
    return base + distFactor;
  };

  const calculatedPrice = getPrice();

  const handleOrder = () => {
    if (paymentMethod === "Gopay" && gopayBalance < calculatedPrice) {
      alert("Saldo GoPay tidak mencukupi! Silakan gunakan metode Tunai.");
      return;
    }

    onConfirmOrder({
      pickup,
      dropoff,
      date: "Sekarang",
      payment: paymentMethod,
      price: calculatedPrice,
      service
    });
  };

  return (
    <div id="booking_screen_container" className="relative flex flex-col justify-between h-full bg-slate-50 overflow-hidden rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      
      {/* Interactive Vector Map Background */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 400 600" className="w-full h-full text-slate-200" fill="none">
          {/* Background grid */}
          <rect width="400" height="600" fill="#f1f5f9" />
          
          {/* Street Blocks */}
          <rect x="20" y="40" width="80" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="120" y="40" width="160" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="300" y="40" width="80" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />

          <rect x="20" y="180" width="120" height="100" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="160" y="180" width="100" height="100" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="280" y="180" width="100" height="100" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />

          <rect x="20" y="300" width="120" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="160" y="300" width="100" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="280" y="300" width="100" height="120" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />

          {/* Road Grids (White Paths) */}
          <path d="M 0,170 L 400,170" stroke="#ffffff" strokeWidth="16" />
          <path d="M 0,290 L 400,290" stroke="#ffffff" strokeWidth="16" />
          <path d="M 110,0 L 110,600" stroke="#ffffff" strokeWidth="16" />
          <path d="M 270,0 L 270,600" stroke="#ffffff" strokeWidth="16" />

          {/* Map Labels / Landmarks */}
          <text x="35" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">Univ Yarsi</text>
          <text x="170" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">RS Islam Jakarta</text>
          <text x="40" y="220" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">SMK N 36</text>
          <text x="290" y="220" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">7-Eleven</text>

          {/* Simulated Route Line (Blue dashed) */}
          <path 
            d="M 150,240 L 150,170 L 270,170 L 270,350" 
            stroke="#2563eb" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeDasharray="6 4"
            className="animate-pulse-slow"
          />

          {/* Dropoff Pin (Blue) */}
          <g transform="translate(270, 350)">
            <circle cx="0" cy="0" r="16" fill="#2563eb" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="7" fill="#2563eb" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Top Header Controls overlay */}
      <div className="relative pt-12 px-5 z-20 flex justify-between items-center bg-gradient-to-b from-slate-900/40 to-transparent pb-6 pointer-events-none">
        <button
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className="pointer-events-auto bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow hover:bg-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <span className="pointer-events-auto bg-slate-900/75 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide">
          Memesan {service.toUpperCase()}
        </span>
      </div>

      {/* Booking Information Overlay Panel Card (Bottom aligned) */}
      <div className="relative z-20 bg-white/95 backdrop-blur-md p-5 rounded-t-[36px] shadow-2xl border-t border-gray-100 space-y-4">
        
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gojek" /> Informasi pemesanan
          </h4>
          <span className="text-xs text-gojek font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">
            Rp {(calculatedPrice).toLocaleString("id-ID")}
          </span>
        </div>

        {/* Pickup & Dropoff Selectors */}
        <div className="space-y-3 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
          
          {/* Pickup Address Selector */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Lokasi Penjemputan</p>
                {isSelectingPickup ? (
                  <select
                    id="select_pickup_location"
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value);
                      setIsSelectingPickup(false);
                    }}
                    className="w-full text-xs font-bold bg-transparent outline-none py-1 text-gray-800 border-b border-gray-200"
                    onBlur={() => setIsSelectingPickup(false)}
                  >
                    {locationsList.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                ) : (
                  <button
                    id="btn_select_pickup"
                    onClick={() => setIsSelectingPickup(true)}
                    className="w-full text-left text-xs font-bold text-gray-800 truncate py-1 hover:text-gojek cursor-pointer"
                  >
                    {pickup}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Spacer connector line */}
          <div className="w-[1.5px] h-3 bg-gray-300 ml-5.5 -my-2.5"></div>

          {/* Dropoff Address Selector */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Lokasi Antar</p>
                {isSelectingDropoff ? (
                  <select
                    id="select_dropoff_location"
                    value={dropoff}
                    onChange={(e) => {
                      setDropoff(e.target.value);
                      setIsSelectingDropoff(false);
                    }}
                    className="w-full text-xs font-bold bg-transparent outline-none py-1 text-gray-800 border-b border-gray-200"
                    onBlur={() => setIsSelectingDropoff(false)}
                  >
                    {locationsList.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                ) : (
                  <button
                    id="btn_select_dropoff"
                    onClick={() => setIsSelectingDropoff(true)}
                    className="w-full text-left text-xs font-bold text-gray-800 truncate py-1 hover:text-gojek cursor-pointer"
                  >
                    {dropoff}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Date Picker (Fixed "Sekarang" representation) */}
          <div className="border-t border-gray-200/60 pt-3 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div className="text-left">
              <p className="text-[9px] text-gray-400 font-semibold uppercase">Waktu Jemput</p>
              <span className="text-xs font-bold text-gray-800">Sekarang (Keberangkatan Segera)</span>
            </div>
          </div>
        </div>

        {/* Payment & Submit Row */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {/* Payment Method Selector toggle */}
          <div className="flex flex-col text-left">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Metode Pembayaran</p>
            <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
              <button
                id="btn_pay_tunai"
                onClick={() => setPaymentMethod("Tunai")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === "Tunai" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <DollarSign className="w-3 h-3" /> Tunai
              </button>
              <button
                id="btn_pay_gopay"
                onClick={() => setPaymentMethod("Gopay")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === "Gopay" ? "bg-cyan-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <CreditCard className="w-3 h-3" /> GoPay
              </button>
            </div>
          </div>

          {/* Big Order Button */}
          <motion.button
            id="btn_confirm_pesan"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOrder}
            className="flex-1 bg-gojek hover:bg-gojek-hover text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            Pesan {service === "gocar" ? "GoCar" : "GoRide"}
          </motion.button>
        </div>

      </div>

    </div>
  );
}
