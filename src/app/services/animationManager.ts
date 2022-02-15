export class Animation {
  initPageTransition(): void {
    const animationWrapper = <HTMLElement>document.createElement('div');
    document.body.append(animationWrapper);
    animationWrapper.className = 'animation-wrapper animate_content';
    setTimeout(() => {
        animationWrapper.remove();
    }, 3000);
  }

  initContentFadeout(element: HTMLElement): void {
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.add('animation-fade-out');
    }, 3000);
    setTimeout(() => {
        element.classList.remove('fade-in');
    }, 3300);
  }
}

export default new Animation();