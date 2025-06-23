import { searchMemories } from '../src/memory/query_engine';

test('searchMemories returns entries based on keyword', async () => {
    const result = await searchMemories('heart rate');
    expect(result).toBeInstanceOf(Array);
});