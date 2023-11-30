function main() {
    const mainBarSearch = document.querySelector('mainSearch');
    addRecipesToDOM(recipes);

    mainBarSearch.addEventListener('input', function() {
        let mainSearch = mainBarSearch.value.toLowerCase();
        let matchRecipes = [];

        if (mainSearch.length<3) {
            matchRecipes = recipes;
        } else {
            matchRecipes = recipes.filter(recipe => {
                const recipeName = recipe.name.toLowerCase();
                const recipeDescription = recipe.recipeDescription.toLowerCase();
                const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
                const recipeAppliance = recipe.appliance.toLowerCase();
                const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

                return (
                    recipeName.includes(mainSearch) ||
                    recipeDescription.includes(mainSearch) ||
                    recipeIngredients.some(ingredient => ingredient.includes(mainSearch)) ||
                    recipeAppliance.includes(mainSearch) || 
                    recipeUstensils.some(ustensil => ustensil.includes(mainSearch))
                );  
            })

            let matchIngredients = getUniqueKeywords(matchRecipes, "ingredients");
            let matchAppliance = getUniqueKeywords(matchRecipes, "appliance");
            let matchUstensils = getUniqueKeywords(matchRecipes, "ustensiles");

            addKeywordsToDOM(matchIngredients, "ingredients");
            addKeywordsToDOM(matchAppliance, "appliance");
            addKeywordsToDOM(matchUstensils, "ustensiles");
        }
        addRecipesToDOM(matchRecipes);
        addTagsToDOM(matchRecipes);
    })
    dropdown();
    ingredientSearch();
    ustensilesSearch();
    applianceSearch();
}

function getUniqueKeywords(recipes, key) {
    return [...new Set(recipes.flatMap(recipe => recipe[key].map(item => item.toLowerCase())))];
}