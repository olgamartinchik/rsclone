import { BadgeName, BadgeText } from '../../services/constants';

export default function achievementActiveTemplate(index: number, src?: string): string {
    const currDefaultSrc = `../../../assets/img/badges/${index + 1}.png`;
    return `
        <a href="#modal${index}" class="achievement-card modal-trigger">
            <img src="${src ? src : currDefaultSrc}" width="100" height="100" alt="Bagde">
        </a>
                    
        <div id="modal${index}" class="modal profile">
            <div class="modal-content">
            <img class="badge-img-modal" src="${src ? src : currDefaultSrc}" width="300" height="300" alt="Bagde">
                <h4 class="badge-title">${Object.values(BadgeName)[index]}</h4>
                <p class="badge-subtitle">${Object.values(BadgeText)[index]}</p>
            </div>
        </div>`;
}


