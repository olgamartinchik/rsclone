export function profileHeaderTemplate(name: string, src: string): string {
  return `
  <div class="profile-decorative"></div>
  <div class="profile-decorative narrow"></div>
  <div class="profile-header_info z-depth-1">
      <div class="avatar">
          <img src=${src} class="profile-avatar"></img>
          <span class="icon-upload"><i class="icon pencil"></i></span>
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