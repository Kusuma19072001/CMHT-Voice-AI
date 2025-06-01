import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

interface ParticleBackgroundProps {
  isListening: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isListening }) => {
  // Generate random particles
  const generateParticles = useCallback(() => {
    const particles: Particle[] = [];
    const colors = [
      'rgba(139, 92, 246, 0.5)',  // purple
      'rgba(59, 130, 246, 0.5)',  // blue
      'rgba(236, 72, 153, 0.5)',  // pink
      'rgba(255, 255, 255, 0.3)', // white
    ];
    
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
      });
    }
    
    return particles;
  }, []);

  const particles = generateParticles();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: isListening ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
            scale: isListening ? [1, 1.5, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Ambient light gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-50" />
    </div>
  );
};

export default ParticleBackground;