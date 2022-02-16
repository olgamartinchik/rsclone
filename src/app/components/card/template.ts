import { TWorkout } from '../../services/types';

export default function cardTemplate(data: TWorkout): string {
    return `
    <h3 class="title card-title title-container">${data.title}</h3>
    <div class="image-container">
      <div class="image" style="background-image: url('../../assets/trainings/${data.img}.jpg')"></div>
    </div>
    <div class="card-info description">
        <div class="parameters">
          <span>${Math.round(data.duration / 60)} min</span>
          <span class="separator">|</span>
          <span class="right-space">Intensity</span>
          <span class="middle-dot active"></span>
          <span class="middle-dot ${data.intensity === 'medium' || data.intensity === 'high' ? 'active' : ''}"></span>
          <span class="middle-dot ${data.intensity === 'high' ? 'active' : ''}"></span>
        </div>
        <a class="waves-effect waves-light btn-large ${data.completed === true ? 'btn-completed' : ''}">${
        data.completed === true ? '<i class="tiny material-icons">check</i>Completed' : 'Start'
    }</a>
      </div>
    </div>
  `;
}
