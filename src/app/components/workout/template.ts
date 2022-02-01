export default function workoutHeaderTemplate(title: string, intensity: string, duration: number, type: string): string {
     return `<div class="workout-header">
                <div class="workout-container">
                    <div class="workout-info">
                        <h1 class="workout-title">${title}</h1>
                        <div class="workout-types">
                            <span class="workout-type">${type}</span>
                        </div>
                        <div class="parameters">
                            <span>${Math.round(duration / 60)} min</span>
                            <span class="separator">|</span>
                            <span class="right-space">Intensity</span>
                            <span class="middle-dot active"></span>
                            <span class="middle-dot ${intensity === 'medium' || intensity === 'high' ? 'active' : ''}"></span>
                            <span class="middle-dot ${intensity === 'high' ? 'active' : ''}"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
}