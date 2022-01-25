export default function authTemplate(id: string, type: string, text: string): string {
    return `
  <div class="input-field col s12 auth-field">
      <input id=${id} type=${type} class="validate" />
      <label for=${id}>${text}</label>
  </div>
  `;
}
