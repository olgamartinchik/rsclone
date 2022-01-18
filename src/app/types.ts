export enum Goal {
    weight = 'weight',
    toned = 'toned',
    relax = 'relax',
    muscle = 'muscle',
}

export enum WorkoutType {
    dance = 'dance',
    boxing = 'boxing',
    meditation = 'meditation',
    strength = 'strength',
    cardio = 'cardio',
    HIIT = 'HIIT',
    pilates = 'pilates',
    stretch = 'stretch',
    yoga = 'yoga',
}

export enum WorkoutsProgramDuration {
    short = 4,
    medium = 8,
    long = 10,
}

export enum WorkoutsNumber {
    small = 2,
    medium = 3,
    large = 4,
    huge = 5,
}

export enum IntensityType {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export enum Gender {
    male = 'male',
    female = 'female',
}

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
