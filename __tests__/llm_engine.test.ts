// File: src/__tests__/llm_engine.test.ts
import { callLLM } from 'ai/llm_engine';

jest.mock('react-native', () => ({
    fetch: jest.fn(),
}));

describe('LLM Engine', () => {
    it('calls GPT endpoint and returns string', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    choices: [{ message: { content: 'Hello from GPT' } }],
                }),
            }),
        ) as any;

        const result = await callLLM({ prompt: 'Hello?', engine: 'gpt' });
        expect(result).toContain('Hello from GPT');
    });

    it('calls Gemini endpoint and returns string', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    candidates: [{ content: { parts: [{ text: 'Hello from Gemini' }] } }],
                }),
            }),
        ) as any;

        const result = await callLLM({ prompt: 'Hi Gemini', engine: 'gemini' });
        expect(result).toContain('Hello from Gemini');
    });
});
