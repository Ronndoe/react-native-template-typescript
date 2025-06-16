# SYNTHEOS Health & Emergency Monitor (HEMS)

This module handles wearable health monitoring and life safety for SYNTHEOS.

## Modules

- `bio_sensor_service.ts`: Streams health readings from device
- `anomaly_detector.py`: Flags abnormal heart rate (uses simple rules)
- `sleep_tracker.ts`: Logs quality and duration of sleep
- `activity_logger.ts`: Logs steps and workout durations
- `emergency_guard.py`: Discloses user info *only during medical crisis*
- `mock_ble_simulator.ts`: Simulates BLE ring data for dev testing

## Emergency Flow

1. Abnormal reading detected by `anomaly_detector.py`
2. `emergency_guard.py` verifies if it's severe (e.g., HR < 40)
3. If yes → data auto-disclosed to health AI or 911 protocol
4. Otherwise → user remains in full control of privacy

## Data Privacy

- All health logs are encrypted locally (not included in this mockup)
- Real device sync should use BLE → Native Bridge

## Future Additions

- Blood oxygen levels
- Fall detection
- Sync with hospital portals
