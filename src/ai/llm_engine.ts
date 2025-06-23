// File: src/ai/llm_engine.ts
// uses buildPersonalityPrompt() to generate dynamic context.
// Appends user's query to that for a smart, memory-aware prompt.
// Note: `fetch` is globally available in React Native and does not need to be imported

import { buildPersonalityPrompt } from './personality_context';

export async function callLLM({ prompt, engine }: { prompt: string; engine: 'gpt' | 'gemini' }): Promise<string> {
    const contextualPrompt = await buildPersonalityPrompt(prompt);
    const fullPrompt = `${contextualPrompt}\n\nUser: ${prompt}`;

    const url = engine === 'gpt'
        ? 'https://api.openai.com/v1/chat/completions'
        : 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${engine === 'gpt' ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY}`,
    };

    const body = engine === 'gpt'
        ? JSON.stringify({ model: 'gpt-4o', messages: [{ role: 'user', content: fullPrompt }] })
        : JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] });

    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();

    return engine === 'gpt'
        ? data.choices?.[0]?.message?.content || ''
        : data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}