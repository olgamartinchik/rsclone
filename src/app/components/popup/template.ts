export default function popup(src: string, name: string, text: string): string {
    return `
    <div class="popup-img">
      <img src="${src}" alt="popup-image">
    </div>
    
    <p class="popup-text">${name}</p>
    <p class="popup-additional-text">${text}</p>`;
}
