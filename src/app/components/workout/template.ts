import Card from '../card/card';

export default function workoutHeaderTemplate(card: Card): string {
    return `<div class="workout-header" style="background-image: url('../../assets/trainings/${card.data.img}.jpg')">
                <div class="workout-container">
                    <div class="workout-info">
                        <h1 class="workout-title">${card.data.title}</h1>
                        <div class="workout-types">
                            <span class="workout-type">${(card.data.type).toUpperCase()}</span>
                        </div>
                        <div class="parameters">
                            <span>${Math.round(card.data.duration / 60)} min</span>
                            <span class="separator">|</span>
                            <span class="right-space">Intensity</span>
                            <span class="middle-dot active"></span>
                            <span class="middle-dot ${
                                card.data.intensity === 'medium' || card.data.intensity === 'high' ? 'active' : ''
                            }"></span>
                            <span class="middle-dot ${card.data.intensity === 'high' ? 'active' : ''}"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
}
