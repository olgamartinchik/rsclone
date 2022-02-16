import StorageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import Utils from '../../services/utils';
import { TToken, TConvertedValues, TSettings, TUser } from '../../services/types';
import {
    Goal,
    Gender,
    WorkoutsProgramDuration,
    WorkoutsNumber,
    Endpoints,
    Height,
    Weight,
} from '../../services/constants';
import UserDataManager from '../../services/userDataManager';
import storageManager from '../../services/storageManager';

export class OnboardingModel {
    private form: TSettings;

    private converted: TConvertedValues;

    constructor() {
        this.form = {
            userId: '',
            birthday: '',
            startDate: Date.now().toString(),
            goal: Goal.muscle,
            weight: 0,
            height: 0,
            age: 0,
            gender: Gender.female,
            desiredWeight: 0,
            duration: WorkoutsProgramDuration.short,
            workoutsNumber: WorkoutsNumber.small,
            favWorkouts: [],
            weekProgress: {
                currentWeek: 0,
                calories: 0,
                workoutsNumber: WorkoutsNumber.small,
                workoutsCompleted: 0,
                minutes: 0,
            },
            caloriesBurned: 0,
            badges: [],
            heightUnit: Height.units,
            weightUnit: Weight.units,
            completedWorkouts: 0,
            liked: [],
            progress: [
                {
                    minutes: [],
                    calories: [],
                },
            ],
        };
        this.converted = {
            height: 0,
            weight: 0,
            desiredWeight: 0,
        };
    }

    public getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }

    public changeHandler(...args: Array<Partial<TSettings>>) {
        const setting = Array.from(args)[0];
        this.form.userId = (<TToken>StorageManager.getItem('token', 'local')).userID;
        if (setting.gender) this.form.gender = setting.gender;
        if (setting.age) this.form.age = setting.age;
        if (setting.height) this.form.height = setting.height;
        if (setting.weight) this.form.weight = setting.weight;
        if (setting.goal) this.form.goal = setting.goal;
        if (setting.desiredWeight || setting.desiredWeight === 0) this.form.desiredWeight = setting.desiredWeight;
        if (setting.desiredWeight) this.form.desiredWeight = setting.desiredWeight;
        if (setting.workoutsNumber) {
            this.form.workoutsNumber = +setting.workoutsNumber;
            this.form.weekProgress.workoutsNumber = +setting.workoutsNumber;
        }
        if (setting.favWorkouts) this.form.favWorkouts = setting.favWorkouts;
        if (setting.duration) this.form.duration = +setting.duration;
        if (setting.heightUnit) this.form.heightUnit = setting.heightUnit;
        if (setting.weightUnit) this.form.weightUnit = setting.weightUnit;
    }

    public saveConvertedValues(...args: Array<Partial<TConvertedValues>>): void {
        const convertedValues = Array.from(args)[0];
        if (convertedValues.height) this.converted.height = convertedValues.height;
        if (convertedValues.weight) this.converted.weight = convertedValues.weight;
        if (convertedValues.desiredWeight) this.converted.desiredWeight = convertedValues.desiredWeight;
    }

    public async saveSettings() {
        const clientManager = new ClientManager();
        StorageManager.addItem('userSettings', this.form, 'local');
        clientManager.postData(Endpoints.userSettings, this.form);
        await new UserDataManager(this.form).createUserData();
    }

    public calculateAge(dateOfBirth: string): number {
        this.form.birthday = dateOfBirth;
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        const dayofBirth = +dateOfBirth.split(' ')[1].split('').splice(0, 2).join('');
        const month = dateOfBirth.split(' ')[0];
        const monthOfBirth = Utils.getMonth(month);
        const yearOfBirth = +dateOfBirth.split(' ')[2];

        let age = currentYear - yearOfBirth;
        if (monthOfBirth > currentMonth) {
            age -= 1;
            return age;
        } else if (dayofBirth > currentDay) {
            age -= 1;
        }

        return age;
    }

    public resetData(): void {
        this.form.userId = '';
        this.form.startDate = Date.now().toString();
        this.form.goal = Goal.muscle;
        this.form.weight = 0;
        this.form.height = 0;
        this.form.age = 0;
        this.form.gender = Gender.female;
        this.form.desiredWeight = 0;
        this.form.duration = WorkoutsProgramDuration.short;
        this.form.workoutsNumber = WorkoutsNumber.small;
        this.form.weekProgress.workoutsNumber = WorkoutsNumber.small;
        this.form.favWorkouts = [];
        this.form.caloriesBurned = 0;
        this.form.badges = [];
        this.form.heightUnit = Height.units;
        this.form.weightUnit = Weight.units;
        this.form.completedWorkouts = 0;
        this.form.liked = [];
        this.form.birthday = '';
        this.form.progress = [
            {
                minutes: [],
                calories: [],
            },
        ];
    }

    public get settings(): TSettings {
        return this.form;
    }

    public get convertedValues(): TConvertedValues {
        return this.converted;
    }
}

export default new OnboardingModel();
