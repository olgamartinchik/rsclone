export default function congratsTemplate(duration: number): string {
    return `
  <div class="congratulations">
    <div class="congratulations-content">
      <p class="congratulations-title">Congratulations!</p>
      <p class="tip">Your personalized <span class="tip-accent">${duration.toString()}-Week</span> program is<br>ready to help you reach
        your fitness goal.</p>
      <img src="./assets/img/svg/kick_start.svg" alt="" class="center-img">
      <a class="waves-effect waves-light btn-large" data-btn = "start">Get started</a>
    </div>
  </div>
  `;
}
