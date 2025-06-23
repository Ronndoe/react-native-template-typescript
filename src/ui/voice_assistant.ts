// File: src/ui/voice_assistant.ts
// Allow the user to ask things like “How did I sleep this week?” or “Did I walk more today?”

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { getRecentMemories } from 'memory/query_engine';
import { summarizeMemories } from 'ai/summarizer';
import { MemoryEntry } from 'memory/types';

type SpeechResultsEvent = {
    value?: string[];
};

/**
 * Pure function to return a spoken response from a voice command
 */
export async function getVoiceCommandResponse(text: string): Promise<string> {
    const recent: MemoryEntry[] = await getRecentMemories(50);

    if (/how.*sleep/i.test(text)) {
        return await summarizeMemories(
            recent.filter(m => m.type === 'vitals'),
            'sleep'
        );
    } else if (/steps|activity/i.test(text)) {
        return await summarizeMemories(
            recent.filter(m => m.type === 'activity'),
            'activity'
        );
    } else {
        return "Sorry, I didn't understand your request.";
    }
}

/**
 * Handler to process a voice command and speak it aloud
 */
export async function handleVoiceCommand(text: string) {
    const reply = await getVoiceCommandResponse(text);
    Tts.speak(reply);
}

/**
 * Registers voice recognition result handling.
 * Voice.start() should be called externally (e.g. from a button or hook).
 */
export function setupVoiceAssistant() {
    Voice.onSpeechResults = async (event: SpeechResultsEvent) => {
        const text = event.value?.[0] || '';
        await handleVoiceCommand(text);
    };

    Voice.onSpeechError = (err: any) => {
        console.warn('Voice recognition error:', err);
        Tts.speak("Sorry, I had trouble understanding you.");
    };
}
