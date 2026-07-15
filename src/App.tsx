import React, { useState, useEffect } from "react";
import { AppScreen, ServiceType, BookingDetails, DriverInfo, ChatMessage } from "./types";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import MemesanScreen from "./components/MemesanScreen";
import DalamPerjalananScreen from "./components/DalamPerjalananScreen";
import ChatScreen from "./components/ChatScreen";
import RatingReviewModals from "./components/RatingReviewModals";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DASHBOARD);
  const [username, setUsername] = useState("Intan Ndolu");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Wallet states
  const [gopayBalance, setGopayBalance] = useState(14900);
  const [coinsBalance, setCoinsBalance] = useState(400);

  // Active Booking details
  const [activeBooking, setActiveBooking] = useState<BookingDetails | null>(null);
  const [activeService, setActiveService] = useState<ServiceType>("goride");

  // Driver details (Cameron Williamson)
  const [driver, setDriver] = useState<DriverInfo>({
    name: "Cameron Williamson",
    avatarUrl: "",
    type: "GoRide",
    rating: 4.9,
    vehicle: "B 1234 CW (Yamaha NMax Hijau)",
    phone: "+62 812-3456-7890"
  });

  // Chat message history with driver
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Rating overlay modal toggle
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  // Load session from localStorage if available
  useEffect(() => {
    const savedUser = localStorage.getItem("gojek_user");
    const savedGopay = localStorage.getItem("gojek_gopay");
    if (savedUser) {
      setUsername(savedUser);
      setIsLoggedIn(true);
      setCurrentScreen(AppScreen.DASHBOARD);
    }
    if (savedGopay) {
      setGopayBalance(Number(savedGopay));
    }
  }, []);

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    localStorage.setItem("gojek_user", user);
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const handleLogout = () => {
    setUsername("Pengguna");
    setIsLoggedIn(false);
    localStorage.removeItem("gojek_user");
    setCurrentScreen(AppScreen.HOME);
  };

  const handleTopUp = () => {
    const amount = Number(prompt("Masukkan jumlah Top Up GoPay (Rp):", "50000"));
    if (!isNaN(amount) && amount > 0) {
      const newBal = gopayBalance + amount;
      setGopayBalance(newBal);
      localStorage.setItem("gojek_gopay", String(newBal));
      alert(`Top Up berhasil! Saldo GoPay baru Anda: Rp ${newBal.toLocaleString("id-ID")}`);
    }
  };

  const handleSelectService = (service: ServiceType) => {
    setActiveService(service);
    
    // Set appropriate driver details for the service
    if (service === "gocar") {
      setDriver({
        name: "Cameron Williamson",
        avatarUrl: "",
        type: "GoCar",
        rating: 4.9,
        vehicle: "B 5678 CW (Toyota Avanza Hitam)",
        phone: "+62 812-3456-7890"
      });
    } else {
      setDriver({
        name: "Cameron Williamson",
        avatarUrl: "",
        type: "GoRide",
        rating: 4.9,
        vehicle: "B 1234 CW (Yamaha NMax Hijau)",
        phone: "+62 812-3456-7890"
      });
    }

    setCurrentScreen(AppScreen.BOOKING);
  };

  const handleConfirmOrder = (booking: BookingDetails) => {
    setActiveBooking(booking);
    
    // Deduct balance if paying with Gopay
    if (booking.payment === "Gopay") {
      const nextBal = Math.max(0, gopayBalance - booking.price);
      setGopayBalance(nextBal);
      localStorage.setItem("gojek_gopay", String(nextBal));
    }

    // Initialize chat messages with welcome lines from the driver
    const initialChats: ChatMessage[] = [
      {
        id: "system_init",
        sender: "system",
        text: "Sistem: Driver telah menerima pesanan Anda",
        timestamp: "8:29 pm"
      },
      {
        id: "driver_welcome_1",
        sender: "driver",
        text: "Selamat malam Kak! Saya Cameron Williamson, driver Anda hari ini.",
        timestamp: "8:29 pm"
      },
      {
        id: "driver_welcome_2",
        sender: "driver",
        text: "Saya akan meluncur ke lokasi penjemputan sesuai peta. Mohon ditunggu sebentar ya.",
        timestamp: "8:29 pm"
      }
    ];
    setChatHistory(initialChats);

    // Navigate to live trip progress tracking!
    setCurrentScreen(AppScreen.IN_TRIP);
  };

  const handleSendMessage = (msg: ChatMessage) => {
    setChatHistory((prev) => [...prev, msg]);
  };

  const handleReceiveDriverMessage = (text: string) => {
    const driverMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "driver",
      text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " pm"
    };
    setChatHistory((prev) => [...prev, driverMsg]);
  };

  const handleTripCompleted = () => {
    // Open feedback overlays
    setIsRatingOpen(true);
  };

  const handleSubmitRating = (appRating: number, driverLike: "up" | "down" | null, feedback: string) => {
    setIsRatingOpen(false);
    alert(
      `Terima kasih atas ulasan Anda!\n` +
      `Rating Aplikasi: ${appRating} ★\n` +
      `Feedback Driver: ${driverLike === "up" ? "👍 Bagus" : driverLike === "down" ? "👎 Kurang Bagus" : "Tidak Dinilai"}\n` +
      `Ulasan Tambahan: "${feedback || "Tidak ada"}"`
    );
    
    // Reward coins for rating feedback
    setCoinsBalance((prev) => prev + 100);
    
    // Reset back to Dashboard for endless simulation replay!
    setActiveBooking(null);
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  return (
    <div id="main_app_wrapper" className="min-h-screen bg-slate-100 py-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md relative">
        
        {/* Active Screen State Manager */}
        {currentScreen === AppScreen.HOME && (
          <HomeScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === AppScreen.LOGIN && (
          <LoginScreen 
            onNavigate={setCurrentScreen} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}

        {currentScreen === AppScreen.DASHBOARD && (
          <DashboardScreen
            username={username}
            gopayBalance={gopayBalance}
            coinsBalance={coinsBalance}
            onNavigate={setCurrentScreen}
            onSelectService={handleSelectService}
            onLogout={handleLogout}
            onTopUp={handleTopUp}
          />
        )}

        {currentScreen === AppScreen.BOOKING && (
          <MemesanScreen
            service={activeService}
            gopayBalance={gopayBalance}
            onNavigate={setCurrentScreen}
            onConfirmOrder={handleConfirmOrder}
          />
        )}

        {currentScreen === AppScreen.IN_TRIP && (
          <DalamPerjalananScreen
            booking={activeBooking}
            driver={driver}
            onNavigate={setCurrentScreen}
            onTripCompleted={handleTripCompleted}
          />
        )}

        {currentScreen === AppScreen.CHAT && (
          <ChatScreen
            driver={driver}
            chatHistory={chatHistory}
            onNavigate={setCurrentScreen}
            onSendMessage={handleSendMessage}
            onReceiveDriverMessage={handleReceiveDriverMessage}
          />
        )}

        {/* Floating global mock panel to easily jump to specific states for quick grading/testing */}
        <div id="test_bypass_panel" className="absolute -left-52 top-4 hidden md:flex flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-gray-100 text-left w-48 z-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1">Bypass Panel</p>
          <button 
            id="btn_bypass_home"
            onClick={() => setCurrentScreen(AppScreen.HOME)}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            🏠 1. Home Screen
          </button>
          <button 
            id="btn_bypass_login"
            onClick={() => setCurrentScreen(AppScreen.LOGIN)}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            🔑 2. Login Screen
          </button>
          <button 
            id="btn_bypass_dashboard"
            onClick={() => {
              if (!isLoggedIn) handleLoginSuccess("Pengguna Simulasi");
              setCurrentScreen(AppScreen.DASHBOARD);
            }}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            📱 3. Dashboard
          </button>
          <button 
            id="btn_bypass_booking"
            onClick={() => {
              if (!isLoggedIn) handleLoginSuccess("Pengguna Simulasi");
              handleSelectService("goride");
            }}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            🗺️ 4. Booking (Memesan)
          </button>
          <button 
            id="btn_bypass_trip"
            onClick={() => {
              if (!isLoggedIn) handleLoginSuccess("Pengguna Simulasi");
              handleConfirmOrder({
                pickup: "SMK N 36 Jakarta",
                dropoff: "RS Jakarta, Setiabudi",
                date: "Sekarang",
                payment: "Gopay",
                price: 15400,
                service: "goride"
              });
            }}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            🚗 5. In Trip (Perjalanan)
          </button>
          <button 
            id="btn_bypass_chat"
            onClick={() => {
              if (!isLoggedIn) handleLoginSuccess("Pengguna Simulasi");
              handleConfirmOrder({
                pickup: "SMK N 36 Jakarta",
                dropoff: "RS Jakarta, Setiabudi",
                date: "Sekarang",
                payment: "Gopay",
                price: 15400,
                service: "goride"
              });
              setCurrentScreen(AppScreen.CHAT);
            }}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            💬 6. Chat with Driver
          </button>
          <button 
            id="btn_bypass_rating"
            onClick={() => {
              if (!isLoggedIn) handleLoginSuccess("Pengguna Simulasi");
              setIsRatingOpen(true);
            }}
            className="w-full text-left text-xs hover:bg-gray-100 p-2 rounded-lg font-medium text-gray-700 cursor-pointer"
          >
            ⭐ 7. Rating & Review
          </button>
        </div>

        {/* Rating/Review overlay modal */}
        <RatingReviewModals
          isOpen={isRatingOpen}
          driverName={driver.name}
          onClose={() => setIsRatingOpen(false)}
          onSubmitRating={handleSubmitRating}
        />

      </div>
    </div>
  );
}
