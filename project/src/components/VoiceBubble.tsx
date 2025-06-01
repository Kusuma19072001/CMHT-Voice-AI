import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VoiceBubbleProps {
  isListening: boolean;
  audioLevel: number;
}

const VoiceBubble: React.FC<VoiceBubbleProps> = ({ isListening, audioLevel }) => {
  const [bubbleSize, setBubbleSize] = useState(320);
  
  useEffect(() => {
    if (isListening) {
      const newSize = 320 + audioLevel * 80;
      setBubbleSize(newSize);
    } else {
      setBubbleSize(320);
    }
  }, [audioLevel, isListening]);

  return (
    <div className="relative">
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-blue-500/30 via-blue-600/30 to-blue-700/30 blur-xl"
        animate={{
          scale: isListening ? [1, 1.05, 1] : 1,
          opacity: isListening ? 0.8 : 0.5,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          width: bubbleSize + 60,
          height: bubbleSize + 60,
          left: -(bubbleSize + 60) / 2,
          top: -(bubbleSize + 60) / 2,
        }}
      />
      
      <motion.div 
        className="relative rounded-full bg-gradient-to-br from-blue-500/80 via-blue-600/80 to-blue-700/80 backdrop-blur-md"
        animate={{
          boxShadow: isListening 
            ? '0 0 60px rgba(59, 130, 246, 0.5)' 
            : '0 0 30px rgba(59, 130, 246, 0.3)',
        }}
        transition={{ duration: 0.5 }}
        style={{
          width: bubbleSize,
          height: bubbleSize,
          left: -bubbleSize / 2,
          top: -bubbleSize / 2,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
        
        <motion.div 
          className="absolute rounded-full bg-white/20"
          animate={{
            scale: isListening ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: bubbleSize * 0.7,
            height: bubbleSize * 0.7,
            left: bubbleSize * 0.15,
            top: bubbleSize * 0.15,
          }}
        />
      </motion.div>
      
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/80"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: isListening ? Math.random() * 0.7 + 0.3 : 0.2,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceBubble;