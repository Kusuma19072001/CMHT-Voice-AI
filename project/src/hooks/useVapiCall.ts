import { useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

interface UseVapiCallReturn {
  isCallActive: boolean;
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
}

export const useVapiCall = (): UseVapiCallReturn => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [vapi, setVapi] = useState<any>(null);

  const startCall = useCallback(async () => {
    try {
      const vapiInstance = new Vapi('3a223e31-5540-4589-b9d0-6e47267d8273');
      await vapiInstance.start('45059efa-53d6-45d4-ac08-86393fc58abd');
      
      vapiInstance.on('call-end', () => {
        setIsCallActive(false);
        setVapi(null);
      });

      setVapi(vapiInstance);
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start Vapi call:', error);
      setIsCallActive(false);
    }
  }, []);

  const endCall = useCallback(async () => {
    try {
      if (vapi) {
        await vapi.stop();
        setVapi(null);
      }
      setIsCallActive(false);
    } catch (error) {
      console.error('Failed to end Vapi call:', error);
    }
  }, [vapi]);

  return {
    isCallActive,
    startCall,
    endCall
  };
}; 