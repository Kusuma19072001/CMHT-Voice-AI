import React, { useState, useRef, useEffect } from 'react';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [followup, setFollowup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEmailAlert = async (type: string) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (response.ok) {
        setNotification(`Alert for "${type}" sent!`);
      } else {
        setNotification('Failed to send alert.');
      }
    } catch (error) {
      setNotification('Error sending alert: ' + error);
    }
    setShowDropdown(false);
  };

  // Hide notification after 2 seconds, then show followup
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        setFollowup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Hide followup after 2 seconds
  useEffect(() => {
    if (followup) {
      const timer = setTimeout(() => setFollowup(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [followup]);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen pb-16">
      {/* UNT Logo */}
      <img
        src={untLogo}
        alt="UNT Logo"
        className="w-[600px]"
      />

      <div className="flex flex-col items-center gap-6">
        {/* Visualizer only shows when listening */}
        {isListening && (
          <div>
            <VoiceVisualizer isListening={isListening} audioLevel={audioLevel} />
          </div>
        )}
        
        {/* Mic button with container */}
        <div className="relative">
          <MicButton 
            isListening={isListening} 
            onClick={onToggleListening} 
          />
        </div>
        
        {/* Status text */}
        <StatusText 
          isListening={isListening} 
          message={statusMessage} 
        />

        {/* Laptop Services Dropdown Button */}
        <div className="relative mt-4" ref={dropdownRef}>
          <button
            className="px-6 py-2 bg-green-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-green-800 transition-all duration-200"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            Laptop Services &nbsp;▾
          </button>
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10">
              <button
                className="block w-full text-left px-6 py-2 hover:bg-green-100 text-green-900"
                onClick={() => handleEmailAlert('laptop return')}
              >
                Laptop Return
              </button>
              <button
                className="block w-full text-left px-6 py-2 hover:bg-green-100 text-green-900"
                onClick={() => handleEmailAlert('laptop checkout')}
              >
                Laptop Checkout
              </button>
              <button
                className="block w-full text-left px-6 py-2 hover:bg-green-100 text-green-900"
                onClick={() => handleEmailAlert('other queries')}
              >
                Other Queries
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toasts */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          {notification}
        </div>
      )}
      {followup && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          Our Help Desk member will be there in a few minutes!
        </div>
      )}

      {/* Footer */}
      <footer
        className="fixed bottom-2 left-0 w-full text-center text-gray-400 select-none z-50"
        style={{ fontSize: '0.65rem' }}
      >
        © 2025 CMHT IT HELP DESK SERVICES
      </footer>
    </div>
  );
};

export default FloatingControls;