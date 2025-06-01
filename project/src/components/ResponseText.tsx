import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponseTextProps {
  text: string;
  isVisible: boolean;
}

const ResponseText: React.FC<ResponseTextProps> = ({ text, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && text && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-lg shadow-lg border border-white/20">
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {text}
            </motion.p>
            
            {/* Typing cursor */}
            {isVisible && (
              <motion.span
                className="inline-block w-2 h-4 bg-blue-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseText;