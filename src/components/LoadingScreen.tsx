import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-16 h-16 animate-spin text-white mx-auto" />
        <p className="text-white text-xl">جاري تحميل الأسئلة...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;