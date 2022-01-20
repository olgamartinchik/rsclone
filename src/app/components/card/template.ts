import { TWorkout } from '../../services/types';

export default function cardTemplate(data: TWorkout): string {
    return `
    <div class="title card-title title-container">${data.title}</div>
    <div class="image" style="background-image: url('../../assets/trainings/${data.img}.webp')"></div>
    <div class="card-info">
      <div>
        <div class="parameters">
          <span>${Math.round(data.duration / 60)} min</span>
          <span class="separator">|</span>
          <span class="right-space">Intensity</span>
          <span class="middle-dot active"></span>
          <span class="middle-dot ${data.intensity === 'medium' || data.intensity === 'high' ? 'active' : ''}"></span>
          <span class="middle-dot ${data.intensity === 'high' ? 'active' : ''}"></span>
        </div>
          <div>
            <div class="circle avatar"></div>
            <div class="left-offset circle avatar"></div>
            <div class="left-offset circle avatar"></div>
            <div class="left-offset circle circle-text">+167</div>
          </div>
        </div>
      <div>
        <a class="waves-effect waves-light btn-large">Start</a>
      </div>
    </div>
  `;
}
