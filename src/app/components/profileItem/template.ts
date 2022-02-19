export function profileInputItemTemplate(type: string, title: string, text: string): string {
    return `
  <p class="settings-link">${title}</p>
  <div class="profile-item-input">
    <input type="${type}" class="validate" placeholder="${text}" id="${title.toLowerCase()}" data-value="${title.toLowerCase()}">
  </div>
  `;
}

export function profileGenderItemTemplate(title: string): string {
    return `
  <p class="settings-link">${title}</p>
  <div class="editprofile gender-selection z-depth-1">
    <div class="gender-item" data-title="gender" data-value="female"><i class="icon female"></i>Female</div>
    <div class="gender-item" data-title="gender" data-value="male"><i class="icon male"></i>Male</div>
    <div class="gender-item" data-title="gender" data-value="other"><i class="icon other_gender"></i>Other</div>
  </div>
  `;
}

export function changePasswordTemplate(title: string): string {
    return `
  <p class="settings-link">${title}</p>
  <a class="waves-effect waves-light btn modal-trigger change-password" href="#modal9">Change Password</a>

  <div id="modal9" class="modal change-password">
    <div class="modal-content">
      <div class="input-field col s12 auth-field">
        <i class="icon eye-closed" data-type="eye-icon"></i>
        <input id="password" type="password" value= '' maxlength="40" data-value="password"/>
        <label for="password">Enter current password</label>
      </div>
      <div class="input-field col s12 auth-field tooltipped" data-position="bottom" data-tooltip="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
        <i class="icon eye-closed" data-type="eye-icon"></i>
        <input id="newPassword" type="password" class='validate' value= '' maxlength="40" data-value="newPassword" pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{8,}$" disabled/>
        <label for="newPassword">Enter new password</label>
      </div>
      <div class="input-field col s12 auth-field">
        <i class="icon eye-closed" data-type="eye-icon"></i>
        <input id="confirm" type="password" value= '' maxlength="40" data-value="confirmPassword" disabled/>
        <label for="confirm">Confirm new password</label>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#/editprofile" class="modal-close waves-effect waves-red btn-flat btn-disabled" id="confirmPasswordChange" disabled>Confirm</a>
    </div>
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
