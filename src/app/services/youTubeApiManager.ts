class YouTubeApiManager {
    createIFrame(link: string): HTMLIFrameElement {
        const currLink = `${link}?rel=0&showinfo=0&autoplay=0&iv_load_policy=3`;
        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('controls', '0');

        iframe.setAttribute('src', currLink);
        iframe.classList.add('video');

        return iframe;
    }
}

export default new YouTubeApiManager();
