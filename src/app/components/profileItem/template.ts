export function profileInputItemTemplate(title: string, text: string): string {
  return `
  <p class="settings-link">${title}</p>
  <div class="profile-item-input">
    <input type="text" value="${text}">
  </div>
  `
}

export function profileGenderItemTemplate(title: string): string {
  return `
  <p class="settings-link">${title}</p>
  <div class="editprofile gender-selection z-depth-1">
    <div class="gender-item" data-title="gender" data-value="female"><i class="icon female"></i>Female</div>
    <div class="gender-item" data-title="gender" data-value="male"><i class="icon male"></i>Male</div>
    <div class="gender-item" data-title="gender" data-value="other"><i class="icon other_gender"></i>Other</div>
  </div>
  `
}

export function changePasswordTemplate(title: string): string {
  return `
  <p class="settings-link">${title}</p>
  <a class="waves-effect waves-light btn modal-trigger change-password" href="#modal9">Change Password</a>

  <div id="modal9" class="modal">
    <div class="modal-content">
      <div class="password-input">
        <input type="text" placeholder="Enter current password" value="">
        <input type="text" placeholder="Enter new password" value="">
      </div>
    </div>
    <div class="modal-footer">
      <a href="#/editprofile" class="modal-close waves-effect waves-red btn-flat">Confirm</a>
    </div>
  </div>
  `
}