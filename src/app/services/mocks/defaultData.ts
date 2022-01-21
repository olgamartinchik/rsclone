import { Gender, Goal, WorkoutsNumber, WorkoutsProgramDuration, WorkoutType } from '../constants';

const userSettings = {
    goal: Goal.toned,
    weight: 70,
    height: 175,
    age: 26,
    gender: Gender.female,
    desiredWeight: 65,
    duration: WorkoutsProgramDuration.long,
    workoutsNumber: WorkoutsNumber.huge,
    workoutLength: { min: 10, max: 35 },
    favWorkouts: [WorkoutType.dance],
};

export default userSettings;
