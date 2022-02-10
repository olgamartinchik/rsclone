export default function statTemplate(minutes: number = 0, calories: number = 0): string {
        return `<div class="workout-summary">
                <div class="container-stat">
                    <div class="workout-summary-item">
                        <p class="summary-item-title">${minutes}</p>
                        <span class="summary-item-subtitle">minutes</span>
                    </div>
                    <div class="workout-summary-item">
                        <p class="summary-item-title">${calories}</p>
                        <span class="summary-item-subtitle">calories</span>
                    </div>
                </div>
            </div>
        `;
    }