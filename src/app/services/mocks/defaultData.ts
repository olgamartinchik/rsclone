import { Gender, Goal, WorkoutsNumber, WorkoutsProgramDuration, WorkoutType } from '../constants';

const userSettings = {
    userId: '61f193ab5d19a2c71b9ee570',
    // startDate: Date.now().toString(),
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
