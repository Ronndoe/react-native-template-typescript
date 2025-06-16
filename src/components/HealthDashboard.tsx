// src/components/HealthDashboard.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getHealthReport } from '../hems/health_reporter';

const HealthDashboard = () => {
  const [report, setReport] = useState<any>(null);

  const refresh = () => {
    const rep = getHealthReport();
    setReport(rep);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Health Monitor</Text>
      <Button title="Refresh Report" onPress={refresh} />
      {report && (
        <View style={{ marginTop: 10 }}>
          <Text>🧠 Activity:</Text>
          {report.activity.map((entry: any, i: number) => (
            <Text key={i}>• {entry.steps} steps in {entry.duration} mins</Text>
          ))}
          <Text>😴 Sleep:</Text>
          {report.sleep.map((entry: any, i: number) => (
            <Text key={i}>• {entry.duration} hrs (Quality: {entry.quality.toFixed(2)})</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default HealthDashboard;
