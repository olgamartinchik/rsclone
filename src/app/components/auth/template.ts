export function authTemplate(id: string, type: string, text: string): string {
    return `
  <div class="input-field col s12 auth-field">
      <input id=${id} type=${type} class="validate" value = '' maxlength="40"/>
      <label for=${id}>${text}</label>
  </div>
  `;
}

export function loginPasswordTemplate(id: string, type: string, text: string): string {
    return `
<div class="input-field col s12 auth-field">
    <i class="icon eye-closed" data-type="eye-icon"></i>
    <input id=${id} type=${type} class='validate' value= '' maxlength="40"/>
    <label for=${id}>${text}</label>
</div>
`;
}

export function passwordTemplate(id: string, type: string, text: string): string {
    return `
<div class="input-field col s12 auth-field tooltipped" data-position="top" data-tooltip="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
    <i class="icon eye-closed" data-type="eye-icon"></i>
    <input id=${id} type=${type} class='validate' value= '' maxlength="40"/>
    <label for=${id}>${text}</label>
</div>
`;
}

export function confirmPasswordTemplate(id: string, type: string, text: string): string {
    return `
<div class="input-field col s12 auth-field">
    <i class="icon eye-closed" data-type="eye-icon"></i>
    <input id=${id} type=${type} value='' maxlength="40"/>
    <label for=${id}>${text}</label>
</div>
`;
}
