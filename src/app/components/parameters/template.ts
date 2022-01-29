export function paramsTemplate(title: string, units: string, option1: string, option2: string, min: string, max: string): string {
  return `
  <span class="title title-tablet">${title}</span>
  <span class="value">
      <span>${min}</span> 
      <span>${units}</span>
      <i class="icon-select"></i>
  </span>
  <div class="select-block" id=${title.toLowerCase()}>
    <div class="options" data-select>
        <p class="unit">${option1}</p>
        <p class="unit active">${option2}</p>
    </div>
    <div class="range">
            <p class="range-field">
                <input type="range" id="play-bar" step="1" value=${min} min=${min} max=${max} />
            </p>
    </div>
  </div>
  `
}