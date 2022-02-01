import { TSettings, ISetting } from '../../services/types';
import StorageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import Utils from '../../services/utils';
import { TToken } from '../../services/types';
import { Goal, Gender, WorkoutsProgramDuration, WorkoutsNumber, Endpoints } from '../../services/constants';

export default class OnboardingModel {
    form: TSettings;

    constructor() {
        this.form = {
            userId: '',
            // startDate: Date.now().toString(),
            goal: Goal.muscle,
            weight: 40,
            height: 120,
            age: 0,
            gender: Gender.female,
            desiredWeight: 40,
            duration: WorkoutsProgramDuration.short,
            workoutsNumber: WorkoutsNumber.small,
            workoutLength: { min: 5, max: 10 },
            favWorkouts: [],
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

    public saveSettings() {
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

    public get programDuration(): number {
        return this.form.duration;
    }

    public get favWorkouts(): Array<string> {
        return this.form.favWorkouts;
    }
}
