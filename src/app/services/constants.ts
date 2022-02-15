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
    valueMissing = 'Please, choose all values',
    invalidWeightValue = 'Please, select desired weight less than actual one',
    desiredWeightmissing = 'Please, choose desired weight',
    invalidName = 'Please enter a valid name starting from letter',
    invalidPassword = 'Password should not be less than 6 symbols',
    invalidValue = 'Please enter a valid value',
}

export enum Height {
    title = 'height',
    units = 'cm',
    units2 = 'ft',
    option1 = 'Feet',
    option2 = 'Centimeters',
    min = '120',
    max = '220',
    min2 = '4',
    max2 = '7',
}

export enum Weight {
    title = 'weight',
    desired = 'desired Weight',
    units = 'kg',
    units2 = 'lbs',
    option1 = 'Pounds',
    option2 = 'Kilograms',
    min = '40',
    max = '200',
    min2 = '88',
    max2 = '440',
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
    toCentimeters = 31,
    toKilograms = 0.45,
    
}

export enum Endpoints {
    userSettings = 'userSettings',
}

export enum ModalContents {
    options = 'checkbox',
}

export enum BadgeSrc {
    oneWorkout = '../../../assets/img/badges/1.png',
    fiveWorkouts = '../../../assets/img/badges/2.png',
    tenWorkouts = '../../../assets/img/badges/3.png',
    twentyWorkouts = '../../../assets/img/badges/4.png',
    fiftyWorkouts = '../../../assets/img/badges/5.png',
    hundredWorkouts = '../../../assets/img/badges/6.png',
}

export enum BadgeActiveSrc {
    oneWorkout = '../../../assets/img/badges/1_active.png',
    fiveWorkouts = '../../../assets/img/badges/2.png',
    tenWorkouts = '../../../assets/img/badges/3.png',
    twentyWorkouts = '../../../assets/img/badges/4.png',
    fiftyWorkouts = '../../../assets/img/badges/5.png',
    hundredWorkouts = '../../../assets/img/badges/6.png',
}

export enum BadgeName {
    oneWorkout = 'GameOn Badge',
    fiveWorkouts = 'TakeOn Badge',
    tenWorkouts = 'RightOn Badge',
    twentyWorkouts = 'ConquerOn Badge',
    fiftyWorkouts = 'RoarOn Badge',
    hundredWorkouts = 'RockOn Badge',
}

export enum BadgeText {
    oneWorkout = 'Awarded for completing a 1st workout on FitOn.',
    fiveWorkouts = 'Awarded for completing 5 workouts on FitOn.',
    tenWorkouts = 'Awarded for completing 10 workouts on FitOn.',
    twentyWorkouts = 'Awarded for completing 20 workouts on FitOn.',
    fiftyWorkouts = 'Awarded for completing 50 workouts on FitOn.',
    hundredWorkouts = 'Awarded for completing 100 workouts on FitOn.',
}

export enum ClassNames {
    onboarding = 'title title-tablet',
    editProfile = 'settings-link',
}
