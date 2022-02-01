export default function workoutTemplate() {
     return `<main class="main-page">
            <div class="workout-header">
                <div class="workout-container">
                    <div class="workout-info">
                        <h1 class="workout-title">Toned Arms & Back</h1>
                        <div class="workout-types">
                            <span class="workout-type">HIIT</span>
                        </div>
                        <div class="parameters">
                            <span>10 min</span>
                            <span class="separator">|</span>
                            <span class="right-space">Intensity</span>
                            <span class="middle-dot active"></span>
                            <span class="middle-dot active"></span>
                            <span class="middle-dot"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="workout-details">
                <div class="workout-container">
                    <div class="workout-controls">
                        <button class="workout-fav">
                            <span>favourite</span>
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="waves-effect waves-light btn-large">Start</button>
                    </div>
                </div>
                <div class="workout-container workout-container-sm">
                    <div class="workout-description">
                        <p class="workout-text">Sculpt and strengthen your entire upper body with this incredible arms and back workout. Use your own body
                            weight or
                            grab a set of dumbbells to challenge yourself.</p>
                        <p class="workout-text"><span class="workout-text-type">Equipment</span>dumbbells</p>
                    </div>
                </div>
            </div>
        </main>
        `;
}