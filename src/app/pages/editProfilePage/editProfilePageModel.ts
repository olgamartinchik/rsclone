import storageManager from '../../services/storageManager';
import Utils from '../../services/utils';
import { TSettings, TUser } from '../../services/types';

class EditProfilePageModel {
    
    
    public getSettingsData(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    public getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }

    public calculateAge(dateOfBirth: string): number {
        // this.form.birthday = dateOfBirth;
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

    public createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }
}

export default EditProfilePageModel;
