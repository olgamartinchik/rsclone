import { TWorkout } from '../../services/types';

export default function cardTemplate(data: TWorkout): string {
    return `
        <div class="image-container">
            <div class="image" style="background-image: url('../../assets/trainings/${data.img}.jpg')"></div>
            <i class="card-icon small material-icons">favorite_border</i>
        </div>
        <h3 class="title card-title title-container">${data.title}</h3>
        <div class="card-info description">
            <div class="parameters">
            <span>${Math.round(data.duration / 60)} min</span>
            <span class="separator">|</span>
            <span class="right-space">Intensity</span>
            <span class="middle-dot active"></span>
            <span class="middle-dot ${data.intensity === 'medium' || data.intensity === 'high' ? 'active' : ''}"></span>
            <span class="middle-dot ${data.intensity === 'high' ? 'active' : ''}"></span>
            </div>
        </div>
        </div>
  `;
}
