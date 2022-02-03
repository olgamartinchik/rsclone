export function paramsTemplate(
    title: string,
    units: string,
    option1: string,
    option2: string,
    min: string,
    max: string
): string {
    const dataAttribute = title === 'desired Weight' ? 'desiredWeight' : title;
    return `
  <span class="title title-tablet">${title}</span>
  <span class="value" data-${dataAttribute}>
      <input type="text" class="value-select" placeholder="0" data-type='parameter' data-${dataAttribute} data-value=${dataAttribute} min=${min} max=${max}> 
      <span>${units}</span>
      <i class="icon-select"></i>
  </span>
  <div class="select-block" id=${title.split(' ').join('')}>
    <div class="options" data-select>
        <p class="unit ${option1.split(' ')[0].toLowerCase()}">${option1}</p>
        <p class="unit ${option2.toLowerCase()} active">${option2}</p>
    </div>
    <div class="range">
        <p class="range-field">
            <input type="range" id="play-bar" step="1" value=${min} min=${min} max=${max} data-${dataAttribute}/>
        </p>
    </div>
  </div>
  `;
}
