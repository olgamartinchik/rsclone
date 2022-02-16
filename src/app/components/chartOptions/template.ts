export default function chartOptions(value: number, type: string, title: string, imgPath: string): string {
    return `
        <div class="options-icon icon">
            <img src="./assets/img/${imgPath}" alt="weekly statistic">
            <h6 class="options-title title">${title}</h6>
        </div>
        <div class="options-value">
            <span class="options-value-title">This week</span>
            <span class="options-value-num">${value} ${type}</span>
        </div>
    `;
}