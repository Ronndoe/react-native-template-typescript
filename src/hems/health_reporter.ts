// Summary reporting system
import { getActivityLog } from "./activity_logger";
import { getSleepLog } from "./sleep_tracker";

export function getHealthReport() {
    return {
        activity: getActivityLog(),
        sleep: getSleepLog()
    };
}
