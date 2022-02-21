export default function optionTemplate(
    className: string,
    text: string,
    isChecked: boolean,
    isDisabled?: boolean
): string {
    const checked = isChecked ? 'checked' : '';
    const disabled = isDisabled ? 'disabled' : '';
    const attribute = text.split(' ').length > 1 ? `${text.split(' ')[0]}${text.split(' ')[1]}` : text;
    return `
  <p>
    <label for="${attribute.toLowerCase()}" class="${className}">
      <input type="checkbox" id="${attribute.toLowerCase()}" ${checked} ${disabled}/>
      <span class="${className}">${text.split(' ')[0].toUpperCase()}</span>
    </label>
  </p>
  `;
}
