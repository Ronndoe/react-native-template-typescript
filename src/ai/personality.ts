import { getAllMemories } from 'memory/sqlite';

export async function generateResponse(context: string) {
    const logs = await getAllMemories();
    const activity = logs.filter(m => m.type === 'activity');

    // Simulate response
    if (activity.length > 0 && context.includes('how active')) {
        return `You’ve walked about ${activity[0]?.content?.steps || 0} steps today.`;
    }

    return "I'm still learning. Ask again soon!";
}
