export default function workoutDesc(desc: string, equipment: string): string {
    return `
    <div class="workout-description">
        <p class="workout-text">${desc}</p>
        <p class="workout-text"><span class="workout-text-type">Equipment</span>${equipment}</p>
    </div>
    `;
}
