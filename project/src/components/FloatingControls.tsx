import React from 'react';
import { motion } from 'framer-motion';
import MicButton from './MicButton';
import StatusText from './StatusText';
import VoiceVisualizer from './VoiceVisualizer';
import { Status } from '../hooks/useVoiceAssistant';
import untLogo from '../unt logo.png';

interface FloatingControlsProps {
  isListening: boolean;
  status: Status;
  statusMessage: string;
  audioLevel: number;
  onToggleListening: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  isListening,
  status,
  statusMessage,
  audioLevel,
  onToggleListening
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* UNT Logo */}
      <motion.img
        src={untLogo}
        alt="UNT Logo"
        className="w-48"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="flex flex-col items-center gap-6">
        {/* Visualizer only shows when listening */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VoiceVisualizer isListening={isListening} audioLevel={audioLevel} />
          </motion.div>
        )}
        
        {/* Mic button with container */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glowing background effect */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          )}
          
          <MicButton 
            isListening={isListening} 
            onClick={onToggleListening} 
          />
        </motion.div>
        
        {/* Status text */}
        <StatusText 
          isListening={isListening} 
          message={statusMessage} 
        />
      </div>
    </motion.div>
  );
};

export default FloatingControls;