import workoutManager from './app/services/workoutManager';
import { userSettings } from './app/services/defaultData';

console.log(workoutManager.getProgram(userSettings));
