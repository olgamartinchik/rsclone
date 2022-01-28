export default function onboardingTemplate(title: string): string {
  return `
  <div class="registration-header">
    <h2 class="title title-tablet registration-title">${title}</h2>
  </div>
  <div class="registration-content">
    <form action="#" method="post">
    <a class="waves-effect waves-light btn-large">Next</a>
    </form>
  </div>
  `
}