export function authTemplate(id: string, type: string, text: string): string {
    return `
  <div class="input-field col s12 auth-field">
      <input id=${id} type=${type} class="validate" value = '' maxlength="40"/>
      <label for=${id}>${text}</label>
  </div>
  `;
}

export function passwordTemplate(id: string, type: string, className: string, text: string): string {
  return `
<div class="input-field col s12 auth-field">
    <i class="icon eye-closed" data-type="eye-icon"></i>
    <input id=${id} type=${type} class=${className} maxlength="40"/>
    <label for=${id}>${text}</label>
</div>
`;
}