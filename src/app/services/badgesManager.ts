import Popup from '../components/popup/popup';
import ClientManager from './clientManager';
import { BadgeName, BadgeActiveSrc, BadgeText } from './constants';
import storageManager from './storageManager';
import { TSettings, TToken } from './types';

class BadgesManager {
    private popup: Popup;

    private client: ClientManager;

    constructor() {
        this.popup = new Popup();
        this.client = new ClientManager();
    }

    public async checkBadge(settings: TSettings) {
        const workoutsCompleted = settings.progress.reduce((prev, next) => prev + next.workoutsCompleted, 0);

        switch (workoutsCompleted) {
            case 1: {
                this.popup.createPopup(BadgeActiveSrc.oneWorkout, BadgeName.oneWorkout, BadgeText.oneWorkout);
                settings.badges.push(BadgeName.oneWorkout);
                break;
            }
            case 5: {
                this.popup.createPopup(BadgeActiveSrc.fiveWorkouts, BadgeName.fiveWorkouts, BadgeText.fiveWorkouts);
                settings.badges.push(BadgeName.fiveWorkouts);
                break;
            }
            case 10: {
                this.popup.createPopup(BadgeActiveSrc.tenWorkouts, BadgeName.tenWorkouts, BadgeText.tenWorkouts);
                settings.badges.push(BadgeName.tenWorkouts);
                break;
            }
            case 20: {
                this.popup.createPopup(
                    BadgeActiveSrc.twentyWorkouts,
                    BadgeName.twentyWorkouts,
                    BadgeText.twentyWorkouts
                );
                settings.badges.push(BadgeName.twentyWorkouts);
                break;
            }
            case 50: {
                this.popup.createPopup(BadgeActiveSrc.fiftyWorkouts, BadgeName.fiftyWorkouts, BadgeText.fiftyWorkouts);
                settings.badges.push(BadgeName.fiftyWorkouts);
                break;
            }
            case 100: {
                this.popup.createPopup(
                    BadgeActiveSrc.hundredWorkouts,
                    BadgeName.hundredWorkouts,
                    BadgeText.hundredWorkouts
                );
                settings.badges.push(BadgeName.hundredWorkouts);
                break;
            }
        }

        await this.saveSettings(settings);
    }

    private async saveSettings(settings: TSettings): Promise<void> {
        storageManager.addItem('userSettings', settings, 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');
        if (userData) {
            await this.client.changeData('userSettings', 'PATCH', userData.userID, settings);
        }
    }
}

export default BadgesManager;
