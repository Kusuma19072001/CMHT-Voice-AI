import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusTextProps {
  isListening: boolean;
  message: string;
}

const StatusText: React.FC<StatusTextProps> = ({ isListening, message }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center mt-6"
      >
        <p className={`text-lg font-medium ${isListening ? 'text-white' : 'text-gray-300'}`}>
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusText;