import recipes from "../datas/recipes.js";
import { recipeTemplate } from './templates/cardRecipe.js';


function dropdown() {
    const ingredientsDropdown = document.getElementById('ingredientsDropdown');
    const ingredientKeywords = document.getElementById('ingredientsKeywords');
    const ingredientsDropup = document.getElementById('ingredientsDropup');

    const applianceDropdown = document.getElementById('applianceDropdown');
    const applianceKeywords = document.getElementById('applianceKeywords');
    const applianceDropup = document.getElementById('applianceDropup');

    const ustensilesDropdown = document.getElementById('ustensilesDropdown');
    const ustensilesKeywords = document.getElementById('ustensilesKeywords');
    const ustensilesDropup = document.getElementById('ustensilesDropup');

    ingredientsDropdown.addEventListener("click", function() {
        ingredientKeywords.style.display = "block";
        ingredientsDropup.style.display = "block";
        ingredientsDropdown.style.display = "none";
    })
    ingredientsDropup.addEventListener("click", function () {
        ingredientKeywords.style.display = "none";
        ingredientsDropup.style.display = "none";
        ingredientsDropdown.style.display = "block";
    })

    applianceDropdown.addEventListener("click", function() {
        applianceKeywords.style.display = "block";
        applianceDropup.style.display = "block";
        applianceDropdown.style.display = "none";
    })
    applianceDropup.addEventListener("click", function () {
        applianceKeywords.style.display = "none";
        applianceDropup.style.display = "none";
        applianceDropdown.style.display = "block";
    })

    ustensilesDropdown.addEventListener("click", function() {
        ustensilesKeywords.style.display = "block";
        ustensilesDropup.style.display = "block";
        ustensilesDropdown.style.display = "none";
    })
    ustensilesDropup.addEventListener("click", function () {
        ustensilesKeywords.style.display = "none";
        ustensilesDropup.style.display = "none";
        ustensilesDropdown.style.display = "block";
    })
}

function addKeywordsToDOM(tagsArray, tagName) {
    const tag = document.querySelector(`.${tagName}__search__suggests`);
    let tagsHTML = "";

    tagsArray.forEach(tagValue => {
        if (typeof tagValue === 'object' && 'ingredient' in tagValue) {
            tagsHTML += `
                <div class="keyword__suggest ${tagName}Suggest">
                    ${tagValue.ingredient}                  
                </div>
            `;
        } else {
            tagsHTML += `
                <div class="keyword__suggest ${tagName}Suggest">
                    ${tagValue}                  
                </div>
            `;
        }
    });

    tag.innerHTML = tagsHTML;
}

function isKeyWordAlreadyInArray(keyword, array) {
    return array.some(item => item.toLowerCase() === keyword.toLowerCase());
}



function addTagsToDOM(matchRecipes) {
    const tags = {
        ingredients: [],
        appliances: [],
        ustensiles: [],
    };

    const addTagEventListener = (tagType, tagsArray, tagContainer) => {
        tagsArray.forEach(tagElement => {
            const cleanKeyword = tagElement.textContent.trim();
            console.log(cleanKeyword)
            tagElement.addEventListener('click', () => {
                const tag = createTagElement(tagElement.textContent);
                console.log(tag);
                const cross = tag.querySelector('.tag__cross');

                cross.addEventListener('click', () => {
                    tag.remove();
                    removeTagFromTagsArray(cleanKeyword, tags[tagType]);
                    updateRecipesWithTags(tags, matchRecipes);
                });

                tagContainer.appendChild(tag);
                tags[tagType].push(cleanKeyword);
                console.log(tags[tagType])
                tagElement.remove();
                updateRecipesWithTags(tags, matchRecipes);
            });
        });
    };

    const ingredientKeywords = Array.from(document.querySelectorAll('.ingredientsSuggest'));
    const applianceKeywords = Array.from(document.querySelectorAll('.applianceSuggest'));
    const ustensileKeywords = Array.from(document.querySelectorAll('.ustensilesSuggest'));

    addTagEventListener('ingredients', ingredientKeywords, document.querySelector('.selectedTags__ingredients'));
    addTagEventListener('appliances', applianceKeywords, document.querySelector('.selectedTags__appliance'));
    addTagEventListener('ustensiles', ustensileKeywords, document.querySelector('.selectedTags__ustensiles'));
}

function updateRecipesWithTags(tags, recipes) {
    const updatedRecipes = recipes.filter(recipe => areTagsInRecipe(tags, recipe));
    addRecipesToDOM(updatedRecipes);
}

function createTagElement(tagContent) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.innerHTML = `
        <div class="tag__name">
            ${tagContent}
        </div>
        <div class="tag__cross">
            <img src="../assets/pp_cross.png" alt="cross" />
        </div>
    `;
    return tag;
}

function removeTagFromTagsArray(tagToRemove, tagsArray) {
    const index = tagsArray.indexOf(tagToRemove);
    if (index !== -1) {
        tagsArray.splice(index, 1);
    }
}

function areTagsInRecipe(tags, recipe) {
    const { ingredients, appliances, ustensiles } = tags;

    const isIngredientIncluded = ingredients.every(ingredientTag =>
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase() === ingredientTag.toLowerCase()
        )
    );

    const isApplianceIncluded = appliances.length > 0 ?
        recipe.appliance.toLowerCase() === appliances[0].toLowerCase() : true;

    const isUstensilIncluded = ustensiles.every(ustensilTag =>
        recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase() === ustensilTag.toLowerCase()
        )
    );

    return isIngredientIncluded && isApplianceIncluded && isUstensilIncluded;
}

