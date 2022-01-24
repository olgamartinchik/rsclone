import BrowsePageView from './browsePageView';

class BrowsePageController {
    private view: BrowsePageView;

    constructor() {
        this.view = new BrowsePageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default BrowsePageController;
