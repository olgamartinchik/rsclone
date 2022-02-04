import { IDataExplore } from '../../services/types';
export const mealCardTemplate = function mealCardTemplate(data: IDataExplore): string {
    return `
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="${data.recipe.image}" />
                    </div>
                    <div class="card-content">
                        <h6 class="title-meal-card">${data.recipe.label}</h6>
                        <p class="subtitle-day-meal">Calories: ${Math.round(
                            Number(data.recipe.calories) / data.recipe.yield
                        )} kcal</p>
                    </div>
                </div>
            </div>        
    `;
};
export const userMealCardTemplate = function (data: IDataExplore): string {
    return `
    <div class="col s12 m6">
    <div class="card">
        <div class="card-image">
            <img src="${data.recipe.image}" />
        </div>
        <div class="card-content">
            <h6 class="title-meal-card">${data.recipe.mealType[0].toString()}</h6>
            <p class="subtitle-day-meal">${data.recipe.label}</p>
        </div>
    </div>
</div> 
    `;
};
export const exploreCardTemplate = function (data: IDataExplore): string {
    return `    
        <div class="explore-img-container">
            <img
                class="explore-img"
                src="${data.recipe.image}"
            />
        </div>
        <p class="subtitle-meal">${data.recipe.dishType}</p>   
    `;
};