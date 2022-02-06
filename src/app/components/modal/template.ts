export function modalFooterTemplate(className: string, text: string): string {
  return `
  <div class="modal-footer">
    <a href="#/${className}" class="modal-close waves-effect waves-red btn-flat ${className}">${text}</a>
  </div>
  `
}