export default function calenderTemplate(): string {
    return `
  <span class="title calender title-tablet">Birthday</span>
  <input type="text" class="datepicker" name="datepicker" placeholder="Jan 01, 1990" autocomplete="off"/>
  <span class="calender"></span>
  `;
}

export function editcalenderTemplate(text: string): string {
  return `
<p class="settings-link">Birthday</p>
<div class="profile-item-input">
  <input type="text" class="datepicker" name="datepicker" value="${text}" autocomplete="off"/>
  <span><i class="icon calendar"></i></span>
</div>
`;
}
