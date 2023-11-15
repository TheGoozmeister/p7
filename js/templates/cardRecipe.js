export function recipeTemplate (recipeDatas) {

    const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = recipeDatas;
    const picture = `../assets/recipes/${image}`;

    function addIngredients() {
        const ingredientList = document.getElementById(`cardRecipe__ingredients__${id}`);

        ingredients.forEach((ingredient)=>{
            const ingredientName = ingredient.ingredient;
            let quantity = ingredient.quantity;
            if (!quantity) {
                quantity = "";
            }
            let unit = ingredient.unit;
            if (!unit) {
                unit = "";
            }

            const oneIngredient = document.createElement('div');
            oneIngredient.classList.add('ingredient');
            oneIngredient.innerHTML = `
                <div class="ingredient__name">${ingredientName}</div>
                <div class="ingredient__quantity">${quantity} ${unit}</div>
            `;

            ingredientList.appendChild(oneIngredient);
        })

        return ingredientList;
    }

    function getRecipeCardDOM() {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('cardRecipe');
        recipeCard.innerHTML = `
        <div class="cardRecipe__image">
            <img src="${picture}" alt="${name}" class="cardRecipe__image__img" />
            <div class="cardRecipe__image__time">${time} min</div>
        </div>
        <div class="cardRecipe__name">${name}</div>
        <div class="cardRecipe__recipe">
            <div class="cardRecipe__recipe__label">RECETTE</div>
            <div class="cardRecipe__recipe__text">${description}</div>
        </div>
        <div class="cardRecipe__ingredients">
            <div class="cardRecipe__ingredients__label">INGR2DIENTS</div>
            <div class="cardRecipe__ingredients__text" id="cardRecipe__ingredients__${id}"></div>
        </div>
        `
        return (recipeCard);
    }
    return {getRecipeCardDOM, addIngredients};
}
