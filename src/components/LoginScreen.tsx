import React, { useState } from "react";
import { motion } from "motion/react";
import { AppScreen } from "../types";
import { User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onNavigate, onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username tidak boleh kosong");
      return;
    }
    if (password.length < 4) {
      setError("Password minimal 4 karakter");
      return;
    }
    setError("");
    // Trigger login success with customized username
    onLoginSuccess(username);
  };

  return (
    <div id="login_screen_container" className="relative flex flex-col justify-between h-full bg-white overflow-y-auto rounded-[40px] shadow-2xl max-w-md mx-auto border-8 border-gray-900 aspect-[9/19]">
      
      {/* Top Graphic Header (Clouds + Driver & Car) */}
      <div className="relative h-48 bg-gradient-to-b from-cyan-400 to-cyan-300 overflow-hidden flex items-end">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate(AppScreen.HOME)}
          className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Decorative clouds */}
        <div className="absolute top-4 left-6 w-24 h-12 bg-white/40 rounded-full blur-sm"></div>
        <div className="absolute top-10 right-4 w-32 h-16 bg-white/30 rounded-full blur-md"></div>
        
        {/* Vector Background landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-emerald-500 rounded-t-[50%] scale-x-125 translate-y-3 z-0"></div>

        {/* Illustrations container */}
        <div className="relative w-full px-6 flex justify-between items-end z-10 -translate-y-1">
          {/* Driver on Scooter */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
            className="w-5/12"
          >
            <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
              {/* Wheels */}
              <circle cx="35" cy="92" r="11" fill="#1f2937" />
              <circle cx="85" cy="92" r="11" fill="#1f2937" />
              <circle cx="35" cy="92" r="5" fill="#ffffff" />
              <circle cx="85" cy="92" r="5" fill="#ffffff" />
              {/* Scooter Body */}
              <path d="M 35 92 L 55 92 L 65 75 L 85 92" stroke="#00aa13" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M 85 92 L 80 65 L 75 55" stroke="#00aa13" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Driver */}
              <circle cx="58" cy="35" r="8" fill="#10b981" /> {/* Helmet */}
              <path d="M 58 35 L 63 35" stroke="#111827" strokeWidth="3" strokeLinecap="round" /> {/* Visor */}
              <path d="M 50 45 C 50 55, 66 55, 66 45" fill="#00aa13" /> {/* Green Jacket */}
              <path d="M 60 48 L 78 55" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Car */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="w-6/12"
          >
            <svg viewBox="0 0 120 100" className="w-28 h-24 drop-shadow-md">
              {/* Car Body */}
              <path d="M 20 80 L 100 80 C 100 80, 110 80, 107 65 C 103 52, 95 52, 90 52 L 30 52 C 25 52, 17 52, 13 65 C 10 80, 20 80, 20 80 Z" fill="#15803d" />
              {/* Cabin */}
              <path d="M 33 52 L 43 32 L 77 32 L 87 52 Z" fill="#1f2937" />
              <path d="M 36 50 L 44 35 L 58 35 L 58 50 Z" fill="#93c5fd" />
              <path d="M 62 50 L 62 35 L 75 35 L 83 50 Z" fill="#93c5fd" />
              {/* Wheels */}
              <circle cx="35" cy="80" r="10" fill="#111827" />
              <circle cx="85" cy="80" r="10" fill="#111827" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Login Form Area */}
      <div className="flex-1 bg-white px-6 pt-6 pb-4 rounded-t-[36px] -mt-6 z-20 shadow-inner">
        <div className="text-center mb-6">
          <h2 className="font-display font-bold text-2xl text-gray-900">Selamat Datang</h2>
          <p className="text-gray-500 text-sm mt-1">silahkan isi data anda sebelum masuk</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="input_username"
              type="text"
              placeholder="Username / No. Telepon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-gojek rounded-2xl outline-none transition-all text-sm text-gray-800"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="input_password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-gojek rounded-2xl outline-none transition-all text-sm text-gray-800"
            />
            <button
              id="btn_toggle_password"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                alert("Simulasi pemulihan kata sandi dikirim ke email/no telepon Anda.");
              }}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              lupa password?
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            id="btn_login_submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-gojek hover:bg-gojek-hover text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors cursor-pointer text-center"
          >
            Masuk
          </motion.button>
        </form>

        {/* Or Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-3 bg-white text-xs text-gray-400 font-medium">or login with</span>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          {/* Google */}
          <button
            id="btn_login_google"
            onClick={() => onLoginSuccess("Pengguna Google")}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3.5 rounded-2xl cursor-pointer transition-colors text-sm font-medium text-gray-700"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>

          {/* Apple */}
          <button
            id="btn_login_apple"
            onClick={() => onLoginSuccess("Pengguna Apple")}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3.5 rounded-2xl cursor-pointer transition-colors text-sm font-medium text-gray-700"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-900">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.74-1.2 1.88-1.05 2.99 1.12.09 2.26-.59 3-1.44z"/>
            </svg>
            Login with Apple
          </button>
        </div>
      </div>

      {/* Footer Area */}
      <div className="py-6 bg-white text-center border-t border-gray-100 z-20">
        <p className="text-xs text-gray-500">
          belum punya akun?{" "}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setUsername("Pengguna Baru");
              setPassword("12345");
              handleSubmit(e);
            }}
            className="text-gojek font-semibold hover:underline"
          >
            daftar disini
          </a>
        </p>
      </div>

    </div>
  );
}
