import { TSettings, ISetting } from '../../services/types';
import StorageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import { TToken } from '../../services/types';
import {
    Goal,
    Gender,
    WorkoutsProgramDuration,
    WorkoutsNumber,
    WorkoutType,
    Endpoints,
} from '../../services/constants';

export default class OnboardingModel {
    form: TSettings;

    constructor() {
        this.form = {
            userId: '',
            goal: Goal.weight,
            weight: 60,
            height: 160,
            age: 30,
            gender: Gender.female,
            desiredWeight: 60,
            duration: WorkoutsProgramDuration.medium,
            workoutsNumber: WorkoutsNumber.medium,
            workoutLength: { min: 10, max: 30 },
            favWorkouts: [WorkoutType.HIIT, WorkoutType.boxing],
        };
    }

    public changeHandler(...args: Array<ISetting>) {
        const setting = Array.from(args)[0];
        this.form.userId = (StorageManager.getItem('token', 'local') as TToken).userID;
        if (setting.gender) this.form.gender = setting.gender;
        if (setting.age) {
            const age = this.calculateAge(setting.age);
            this.form.age = age;
        }
        if (setting.height) this.form.height = setting.height;
        if (setting.weight) this.form.weight = setting.weight;
        if (setting.goal) this.form.goal = setting.goal;
        if (setting.desiredWeight) this.form.desiredWeight = setting.desiredWeight;
        if (setting.workoutsNumber) this.form.workoutsNumber = +setting.workoutsNumber;
        if (setting.favWorkouts) this.form.favWorkouts = setting.favWorkouts;
        if (setting.workoutLength) this.form.workoutLength = setting.workoutLength;
        if (setting.duration) this.form.duration = setting.duration;
    }

    public goalsHandler() {
        const clientManager = new ClientManager();
        clientManager.postData(Endpoints.userSettings, this.form);
    }

    private calculateAge(dateOfBirth: string): number {
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        const dayofBirth = +dateOfBirth.split(' ')[1].split('').splice(0, 2).join('');
        const month = dateOfBirth.split(' ')[0];
        const monthOfBirth = this.getMonth(month);
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

    private getMonth(month: string): number {
        let targetMonth = 0;
        switch (month) {
            case 'Jan':
                targetMonth = 0;
                break;
            case 'Feb':
                targetMonth = 1;
                break;
            case 'Mar':
                targetMonth = 2;
                break;
            case 'Apr':
                targetMonth = 3;
                break;
            case 'May':
                targetMonth = 4;
                break;
            case 'Jun':
                targetMonth = 5;
                break;
            case 'Jul':
                targetMonth = 6;
                break;
            case 'Aug':
                targetMonth = 7;
                break;
            case 'Sep':
                targetMonth = 8;
                break;
            case 'Oct':
                targetMonth = 9;
                break;
            case 'Nov':
                targetMonth = 10;
                break;
            case 'Dec':
                targetMonth = 11;
                break;
        }
        return targetMonth;
    }

    public get programDuration(): number {
        return this.form.duration;
    }
}
