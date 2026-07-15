import React, { useState } from "react";
import { motion } from "motion/react";
import { AppScreen, ServiceType } from "../types";
import { 
  Search, 
  User, 
  ArrowUp, 
  Plus, 
  MoreHorizontal, 
  Compass, 
  Ticket, 
  ClipboardList, 
  MessageSquare,
  Sparkles,
  Percent,
  ChevronRight,
  LogOut,
  Wallet
} from "lucide-react";

interface DashboardScreenProps {
  username: string;
  gopayBalance: number;
  coinsBalance: number;
  onNavigate: (screen: AppScreen) => void;
  onSelectService: (service: ServiceType) => void;
  onLogout: () => void;
  onTopUp: () => void;
}

export default function DashboardScreen({
  username,
  gopayBalance,
  coinsBalance,
  onNavigate,
  onSelectService,
  onLogout,
  onTopUp
}: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Format IDR Balance
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num).replace("Rp", "Rp");
  };

  const services = [
    { id: "goride" as ServiceType, name: "GoRide", badge: "5RB", color: "bg-[#e2f7ef] text-emerald-600", desc: "Motor" },
    { id: "gocar" as ServiceType, name: "GoCar", badge: "6RB", color: "bg-[#e0f2f1] text-teal-700", desc: "Mobil" },
    { id: "gofood" as ServiceType, name: "GoFood", badge: "-75%", color: "bg-[#ffebee] text-red-600", desc: "Kuliner" },
    { id: "gosend" as ServiceType, name: "GoSend", badge: "5RB", color: "bg-[#fff3e0] text-amber-700", desc: "Paket" },
    { id: "gomart" as ServiceType, name: "GoMart", badge: "-60%", color: "bg-[#ffebee] text-red-700", desc: "Belanja" },
    { id: "gotagihan" as ServiceType, name: "GoTagihan", badge: null, color: "bg-[#e8eaf6] text-blue-600", desc: "Bayar Tagihan" },
    { id: "gofood_sehat" as ServiceType, name: "GoFood Sehat", badge: "-50%", color: "bg-[#e2f7ef] text-emerald-600", desc: "Menu Sehat" },
    { id: "more" as ServiceType, name: "Lainnya", badge: null, color: "bg-[#f5f5f5] text-gray-600", desc: "Semua Fitur" }
  ];

  return (
    <div id="dashboard_screen_container" className="relative flex flex-col justify-between h-full bg-slate-50 overflow-y-auto rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      
      {/* Top Banner & Search Section */}
      <div className="relative bg-gradient-to-b from-[#00aa13] to-[#009210] rounded-b-[36px] pt-12 pb-24 px-5 shadow-lg">
        {/* Search Bar + Profile */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              id="search_service_input"
              type="text"
              placeholder="‹ Cari layanan, makanan, alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f1f5f9]/90 hover:bg-white focus:bg-white pl-4 pr-4 py-3 rounded-full text-xs outline-none shadow-md text-gray-800 transition-all placeholder-gray-500 font-semibold"
            />
          </div>
          
          <div className="relative">
            <button
              id="btn_dashboard_profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-3 bg-[#00aa13] border border-emerald-400 hover:bg-[#009210] text-white rounded-full transition-all cursor-pointer relative shadow-md flex items-center justify-center w-10 h-10"
            >
              <User className="w-5 h-5 text-white" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-3.5 z-50 border border-gray-100 text-left"
              >
                <div className="px-4 pb-2">
                  <p className="text-[10px] text-gray-400 font-semibold">Masuk sebagai</p>
                  <p className="font-extrabold text-sm text-gray-800 truncate mt-0.5">{username}</p>
                </div>
                <div className="border-t border-gray-100 my-1.5"></div>
                <button
                  id="btn_profile_logout"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" /> Keluar Akun
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Dynamic Marketing Tagline */}
        <div className="mt-6 text-white">
          <h3 className="font-display font-bold text-xl leading-snug">
            Pilihan <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-lg inline-block transform -rotate-1 shadow-sm">Tepat</span> buat <br/>
            semua kebutuhanmu
          </h3>
          <p className="text-[11px] text-emerald-100 mt-1">Layanan cepat, aman & terjangkau setiap saat.</p>
        </div>

        {/* Promo Small Sliders (Resto Jempolan, Mudah Berpergian) */}
        <div className="absolute -bottom-10 left-5 right-5 flex gap-3 overflow-x-auto pb-2 snap-x">
          <div className="flex-1 min-w-[140px] bg-white p-3 rounded-2xl shadow-md flex items-center gap-2 border border-emerald-50 snap-start">
            <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
              🏬
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold text-gray-800">Resto Jempolan</p>
              <p className="text-[9px] text-gray-400">Rasa terjamin</p>
            </div>
          </div>

          <div className="flex-1 min-w-[140px] bg-white p-3 rounded-2xl shadow-md flex items-center gap-2 border border-emerald-50 snap-start">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              🚗
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold text-gray-800">Mudah Berpergian</p>
              <p className="text-[9px] text-gray-400">GoCar nyaman</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-14 pb-6 space-y-6">
        
        {/* Wallet Bar (Gopay & Coins) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-3xl shadow-md border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{formatIDR(gopayBalance)}</p>
              <p className="text-[10px] text-gray-400 font-medium">{coinsBalance} coins gopay</p>
            </div>
          </div>

          {/* Quick wallet actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onTopUp}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="p-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-xl transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-gray-500">Top Up</span>
            </button>
            <button 
              onClick={() => alert("Fitur Pembayaran instan via kode QR.")}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="p-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-xl transition-colors">
                <ArrowUp className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-semibold text-gray-500">Bayar</span>
            </button>
            <button 
              onClick={() => alert("Buka riwayat transaksi GoPay.")}
              className="flex flex-col items-center gap-1 cursor-pointer relative"
            >
              <div className="p-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-xl transition-colors relative">
                <MoreHorizontal className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  7
                </span>
              </div>
              <span className="text-[9px] font-semibold text-gray-500">Lainnya</span>
            </button>
          </div>
        </motion.div>

        {/* Gojek Services Grid */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {services.map((svc) => (
            <motion.button
              id={`btn_service_${svc.id}`}
              key={svc.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (svc.id === "more") {
                  alert("Menampilkan semua 20+ layanan super app Gojek!");
                } else {
                  onSelectService(svc.id);
                }
              }}
              className="flex flex-col items-center relative group cursor-pointer"
            >
              {/* Promo Badge on icon */}
              {svc.badge && (
                <span className={`absolute -top-2 left-1 z-10 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full text-white shadow-sm ${
                  svc.badge.includes("-") ? "bg-red-500" : "bg-orange-500"
                }`}>
                  {svc.badge}
                </span>
              )}

              {/* Service Icon Representational Graphics */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 transition-all group-hover:shadow ${svc.color}`}>
                {svc.id === "goride" && (
                  <span className="text-xl">🛵</span>
                )}
                {svc.id === "gocar" && (
                  <span className="text-xl">🚗</span>
                )}
                {svc.id === "gofood" && (
                  <span className="text-xl">🍔</span>
                )}
                {svc.id === "gosend" && (
                  <span className="text-xl">📦</span>
                )}
                {svc.id === "gomart" && (
                  <span className="text-xl">🛒</span>
                )}
                {svc.id === "gotagihan" && (
                  <span className="text-xl">⚡</span>
                )}
                {svc.id === "gofood_sehat" && (
                  <span className="text-xl">🥗</span>
                )}
                {svc.id === "more" && (
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                )}
              </div>

              <span className="text-[10px] font-bold text-gray-700 mt-2 text-center truncate w-full">
                {svc.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Promo Voucher Banner */}
        <motion.div
          id="btn_voucher_banner"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => alert("Voucher hemat langganan diaktifkan!")}
          className="bg-gojek hover:bg-gojek-hover p-3.5 rounded-2xl flex items-center justify-between text-white shadow-md cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Ticket className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-bold">Diskon s.d. 10rb/transaksi. Yuk, langganan</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white" />
        </motion.div>

        {/* "Lebih cepat buat book lagi" (Faster to book again) */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-800">Lebih cepat buat book lagi</h4>
          
          <motion.div
            id="btn_quick_book_card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectService("goride")}
            className="bg-white p-4 rounded-3xl shadow-sm hover:shadow border border-gray-100 flex items-center justify-between cursor-pointer"
          >
            <div className="space-y-1.5 flex-1 pr-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wide text-gojek bg-emerald-50 px-2 py-0.5 rounded-full">
                  goride
                </span>
                <span className="text-[10px] text-gray-400">Terakhir dicari</span>
              </div>
              <h5 className="text-xs font-bold text-gray-800 leading-snug">
                Ke Kampus IT-PLN Duri kosambi - Cengkareng
              </h5>
              <p className="text-[10px] text-gray-400">Biasanya ke sini sore hari</p>
            </div>

            {/* Micro Scooter Graphics */}
            <div className="relative w-20 h-20 bg-emerald-50/50 rounded-2xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-14 h-14">
                <circle cx="30" cy="70" r="8" fill="#1f2937" />
                <circle cx="70" cy="70" r="8" fill="#1f2937" />
                <path d="M 30 70 L 50 70 L 58 55 L 70 70" stroke="#00aa13" strokeWidth="6" fill="none" />
                <circle cx="50" cy="30" r="6" fill="#10b981" />
                <path d="M 45 40 Q 45 50, 55 50" stroke="#00aa13" strokeWidth="4" />
              </svg>
              {/* Dot decoration */}
              <div className="absolute top-2 right-2 grid grid-cols-3 gap-0.5 opacity-40">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Sticky Tab Navigation Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 py-3.5 px-6 flex justify-between items-center rounded-b-[40px] z-40">
        <button 
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className="flex flex-col items-center gap-1.5 text-gojek font-semibold cursor-pointer"
        >
          <div className="p-1 rounded-full bg-emerald-50">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px]">Beranda</span>
        </button>

        <button 
          onClick={() => alert("Halaman Promo spesial Gojek diskon s.d. 90%!")}
          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <Ticket className="w-5 h-5" />
          <span className="text-[10px]">Promo</span>
        </button>

        <button 
          onClick={() => alert("Daftar pesanan aktif dan riwayat aktivitas perjalanan.")}
          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px]">Aktivitas</span>
        </button>

        <button 
          onClick={() => onSelectService("goride")}
          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Chat</span>
        </button>
      </div>

    </div>
  );
}
