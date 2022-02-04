export function settingsTemplate(text: string): string {
  return `
  <div class="settings-item">
      <a href="#/${text.toLowerCase().split(' ').join('')}" class="settings-link">
          <i class="icon ${text.toLowerCase().split(' ')[1]}"></i>
          ${text}
      </a>
      <i class="icon arrow-right"></i>
  </div>
  `
}

export function settingsWithChipsTemplate(text: string, unit1?: string, unit2?: string): string {
  return `
  <div class="settings-item">
      <p class="settings-link">
          <i class="icon ${text.toLowerCase()}"></i>
          ${text}
      </p>
      <div class="unit-selection z-depth-1">
         <div class="unit-item active">${unit1}</div>
         <div class="unit-item">${unit2}</div>
      </div>
  </div>
  `
}