import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThumbsUp, ThumbsDown, Star, X } from "lucide-react";

interface RatingReviewModalsProps {
  isOpen: boolean;
  driverName: string;
  onClose: () => void;
  onSubmitRating: (appRating: number, driverLike: "up" | "down" | null, feedback: string) => void;
}

export default function RatingReviewModals({
  isOpen,
  driverName,
  onClose,
  onSubmitRating
}: RatingReviewModalsProps) {
  const [step, setStep] = useState<1 | 2>(1); // Step 1: App Rating, Step 2: Driver Feedback
  const [stars, setStars] = useState(3);
  const [driverLike, setDriverLike] = useState<"up" | "down" | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = () => {
    onSubmitRating(stars, driverLike, feedback);
    // Reset state
    setStep(1);
    setStars(3);
    setDriverLike(null);
    setFeedback("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="rating_modal_backdrop" className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-6">
        
        {step === 1 ? (
          /* Step 1: Rate Our App */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-center border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="w-6"></span> {/* spacer */}
              <h3 className="font-display font-bold text-lg text-gray-800">Rate Our App!</h3>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Help us improve our tool to best suit your needs by rating us here!
            </p>

            {/* 5-Star Selection */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <button
                  id={`btn_star_${starNum}`}
                  key={starNum}
                  onClick={() => setStars(starNum)}
                  className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      starNum <= stars 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-gray-300"
                    }`} 
                  />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                id="btn_cancel_rating"
                onClick={onClose}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-3 rounded-xl text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                id="btn_submit_rating_app"
                onClick={handleNext}
                className="flex-1 bg-gojek hover:bg-gojek-hover text-white font-bold py-3 rounded-xl text-xs cursor-pointer transition-colors shadow-md shadow-emerald-200"
              >
                Next
              </button>
            </div>
          </motion.div>
        ) : (
          /* Step 2: Share Driver Feedback */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-center border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <span className="w-6"></span>
              <h3 className="font-display font-bold text-lg text-gray-800">Share your feedback</h3>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              How was working with <span className="font-bold text-gray-700">{driverName}</span> today?
            </p>

            {/* Thumbs Up / Down option toggle */}
            <div className="flex justify-center gap-6 py-2">
              {/* Thumbs Up */}
              <button
                id="btn_like_driver"
                onClick={() => setDriverLike("up")}
                className={`p-3 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                  driverLike === "up"
                    ? "bg-emerald-50 border-emerald-400 text-emerald-600 scale-105"
                    : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                <ThumbsUp className="w-6 h-6" />
              </button>

              {/* Thumbs Down */}
              <button
                id="btn_dislike_driver"
                onClick={() => setDriverLike("down")}
                className={`p-3 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                  driverLike === "down"
                    ? "bg-red-50 border-red-400 text-red-600 scale-105"
                    : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                <ThumbsDown className="w-6 h-6" />
              </button>
            </div>

            {/* Textarea Feedback */}
            <div className="text-left space-y-1">
              <label className="text-[10px] text-gray-400 font-bold uppercase block">Can you tell us more?</label>
              <textarea
                id="textarea_driver_feedback"
                placeholder="Tulis kritik, saran atau ulasan tambahan Anda di sini..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white p-3 rounded-xl border border-gray-200 focus:border-gojek outline-none text-xs text-gray-800 transition-all resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                id="btn_back_to_rating"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-3 rounded-xl text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                id="btn_submit_feedback_final"
                onClick={handleSubmit}
                className="flex-1 bg-gojek hover:bg-gojek-hover text-white font-bold py-3 rounded-xl text-xs cursor-pointer transition-colors shadow-md shadow-emerald-200"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </AnimatePresence>
  );
}
