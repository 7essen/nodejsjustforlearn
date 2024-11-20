import React, { useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerificationBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerification = () => {
    setIsChecked(true);
    setTimeout(() => {
      setIsVerified(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">مرحباً بك!</h1>
            <p className="text-white/80 text-lg">يلا نلعب لعبة الميمز المصرية</p>
          </div>

          <label className="flex items-center justify-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleVerification}
              className="w-5 h-5 rounded border-2 border-white/30 checked:bg-green-500 checked:border-green-500 
                         transition-all duration-200 focus:ring-2 focus:ring-green-500/50"
            />
            <span className="text-white text-lg group-hover:text-white/90 transition-colors mr-2">
              أنا جاهز للعب! 🎮
            </span>
          </label>

          {isChecked && !isVerified && (
            <div className="flex items-center justify-center space-x-2 text-yellow-300">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-lg mr-2">جاري التحميل...</span>
            </div>
          )}

          {isVerified && (
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle2 size={24} />
              <span className="text-lg mr-2">يلا بينا! 🚀</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationBox;