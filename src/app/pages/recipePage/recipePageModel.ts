class RecipePageModel {
    data: string;

    constructor(data: string) {
        this.data = data;
    }

    getData() {
        console.log('data is being loaded');
    }
}
export default RecipePageModel;
