class ExplorePageModel {
    activeTabs() {
        const tabs = document.getElementsByClassName('tabs') as HTMLCollectionOf<Element>;
        Array.from(tabs)
        if (tabs) {
            Array.from(tabs).forEach(tab=>{
                 M.Tabs.init(tab, {
                swipeable: true,
                duration: 300,
            });
            })  
        }
        console
    }

    getActiveClassTabs(diet: string) {
        const allTabs = document.getElementsByClassName('tab-explore') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].classList.remove('active');
            if (allTabs[i].getAttribute('data-diet') === diet) {
                allTabs[i].classList.add('active');
                allTabs[i].style.backgroundColor = 'rgba(246, 178, 181, 0.2)';
            }
        }
    }
}
export default ExplorePageModel;
