import Chart from 'chart.js/auto';

class ChartsManager {
    private chartMinutes: Chart | null;

    private chartCalories: Chart | null;

    constructor() {
        this.chartMinutes = null;
        this.chartCalories = null;
    }

    public resetCharts(): void {
        this.chartCalories = null;
        this.chartMinutes = null;
    }

    public createChart(element: HTMLCanvasElement, labels: string[], data: number[]): void {
        const ctx = element.getContext('2d');
        if (ctx) {
            this.chartMinutes = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            barThickness: 24,
                            borderRadius: 4,
                            backgroundColor: ['rgb(95, 75, 222)'],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    aspectRatio: 1.5,

                    plugins: {
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                    scales: {
                        yAxes: {
                            ticks: {
                                precision: 0,
                            },
                        },
                        xAxes: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            });
        }
    }
}

export default new ChartsManager();
