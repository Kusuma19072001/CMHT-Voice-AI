import React from 'react';
import FloatingControls from './components/FloatingControls';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { useAudioSimulation } from './hooks/useAudioSimulation';
import { useVapiCall } from './hooks/useVapiCall';

function App() {
  const {
    isListening,
    status,
    statusMessage,
    toggleListening
  } = useVoiceAssistant();
  
  const { audioLevel } = useAudioSimulation(isListening);
  const { isCallActive, startCall, endCall } = useVapiCall();

  const handleToggleListening = async () => {
    if (!isListening) {
      // Start both local state and Vapi call
      await startCall();
    } else {
      // End both local state and Vapi call
      await endCall();
    }
    toggleListening();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white bg-black">
      <FloatingControls 
        isListening={isListening}
        status={status}
        statusMessage={statusMessage}
        audioLevel={audioLevel}
        onToggleListening={handleToggleListening}
      />
    </div>
  );
}

export default App;