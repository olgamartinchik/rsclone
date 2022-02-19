export default function cardFavEmpty(): string {
    return `
    <div class="program-card fav-card fav-card-empty">
        <i class="small material-icons">event_note</i>
        <p class="fav-card-empty-text">No favorites yet</p>
        <p class="fav-card-empty-text fav-card-empty-text-sm">Tap <i class="tiny material-icons">favorite_border</i> to add workouts to favorites</p>
    </div>
  `;
}
