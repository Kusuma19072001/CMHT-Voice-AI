import React from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  isListening: boolean;
  audioLevel: number;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isListening, audioLevel }) => {
  // Generate bars for the visualizer
  const generateBars = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      // Create a pattern for the bars
      const amplitude = isListening 
        ? Math.sin((i / 30) * Math.PI * 2) * audioLevel * 0.7 + (audioLevel * 0.3)
        : Math.sin((i / 30) * Math.PI) * 0.15 + 0.05;
      
      const height = 5 + amplitude * 30;
      
      return (
        <motion.div
          key={i}
          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-full mx-0.5"
          style={{ width: 3, height: isListening ? height : 5 }}
          animate={{
            height: isListening ? [height * 0.8, height, height * 0.8] : 5,
            opacity: isListening ? 1 : 0.5,
          }}
          transition={{
            duration: 0.4 + (i % 5) * 0.1, // Slightly different timing for each bar
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      );
    });
  };

  return (
    <motion.div
      className="flex items-center justify-center h-10 rounded-full p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {generateBars()}
    </motion.div>
  );
};

export default VoiceVisualizer;