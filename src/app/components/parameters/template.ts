export function paramsTemplate(
    className: string,
    title: string,
    units: string,
    units2: string,
    option1: string,
    option2: string,
    min: string,
    max: string
): string {
    const dataAttribute = title === 'desired Weight' ? 'desiredWeight' : title;
    return `
  <span class="${className}">${title}</span>
  <span class="value" data-${dataAttribute}>
      <input type="text" class="value-select" placeholder="${min}" data-title="${dataAttribute}Unit" data-type='parameter' data-${dataAttribute} data-value=${dataAttribute}> 
      <span data-title="${dataAttribute}Unit">${units}</span>
      <i class="icon-select down" data-title="${dataAttribute}Unit"></i>
  </span>
  <div class="select-block" id=${title.split(' ').join('')}>
    <div class="options" data-select>
        <p class="unit ${option1.split(' ')[0].toLowerCase()}" data-title="${dataAttribute}Unit" data-value="${
        units2.split(' ')[0]
    }">${option1}</p>
        <p class="unit ${option2.toLowerCase()} active" data-title="${dataAttribute}Unit" data-value="${units}">${option2}</p>
    </div>
    <div class="range">
        <p class="range-field">
            <input type="range" id="play-bar" step="1" value=${min} min=${min} max=${max} data-${dataAttribute} data-type="${dataAttribute}"/>
        </p>
    </div>
  </div>
  `;
}

export function paramsShortTemplate(className: string, title: string): string {
    const dataAttribute = title === 'desired Weight' ? 'desiredWeight' : title;
    return `
  <span class="${className}">${title}</span>
  <span class="value editprofile" data-${dataAttribute}>
      <input type="text" class="value-select" data-title="${dataAttribute}Unit" data-type='parameter' data-${dataAttribute} data-value=${dataAttribute}> 
      <span data-title="${dataAttribute}Unit"></span>
  </span>
  `;
}
