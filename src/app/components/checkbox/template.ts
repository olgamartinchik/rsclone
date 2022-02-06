export default function optionTemplate(className: string, text: string, isChecked: boolean): string {
  const checked = (isChecked) ? 'checked' : '';
  return `
  <p>
    <label for="${text.toLowerCase()}" class="${className}">
      <input type="checkbox" id="${text.toLowerCase()}" ${checked}/>
      <span class="${className}">${text.toUpperCase()}</span>
    </label>
  </p>
  `
}