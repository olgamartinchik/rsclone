export default function cardResultTemplate(title: string, subtitle: string, img: number): string {
  return `
  <div class="row">
            <div class="col s12 m6">
              <div class="card">
                <div class="card-image">
                  <img src="./assets/img/${img}.png" alt/>
                  <span class="card-title">${title}</span>
                </div>
                <div class="card-content">
                  <p>${subtitle}</p>
                </div>
              </div>
            </div>
          </div>
  `;
}