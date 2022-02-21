export default function carouselTemplate(): string {
    return `
  <h3 class="fiton-modal-title">Please sign up for free to benefit from all the advantages FitOn provides</h3>
  <div id="carousel">
      <div id="spinner">
          <div class="spinner-card z-depth-2">
              <h4>Personalized workout programs</h4>
              <div class="image">
                  <img src="../../../assets/img/advantages1.png" alt>
              </div>
          </div>
          <div class="spinner-card z-depth-2">
              <h4>Regular statistics</h4>
              <div class="image">
                  <img src="../../../assets/img/advantages2.png" alt>
              </div>
          </div>
          <div class="spinner-card z-depth-2">
              <h4>Customizable profile</h4>
              <div class="image">
                  <img src="../../../assets/img/advantages3.png" alt>
              </div>
          </div>
          <div class="spinner-card z-depth-2">
              <h4>Opportunity to use daily meal suggestions</h4>
              <div class="image">
                  <img src="../../../assets/img/advantages4.png" alt>
              </div>
          </div>
      </div>
  </div>
  <span class="carousel-arrow left">
      <i data-arrow="arrow" data-direction="left" class="icon angle-left"></i>
  </span>
  <span class="carousel-arrow right">
      <i data-arrow = "arrow" data-direction="right" class="icon angle-right"></i>
  </span>
  </div>
  <div class="btn-wrapper">
      <a href="/#register" class ='waves-effect waves-light btn-large'>SignUp</a>
  </div>
  `;
}
