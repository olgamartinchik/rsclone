import { TWeekProgress } from '../../services/types';

export default function statTemplate(progressData: TWeekProgress, startDate: string, isFull: boolean): string {
    const startDateTemplate = `Since ${new Date(Number(startDate)).toDateString()}`;
    return `
                        <div class="summary-block">
                            <div class="summary-block-item">
                                <div class="summary-block-info">
                                    <div class="icon">
                                        <img src="./assets/img/svg/icon-lightning.svg" alt="weekly statistic week number">
                                    </div>
                                    <h4 class="summary-block-title">${progressData.currentWeek + 1} week${
        isFull === false ? ' streak' : ''
    }</h4>
                                    <p class="summary-block-text">${isFull === false ? startDateTemplate : 'Streak'}</p>
                                </div>
                            </div>
                            <div class="summary-block-item">
                                <div class="summary-block-info">
                                    <div class="icon">
                                        <img src="./assets/img/svg/icon-weekly-goal.svg" alt="weekly statistic weekly goal">
                                    </div>
                                    <h4 class="summary-block-title">
                                        ${progressData.workoutsCompleted} / ${progressData.workoutsNumber}${
        isFull === false ? ' workouts' : ''
    }
                                    </h4>
                                    <p class="summary-block-text">${isFull === false ? 'Weekly goal' : 'Workouts'}</p>
                                </div>
                            </div>
                            <div class="summary-block-item">
                                <div class="summary-block-info">
                                    <div class="icon">
                                        <img src="./assets/img/svg/icon-time-alarm.svg" alt="weekly statistic minutes">
                                    </div>
                                    <h4 class="summary-block-title">${progressData.minutes}</h4>
                                    <p class="summary-block-text">Minutes</p>
                                </div>
                            </div>
                            <div class="summary-block-item">
                                <div class="summary-block-info">
                                    <div class="icon">
                                        <img src="./assets/img/svg/icon-cal-fire.svg" alt="weekly statistic caloriess">
                                    </div>
                                    <h4 class="summary-block-title">${progressData.calories}</h4>
                                    <p class="summary-block-text">Calories</p>
                                </div>
                            </div>
                        </div>
    `;
}
