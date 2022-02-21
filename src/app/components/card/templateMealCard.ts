import { IDataExplore } from '../../services/types';

export const userMealCardTemplate = function (data: IDataExplore, position: number): string {
    return `
    <div class="meal-card" data-num=${position} data-diet=${
        data.recipe.dietLabels
    } data-mealType=${data.recipe.mealType!.toString()} style="animation-delay: ${position / 10}s">
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image">
                    <img src="${data.recipe.image}" alt="meal" />
                </div>
                <div class="card-content">
                    <h6 class="title-meal-card">${data.recipe.mealType!.toString()}</h6>
                    <p class="subtitle-day-meal">${data.recipe.label}</p>
                </div>
            </div>
            
        </div> 
    </div>
    `;
};

export const exploreCardTemplate = function (data: IDataExplore, position: number): string {
    return `    
        <div class="explore-card" data-edamam=${data.recipe.diet} data-num=${position}>
            <div class="explore-img-container">
                <img
                    class="explore-img"
                    src="./assets/exploreMeal/${data.recipe.image}.jpg"
                    alt="meal"
                />
            </div>
            <p class="subtitle-meal">${data.recipe.diet}</p> 
        </div>  
    `;
};
export const searchingCardTemplate = function mealCardTemplate(data: IDataExplore, position: number): string {
    return `
        <div class="meal-card" data-num=${position}>
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="${data.recipe.image}" alt="meal"/>
                    </div>
                    <div class="card-content">
                        <h6 class="title-meal-card">${data.recipe.label}</h6>
                        <p class="subtitle-day-meal">Calories: ${Math.round(
                            Number(data.recipe.calories) / data.recipe.yield!
                        )} kcal</p>
                    </div>
                </div>
            </div>   
        </div>     
    `;
};
