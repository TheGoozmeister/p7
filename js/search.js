import recipes from "../datas/recipes.js";
import { recipeTemplate } from './templates/cardRecipe.js';

async function main() {
    console.log(recipes);
    const recipesContainer =document.querySelector('.recipesContainer');

    recipes.forEach((recipe)=>{
        const { getRecipeCardDOM, addIngredients } = recipeTemplate(recipe);
        const recipeCardDOM = getRecipeCardDOM();
        recipesContainer.appendChild(recipeCardDOM);
        addIngredients();
    })
}

main();