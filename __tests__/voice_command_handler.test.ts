import { handleVoiceCommand } from '../src/voice/voice_command_handler';

test('handles voice commands for vitals', async () => {
    const response = await handleVoiceCommand('what is my heart rate?');
    expect(response).toContain('heart rate');
});