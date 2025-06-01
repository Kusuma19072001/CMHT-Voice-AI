import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ isListening, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
        isListening 
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
          : 'bg-white text-gray-800 shadow-lg shadow-purple-500/30'
      } focus:outline-none transition-colors duration-300`}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isListening ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 1.5,
        repeat: isListening ? Infinity : 0,
        repeatType: "reverse",
      }}
    >
      <span className="sr-only">{isListening ? 'Stop listening' : 'Start listening'}</span>
      
      {/* Pulsating ring */}
      {isListening && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-red-500"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}
      
      {isListening ? (
        <MicOff size={24} className="relative z-10" />
      ) : (
        <Mic size={24} className="relative z-10" />
      )}
    </motion.button>
  );
};

export default MicButton;