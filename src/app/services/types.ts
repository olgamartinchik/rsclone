import {
    WorkoutType,
    IntensityType,
    Goal,
    Gender,
    WorkoutsProgramDuration,
    WorkoutsNumber,
    BadgeName,
} from './constants';

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
    completed: boolean;
    _id?: string;
};

export type TStrategies = {
    weight: Array<IntensityType | WorkoutType>;
    toned: Array<IntensityType | WorkoutType>;
    relax: Array<IntensityType | WorkoutType>;
    muscle: Array<IntensityType | WorkoutType>;
};

export type TSettings = {
    userId: string;
    birthday: string;
    startDate: string;
    goal: Goal;
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    desiredWeight: number;
    duration: WorkoutsProgramDuration;
    workoutsNumber: WorkoutsNumber;
    favWorkouts: Array<WorkoutType>;
    caloriesBurned: number;
    badges: Array<BadgeName>;
    heightUnit: string;
    weightUnit: string;
    completedWorkouts: number;
    liked: Array<string>;
};

export type TConvertedValues = {
    weight: number;
    height: number;
    desiredWeight: number;
}

export type TWorkoutProgram = Array<TWorkout[]>;

export interface IWorkoutManager {
    getProgram: (data: TSettings) => Promise<TWorkoutProgram>;
}

export type TLoginForm = {
    userName: string;
    email: string;
    password?: string;
};

export type TLoginResponse = {
    token: string;
    userId: string;
    userName: string;
    email: string;
};

export type TToken = {
    userName?: string;
    userID: string;
    jwtToken: string;
    avatar?: string | null;
};

export type RouteOption = {
    path: RegExp;
    callback: () => void;
    isAuth: boolean | null;
};

export interface IDataExplore {
    recipe: {
        image?: string;
        dishType?: string;
        mealType?: object;
        label?: string;
        calories?: string | number;
        yield?: number;
        diet?: string;
        dietLabels?: string;
    };
}

export type StoragesHandler = {
    session: Storage;
    local: Storage;
};

export type TAuthResult = {
    message: string;
    token: string;
    userId: string;
};

export type TBadge = {
    src: string;
    srcActive: string;
    name: string;
    text: string;
    modalId: string;
}

export type TParameter = {
    minValue: number;
    maxValue: number;
    minValueDefault: number;
    maxValueDefault: number;
    coefficient: number;
    unit: string,
    value: string,
}

export type TUser = {
    name: string;
    email: string;
}
