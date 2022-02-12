export function profileHeaderTemplate(name: string, src: string): string {
  return `
  <div class="profile-decorative"></div>
  <div class="profile-decorative narrow"></div>
  <div class="profile-header_info z-depth-1">
      <div class="avatar">
          <input class="profile-avatar-input" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" id="avatar" alt="Avatar">        
          <label for="avatar" class="profile-avatar-label">
            <img src=${src} class="profile-avatar"></img>
          </label>
          <i class="icon-upload icon pencil"></i>
      </div>        
      <p class="profile-name title">${name}</p>        
         <div class="profile-workout-info">
             <div class="profile-stats-block">
                 <div class="profile-stats-icon"><i class="icon medal"></i></div>
                 <div class="profile-stats-info">
                     <p>0</p>
                     <p>Workouts</p>
                 </div>
             </div>           
             <div class="profile-stats-block">
                 <div class="profile-stats-icon"><i class="icon calories"></i></div>
                 <div class="profile-stats-info">
                     <p>0</p>
                     <p>Calories</p>
                 </div>
             </div>
         </div>
     </div>
 </div>
  `
}

export function achievementCardTemplate(src: string, badge: string, text: string, modal:string): string {
  return `
  <a href="#${modal}" class="achievement-card modal-trigger">
    <img src=${src} width="100" height="100" alt="Bagde">
  </a>
  <div id=${modal} class="modal profile">
    <div class="modal-content">
      <img class="badge-img-modal" src=${src} width="300" height="300" alt="Bagde">
      <h4 class="badge-title">${badge}</h4>
      <p class="badge-subtitle">${text}</p>
    </div>
  </div>
  `
}