import { TSettings } from '../types';
import WorkoutManager from '../workoutManager';

test('Should return object ', () => {
    const data = {
        _id: '62093e986df92953eb198b37',
        userId: '62093e736df92953eb198b34',
        startDate: '1644772921567',
        goal: 'relax',
        weight: 55,
        height: 158,
        age: 9,
        gender: 'male',
        desiredWeight: 0,
        duration: 4,
        workoutsNumber: 3,
        favWorkouts: ['YOGA'],
        caloriesBurned: 1,
        badges: ['../../../assets/img/badges/badge1.png', '../../../assets/img/badges/badge2.png'],
        heightUnit: 'cm',
        weightUnit: 'kg',
        completedWorkouts: 6,
        weekProgress: {
            currentWeek: 0,
            calories: 1,
            workoutsCompleted: 6,
            minutes: 6,
            workoutsNumber: 5,
        },
        liked: ['61eafa8a45c5aa76c0d294ac'],
        progress: [
            {
                minutes: [{ '2022-02-18': 6 }],
                calories: [{ '2022-02-18': 0 }],
                workoutsCompleted: 6,
            },
        ],
    } as unknown as TSettings;

    const result = new WorkoutManager().getProgram(data);
    expect(typeof result).toBe('object');
    expect(result).not.toBeFalsy();
});
