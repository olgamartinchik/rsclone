import workoutManager from './app/services/workoutManager';
import { userSettings } from './app/services/mocks/defaultData';

console.log(workoutManager.getProgram(userSettings));
