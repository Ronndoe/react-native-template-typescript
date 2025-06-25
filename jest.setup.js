// jest.setup.js

// --- Mock SQLite ---
jest.mock('react-native-sqlite-storage', () => {
    let storedData = [];

    return {
        enablePromise: jest.fn(),
        openDatabase: jest.fn(() => ({
            transaction: (cb) => {
                cb({
                    executeSql: (query, params, successCb, errorCb) => {
                        if (query.includes('INSERT')) {
                            try {
                                storedData.push(JSON.parse(params[0]));  // parse if JSON
                            } catch {
                                storedData.push(params[0]);              // store raw string like "summary"
                            }
                            if (successCb) successCb({ rowsAffected: 1 });
                            if (successCb) successCb({ rowsAffected: 1 });
                        } else if (query.includes('SELECT')) {
                            const resultSet = {
                                rows: {
                                    length: storedData.length,
                                    item: (i) => storedData[i],
                                },
                            };
                            if (successCb) successCb(null, resultSet);
                        } else {
                            if (errorCb) errorCb(new Error('Query not handled in mock.'));
                        }
                    },
                });
            },
        })),
    };
});

// --- Mock NetInfo ---
jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
    addEventListener: jest.fn(() => () => { }),
}));

// --- Mock TTS ---
jest.mock('react-native-tts', () => ({
    speak: jest.fn(),
    stop: jest.fn(),
    getInitStatus: jest.fn(() => Promise.resolve()),
}));

// --- Mock Voice ---
jest.mock('@react-native-voice/voice', () => ({
    onSpeechStart: jest.fn(),
    onSpeechResults: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    destroy: jest.fn(),
}));

// --- Mock Crypto-JS ---
jest.mock('crypto-js', () => {
    return {
        AES: {
            encrypt: jest.fn(() => ({ toString: () => 'mocked_encrypted' })),
            decrypt: jest.fn(() => ({
                toString: () => JSON.stringify([
                    { type: 'activity', steps: 100, timestamp: Date.now() }
                ]),
            })),
        },
        enc: {
            Utf8: 'Utf8',
        },
    };
});


// --- Mock getAllMemories globally ---
jest.mock('memory/sqlite', () => ({
    getDB: async () => ({
        executeSql: jest.fn(() =>
            Promise.resolve([
                {
                    rows: {
                        raw: () => [
                            {
                                id: 1,
                                type: 'activity',
                                steps: 5000,
                                timestamp: Date.now() - 3600 * 1000,
                            },
                        ],
                    },
                },
            ])
        ),
    }),
    getAllMemories: jest.fn(() =>
        Promise.resolve([
            {
                id: 1,
                type: 'vitals',
                content: { heartRate: 70, sleepQuality: 8 },
                timestamp: new Date().toISOString(),
            },
        ])
    ),
}));
