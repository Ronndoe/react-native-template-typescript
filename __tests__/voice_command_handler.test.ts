// File: __tests__/voice_assistant.test.ts
import { handleVoiceCommand, getVoiceCommandResponse } from 'ui/voice_assistant';
import Tts from 'react-native-tts';

jest.mock('react-native-tts', () => ({
    speak: jest.fn(),
}));

describe('Voice Assistant', () => {
    test('responds with sleep summary', async () => {
        const response = await getVoiceCommandResponse('how did I sleep last night?');
        expect(response).toMatch(/sleep/i);
    });

    test('handles voice commands for vitals', async () => {
        await handleVoiceCommand('what is my heart rate?');
        expect(Tts.speak).toHaveBeenCalled();
        const spokenText = (Tts.speak as jest.Mock).mock.calls[0][0];
        expect(spokenText).toContain('heart rate');
    });
});
