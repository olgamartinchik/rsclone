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
    weekProgress: TWeekProgress;
    favWorkouts: Array<WorkoutType>;
    caloriesBurned: number;
    badges: string[];
    heightUnit: string;
    weightUnit: string;
    completedWorkouts: number;
    liked: string[];
    progress: TProgress[];
};

export type TConvertedValues = {
    weight: number;
    height: number;
    desiredWeight: number;
};

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
    avatar?: string | undefined;
};

export type TToken = {
    userName?: string;
    userID: string;
    jwtToken: string;
    avatar?: string;
};

export type RouteOption = {
    path: RegExp;
    callback: () => void;
    isAuth: boolean | null;
};
export type TIngredients = {
    image: string;
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
        ingredients?: Array<TIngredients>;
        url?: string;
        ingredientLines?: Array<string>;
        totalTime?: string;
        totalWeight?: string;
        healthLabels?: Array<string>;
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
};

export type TParameter = {
    minValue: number;
    maxValue: number;
    minValueDefault: number;
    maxValueDefault: number;
    coefficient: number;
    unit: string;
    value: string;
};

export type TUser = {
    name: string;
    email: string;
    avatar?: string | undefined;
};

export type TChangeUserDataForm = {
    userName: string;
    email: string;
    avatar: string;
    password: string;
    newPassword: string;
};

export type TWeekProgress = {
    currentWeek: number;
    calories: number;
    workoutsNumber: number;
    workoutsCompleted: number;
    minutes: number;
};

export type TStatData = {
    calories: number;
    time: number;
};

export type TProgressData = {
    [index: string]: number;
};

export type TProgress = {
    minutes: TProgressData[];
    calories: TProgressData[];
    workoutsCompleted: number;
};

export type TFilter = {
    [key: string]: string[];
};
