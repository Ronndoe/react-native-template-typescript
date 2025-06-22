// Allow the user to ask things like “How did I sleep this week?” or “Did I walk more today?”
// File: src/ui/voice_assistant.ts
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { getRecentMemories } from 'memory/query_engine';
import { summarizeMemories } from 'ai/summarizer';

export async function handleVoiceCommand(text: string) {
    if (/how.*sleep/i.test(text)) {
        const recent = await getRecentMemories(50);
        const summary = await summarizeMemories(recent.filter(m => m.type === 'vitals'), 'sleep');
        Tts.speak(summary);
    } else if (/steps|activity/i.test(text)) {
        const recent = await getRecentMemories(50);
        const summary = await summarizeMemories(recent.filter(m => m.type === 'activity'), 'activity');
        Tts.speak(summary);
    } else {
        Tts.speak("Sorry, I didn't understand your request.");
    }
}

export function setupVoiceAssistant() {
    Voice.onSpeechResults = (event) => {
        const text = event.value?.[0] || '';
        handleVoiceCommand(text);
    };

    Voice.start('en-US');
}

// --- End voice_assistant.ts ---