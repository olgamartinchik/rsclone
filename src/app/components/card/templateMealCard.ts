export const mealCardTemplate= function mealCardTemplate(data:any):string{
    return`
        <div class="meal-card">
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
        </div>
    `

};
export const exploreCardTemplate= function (data:any):string{
    return `    
        <div class="explore-img-container">
            <img
                class="explore-img"
                src="${data.recipe.image}"
            />
        </div>
        <p class="subtitle-meal">${data.recipe.dishType}</p>   
    `

}
// class TemplateMealCard{
//     private data:any
//     constructor(){
//         this.data
//     }

//     exploreCardTemplate():string{
//         return `
//         <div class="explore-card">
//             <div class="explore-img-container">
//                 <img
//                     class="explore-img"
//                     src="${this.data.recipe.image}"
//                 />
//             </div>
//             <p class="subtitle-meal">${this.data.recipe.label}</p>
//         </div>
//         `
//     }

// }
// export default TemplateMealCard