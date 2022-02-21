export default function selectTemplate(text: string, index: string): string {
    return `
    <option value="${index}">${text}</option>
  `;
}
