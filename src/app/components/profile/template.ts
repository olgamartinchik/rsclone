export function profileHeaderTemplate(name: string, src: string, completedWorkoutrs: number ,caloriesBurned: number): string {
  return `
  <div class="profile-decorative"></div>
  <div class="profile-decorative narrow"></div>
  <div class="profile-header_info z-depth-1">
      <div class="avatar">
          <input class="profile-avatar-input" type="file" accept="image/*" id="avatar" alt="Avatar">        
          <label for="avatar" class="profile-avatar-label">
            <img src=${src} class="profile-avatar"></img>
            <i class="icon-upload icon pencil"></i>
          </label>
      </div>
      <div id="modal7" class="modal avatar-modal">
        <div class="modal-content">
          <p>Delete avatar?</p>
        </div>
        <div class="modal-footer">
          <a href="#/profile" class="modal-close waves-effect waves-red btn-flat">Agree</a>
        </div>
      </div>        
      <p class="profile-name title">${name}</p>        
         <div class="profile-workout-info">
             <div class="profile-stats-block">
                 <div class="profile-stats-icon"><i class="icon medal"></i></div>
                 <div class="profile-stats-info">
                     <p data-statistics>${completedWorkoutrs}</p>
                     <p>Workouts</p>
                 </div>
             </div>           
             <div class="profile-stats-block">
                 <div class="profile-stats-icon"><i class="icon calories"></i></div>
                 <div class="profile-stats-info">
                     <p data-statistics>${caloriesBurned}</p>
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

export function editProfileTemplate(src: string): string {
  return `
  <div class="editprofile-decorative"></div>
  <div class="avatar">
      <input class="profile-avatar-input" type="file" accept="image/*" id="avatar" alt="Avatar">        
      <label for="avatar" class="profile-avatar-label">
        <img src=${src} class="profile-avatar editprofile"></img>
        <i class="icon-upload icon pencil"></i>
      </label>
  </div>
  <div id="modal7" class="modal avatar-modal">
    <div class="modal-content">
      <p>Delete avatar?</p>
    </div>
    <div class="modal-footer">
      <a href="#/editprofile" class="modal-close waves-effect waves-red btn-flat">Agree</a>
    </div>
  </div>
  `
}