function addRecipesToDOM(recipes) {
    const recipesContainer = document.querySelector('.recipesContainer');
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe) => {
        const { getRecipeCardDOM, addIngredients } = recipeTemplate(recipe);
        const recipeCardDOM = getRecipeCardDOM();
        recipesContainer.appendChild(recipeCardDOM);
        addIngredients();
    })
    const recipesAmount = document.querySelector('.tags__results__amount');
    recipesAmount.innerText = recipes.length;
}

function updateIngredientKeywords() {
    let matchIngredients = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredientObj => {
            const ingredient = ingredientObj.ingredient;
            if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                matchIngredients.push(ingredient);
            }
        });
    });

    addKeywordsToDOM(matchIngredients, "ingredients");
    addTagsToDOM(recipes);
}

function updateUstensileKeywords() {
    let matchUstensiles = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensile => {
            if (!isKeyWordAlreadyInArray(ustensile, matchUstensiles)) {
                matchUstensiles.push(ustensile);
            }
        });
    });

    addKeywordsToDOM(matchUstensiles, "ustensiles");
    addTagsToDOM(recipes);
}

function updateApplianceKeywords() {
    let matchAppliances = [];

    recipes.forEach(recipe => {
        const appliance = recipe.appliance;
        if (!isKeyWordAlreadyInArray(appliance, matchAppliances)) {
            matchAppliances.push(appliance);
        }
    });

    addKeywordsToDOM(matchAppliances, "appliance");
    addTagsToDOM(recipes);
}

function ingredientSearch() {
    const ingredientSearchBar = document.getElementById('ingredientSearchBar');
    updateIngredientKeywords();

    ingredientSearchBar.addEventListener('input', function () {
        let matchIngredients = [];
        let ingredientSearch = ingredientSearchBar.value;

        if (ingredientSearch.length < 3) {
            updateIngredientKeywords();
        } else {
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredientObj => {
                    const ingredient = ingredientObj.ingredient;

                    if (ingredient.includes(ingredientSearch)) {
                        if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                            matchIngredients.push(ingredient);
                        }
                    }
                });
            });

            addKeywordsToDOM(matchIngredients, "ingredients");
            addTagsToDOM(recipes);
        }
    });
}

function ustensilesSearch() {
    const ustensileSearchBar = document.getElementById('ustensileSearchBar');
    updateUstensileKeywords();

    ustensileSearchBar.addEventListener('input', function () {
        let ustensileSearch = ustensileSearchBar.value;
        let matchUstensiles = [];

        if (ustensileSearch.length < 3) {
            updateUstensileKeywords();
        } else {
            recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensile => {
                    if (ustensile.includes(ustensileSearch)) {
                        if (!isKeyWordAlreadyInArray(ustensile, matchUstensiles)) {
                            matchUstensiles.push(ustensile);
                        }
                    }
                });
            });

            addKeywordsToDOM(matchUstensiles, "ustensiles");
            addTagsToDOM(recipes);
        }
    });
}

function applianceSearch() {
    const applianceSearchBar = document.getElementById('applianceSearchBar');
    updateApplianceKeywords();

    applianceSearchBar.addEventListener('input', function () {
        let applianceSearch = applianceSearchBar.value;
        let matchAppliances = [];

        if (applianceSearch.length < 3) {
            updateApplianceKeywords();
        } else {
            recipes.forEach(recipe => {
                const appliance = recipe.appliance;

                if (appliance.toLowerCase().includes(applianceSearch.toLowerCase())) {
                    if (!isKeyWordAlreadyInArray(appliance, matchAppliances)) {
                        matchAppliances.push(appliance);
                    }
                }
            });

            addKeywordsToDOM(matchAppliances, "appliance");
            addTagsToDOM(recipes);
        }
    });
}


function main() {
    const mainBarSearch = document.querySelector('.mainSearch');
    addRecipesToDOM(recipes);

    mainBarSearch.addEventListener('input', function() {
        let mainSearch = mainBarSearch.value.toLowerCase();
        let matchRecipes = [];
        let matchIngredients = [];
        let matchAppliance = [];
        let matchUstensils = [];

        if (mainSearch.length<3) {
            matchRecipes = recipes;
        } else {
            matchRecipes = recipes.filter(recipe => {
                console.log(recipe)
                const recipeName = recipe.name.toLowerCase();
                const recipeDescription = recipe.description.toLowerCase();
                const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
                const recipeAppliance = recipe.appliance.toLowerCase();
                const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

                if (
                    recipeName.includes(mainSearch) ||
                    recipeDescription.includes(mainSearch) ||
                    recipeIngredients.some(ingredient => ingredient.includes(mainSearch)) ||
                    recipeAppliance.includes(mainSearch) ||
                    recipeUstensils.some(ustensil => ustensil.includes(mainSearch))
                ) {
                    matchIngredients = matchIngredients.concat(recipeIngredients.filter(ingredient => ingredient.includes(mainSearch) && !matchIngredients.includes(ingredient)));
                    matchAppliance.push(recipeAppliance);
                    matchUstensils = matchUstensils.concat(recipeUstensils.filter(ustensil => ustensil.includes(mainSearch) && !matchUstensils.includes(ustensil)));

                    return true;
                }

                return false;
            })

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

main();



