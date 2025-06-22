// File: src/voice/voice_command_handler.ts
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import { handleVoiceCommand } from 'ui/voice_assistant';

export function useVoiceCommand() {
const [isListening, setIsListening] = useState(false);

useEffect(() => {
    Voice.onSpeechResults = (event: { value?: string[] }) => {
    const text = event.value?.[0] || '';
    handleVoiceCommand(text);
    setIsListening(false);
    };

    Voice.onSpeechError = (err: { error: { message: string } }) => {
    console.error('Voice error:', err.error.message);
    setIsListening(false);
    };

    return () => {
    Voice.destroy().then(Voice.removeAllListeners);
    };
}, []);

const startListening = async () => {
    try {
    setIsListening(true);
    await Voice.start('en-US');
    } catch (error) {
    console.error('Voice start error:', error);
    setIsListening(false);
    }
};

return { startListening, isListening };
}
