import { WorkoutType, IntensityType, Goal, Gender, WorkoutsProgramDuration, WorkoutsNumber } from './constants';

export type TWorkout = {
    title: string;
    description: string;
    equipment: string;
    type: WorkoutType;
    intensity: IntensityType;
    duration: number;
    caloriesPerMinute: number;
    link: string;
    img: string;
};

export type TStrategies = {
    weight: Array<IntensityType | WorkoutType>;
    toned: Array<IntensityType | WorkoutType>;
    relax: Array<IntensityType | WorkoutType>;
    muscle: Array<IntensityType | WorkoutType>;
};

export type TSettings = {
    goal: Goal;
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    desiredWeight: number;
    duration: WorkoutsProgramDuration;
    workoutsNumber: WorkoutsNumber;
    workoutLength: { min: number; max: number };
    favWorkouts: Array<WorkoutType>;
};

export type TWorkoutProgram = Array<TWorkout[]>;

export interface IWorkoutManager {
    getProgram: (data: TSettings) => TWorkoutProgram;
}

export type TLoginForm = {
    userName: string;
    email: string;
    password: string;
};

export type TToken = {
    userID: string;
    jwtToken: string;
};
export type RouteOption = {
    path: RegExp;
    callback: () => void;
};