import { queryMemory } from '../src/memory/query_engine';

test('queryMemory returns entries based on keyword', async () => {
    const result = await queryMemory('heart rate');
    expect(result).toBeInstanceOf(Array);
});