export default function genderTemplate(): string {
    return `
  <div class="gender-item" data-title="gender" data-value="female"><i class="icon female"></i>Female</div>
  <div class="gender-item" data-title="gender" data-value="male"><i class="icon male"></i>Male</div>
  <div class="gender-item" data-title="gender" data-value="other"><i class="icon other_gender"></i>Other</div>
  `;
}
