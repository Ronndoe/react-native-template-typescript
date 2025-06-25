// __mocks__/react-native-sqlite-storage.js

const mockData = [];

export const openDatabase = () => ({
    transaction: (cb) => {
        cb({
            executeSql: (query, args, successCb, errorCb) => {
                if (query.startsWith('SELECT')) {
                    successCb({}, { rows: { length: mockData.length, item: (i) => mockData[i] } });
                } else if (query.startsWith('INSERT')) {
                    mockData.push(JSON.parse(args[0])); // Simplified
                    successCb({}, { insertId: mockData.length });
                } else if (query.startsWith('DELETE')) {
                    mockData.splice(0, 1); // remove one for testing
                    successCb({}, {});
                } else {
                    successCb({}, {});
                }
            },
        });
    },
});
