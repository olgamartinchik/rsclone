export function paramsTemplate(title: string, option1: string, option2: string, min: string, max: string): string {
  return `
  <span class="title title-tablet">${title}</span>
  <span class="value">
      60 kg
      <i class="icon-select"></i>
  </span>
  <div class="select-block">
  <div class="options">
      <p>${option1}</p>
      <p class="active">${option2}</p>
  </div>
  <div class="range">
          <p class="range-field">
              <input type="range" id="play-bar" min=${min} max=${max} />
          </p>
  </div>
  </div>
  `
}

export function selectTemplate(option1: string, option2: string, min: string, max: string): string {
  return `
  <div class="select-block active">
    <div class="options">
        <p>${option1}</p>
        <p class="active">${option2}</p>
    </div>
    <div class="range">
            <p class="range-field">
                <input type="range" id="play-bar" min=${min} max=${max} />
            </p>
    </div>
  </div>
  `
}