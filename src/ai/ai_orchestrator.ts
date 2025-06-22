// File: src/ai/ai_orchestrator.ts
import { buildPersonalityPrompt } from './personality_context';
import { callLLM } from './llm_engine';

export async function getAIResponse(userQuery: string, engine: 'gpt' | 'gemini' = 'gpt') {
    const contextPrompt = await buildPersonalityPrompt(userQuery);
    const finalPrompt = `${contextPrompt}\nUser: ${userQuery}`;

    const response = await callLLM({ prompt: finalPrompt, engine });
    return response;
}
