export enum Goal {
    weight = 'weight',
    toned = 'toned',
    relax = 'relax',
    muscle = 'muscle',
}

export enum GoalTitles {
    weight = 'Lose weight',
    toned = 'Stay toned',
    relax = 'Reduce stress',
    muscle = 'Build muscle',
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

export enum MinWorkoutLength {
    small = 5,
    medium = 15,
    large = 25,
    huge = 30,
}

export enum MaxWorkoutLength {
    small = 10,
    medium = 20,
    large = 30,
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

export enum Id {
    menu = 'nav-mobile',
    mobileMenu = 'mobile-demo',
}

export enum Message {
    registerSuccess = 'User created',
    valueMissing = 'Please, choose a value',
    invalidWeightValue = 'Please, select desired weight less than actual one',
}

export enum Height {
    title = 'height',
    units = 'cm',
    units2 = 'ft & in',
    option1 = 'Feet & Inches',
    option2 = 'Centimeters',
    min = '120',
    max = '220',
}

export enum Weight {
    title = 'weight',
    desired = 'desired Weight',
    units = 'kg',
    units2 = 'pounds',
    option1 = 'Pounds',
    option2 = 'Kilograms',
    min = '40',
    max = '200',
}

export enum Colors {
    primary = '#ff8a80',
    secondary = '#c2bebe',
    textOnLight = '#666',
}

export enum Coefficients {
    percent = 100,
    toFeet = 0.032808398950131,
    toPounds = 2.20462262185,
}

export enum Endpoints {
    userSettings = 'userSettings',
}

export enum ModalContents {
    options = 'checkbox',
}
