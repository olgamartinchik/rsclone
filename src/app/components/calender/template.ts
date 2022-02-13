export default function calenderTemplate(): string {
    return `
  <span class="title calender title-tablet">Birthday</span>
  <input type="text" class="datepicker" name="datepicker" placeholder="Jan 01, 1990" autocomplete="off"/>
  <span class="calender"></span>
  `;
}
