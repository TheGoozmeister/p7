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

function isString1IncludeInString2(string1, string2) {
    const string1Length = string1.length;
    const string2Length = string2.length;
    const string1LowerCase = string1.toLowerCase();
    const string2LowerCase = string2.toLowerCase();

    for (let i=0; i<=string2Length-string1Length; i++) {
        let match = true;
        for (let j=0; j<string1Length; j++) {
            if (string2LowerCase[i+j]!==string1LowerCase[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }

    return false;
}

function isRecipeAlreadyInArray(recipeId, recipesArray) {
    for (let i=0; i<recipesArray.length; i++) {
        if (recipesArray[i].id==recipeId) {
            return true;
        }
    }
    return false;
}

function addKeywordsToDOM(tagsArray, tagName) {
    const tag = document.querySelector(`.${tagName}__search__suggests`);
    let tagsHTML = "";
    for (let i=0; i<tagsArray.length; i++) {
        tagsHTML += `
        <div class="keyword__suggest ${tagName}Suggest">
            ${tagsArray[i]}                  
        </div>
        `;
    }
    tag.innerHTML = tagsHTML;
}

function isKeyWordAlreadyInArray(keyword, array) {
    for (let i=0;i<array.length;i++) {
        if (array[i]==keyword) {
            return true;
        }
    }
    return false;
}

function addTagsToDOM(matchRecipes) {

    let tags = {
        ingredients: [],
        appliances: [],
        ustensiles: [],
    }

    const ingredientKeywords = Array.from(document.querySelectorAll(".ingredientsSuggest"));
    const applianceKeywords = Array.from(document.querySelectorAll(".applianceSuggest"));
    const ustensileKeywords = Array.from(document.querySelectorAll(".ustensilesSuggest"));


    for (let i=0; i<ingredientKeywords.length; i++) {
        const ingredientKeyword = ingredientKeywords[i];
        const cleanKeyword = ingredientKeyword.textContent.trim();

        ingredientKeyword.addEventListener("click", function() {
            const tag = document.createElement('div');
            tag.classList.add("tag");
            tag.innerHTML = `
                <div class="tag__name">
                    ${ingredientKeyword.textContent}
                </div>
                <div class="tag__cross">
                    <img src="../assets/pp_cross.png" alt="cross" />
                </div>
            `; 

            const cross = tag.querySelector('.tag__cross');
            cross.addEventListener('click', function () {
                tag.remove();
                const cleanedTag = tag.textContent.trim();
                for (let j=0; j<tags.ingredients.length; j++) {
                    if (tags.ingredients[j]==cleanedTag) {
                        tags.ingredients.splice(j, 1);
                    }
                }
                updateRecipesWithTags(tags, matchRecipes);
            });

            const ingredientTags = document.querySelector('.selectedTags__ingredients');
            ingredientTags.appendChild(tag);
            tags.ingredients.push(cleanKeyword);
            ingredientKeyword.remove();
            updateRecipesWithTags(tags, matchRecipes);
        })  
    }

    for (let i=0; i<applianceKeywords.length; i++) {
        const applianceKeyword = applianceKeywords[i];
        const cleanKeyword = applianceKeyword.textContent.trim();

        applianceKeyword.addEventListener("click", function() {
            const tag = document.createElement('div');
            tag.classList.add("tag");
            tag.innerHTML = `
                <div class="tag__name">
                    ${applianceKeyword.textContent}
                </div>
                <div class="tag__cross">
                    <img src="../assets/pp_cross.png" alt="cross" />
                </div>
            `; 

            const cross = tag.querySelector('.tag__cross');
            cross.addEventListener('click', function () {
                tag.remove();
                const cleanedTag = tag.textContent.trim();
                for (let j=0; j<tags.appliances.length; j++) {
                    if (tags.appliances[j]==cleanedTag) {
                        tags.appliances.splice(j, 1);
                    }
                }
                updateRecipesWithTags(tags, matchRecipes);
            });

            const applianceTags = document.querySelector('.selectedTags__appliance');
            applianceTags.appendChild(tag);
            tags.appliances.push(cleanKeyword);
            applianceKeyword.remove();
            updateRecipesWithTags(tags, matchRecipes);
        })  
    }

    for (let i=0; i<ustensileKeywords.length; i++) {
        const ustensileKeyword = ustensileKeywords[i];
        const cleanKeyword = ustensileKeyword.textContent.trim();

        ustensileKeyword.addEventListener("click", function() {
            const tag = document.createElement('div');
            tag.classList.add("tag");
            tag.innerHTML = `
                <div class="tag__name">
                    ${ustensileKeyword.textContent}
                </div>
                <div class="tag__cross">
                    <img src="../assets/pp_cross.png" alt="cross" />
                </div>
            `; 

            const cross = tag.querySelector('.tag__cross');
            cross.addEventListener('click', function () {
                tag.remove();
                const cleanedTag = tag.textContent.trim();
                for (let j=0; j<tags.ustensiles.length; j++) {
                    if (tags.ustensiles[j]==cleanedTag) {
                        tags.ustensiles.splice(j, 1);
                    }
                }
                updateRecipesWithTags(tags, matchRecipes);
            });

            const ustensileTags = document.querySelector('.selectedTags__ustensiles');
            ustensileTags.appendChild(tag);
            tags.ustensiles.push(cleanKeyword);
            ustensileKeyword.remove();
            updateRecipesWithTags(tags, matchRecipes);
        })  
    }

    return tags;
}

function updateRecipesWithTags(tags, recipes) {
    let updatedRecipes = [];

    for (let i=0; i<recipes.length; i++) {
        const recipe =  recipes[i];
        if (areTagsInRecipe(tags, recipe)){
            updatedRecipes.push(recipe);
        }
    }
    addRecipesToDOM(updatedRecipes);
}

function areTagsInRecipe(tags, recipe) {
    const {ingredients, appliances, ustensiles} = tags;
    let isRecipeOk = true;

    for (let i=0; i<ingredients.length; i++) {
        const ingredientTag= ingredients[i].toLowerCase();
        let isIngredientIncluded = false;

        for (let j=0; j<recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
            if (ingredient === ingredientTag) {
                isIngredientIncluded = true;
                break;
            }
        }
        if (!isIngredientIncluded) {
            isRecipeOk = false;
            break;
        }
    }
    console.log(tags);
    if (appliances.length>0) {
        const applianceTag = appliances[0].toLowerCase();
        const isApplianceIncluded = recipe.appliance.toLowerCase() === applianceTag;

        if (!isApplianceIncluded) {
            isRecipeOk = false;
        }
    }

    for (let i = 0; i < ustensiles.length; i++) {
        const ustensilTag = ustensiles[i].toLowerCase();
        let isUstensilIncluded = false;

        for (let j = 0; j < recipe.ustensils.length; j++) {
            const ustensil = recipe.ustensils[j].toLowerCase();
            if (ustensil === ustensilTag) {
                isUstensilIncluded = true;
                break;
            }
        }

        if (!isUstensilIncluded) {
            isRecipeOk = false;
            break;
        }
    }

    return isRecipeOk;
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

function ingredientSearch() {
    const ingredientSearchBar = document.getElementById('ingredientSearchBar');
    
    let matchIngredients = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipeIngredients = recipes[i].ingredients;
        for (let j = 0; j < recipeIngredients.length; j++) {
            let ingredient = recipeIngredients[j].ingredient;
            if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                matchIngredients.push(ingredient);
            }
        }
    }
    addKeywordsToDOM(matchIngredients, "ingredients");
    addTagsToDOM(recipes);
    
    ingredientSearchBar.addEventListener('input', function() {
        let matchIngredients = [];
        let ingredientSearch = ingredientSearchBar.value;
        if (ingredientSearch.length<3) {
            for (let i=0; i<recipes.length; i++) {
                const recipeIngredients = recipes[i].ingredients;
                for (let j=0; j<recipeIngredients.length; j++) {
                    let ingredient = recipeIngredients[j].ingredient
                    if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                        matchIngredients.push(ingredient);
                    }
                }
            }
            addKeywordsToDOM(matchIngredients, "ingredients");
            addTagsToDOM(recipes);
        } else {
            for (let i=0; i<recipes.length; i++) {
                const recipeIngredients = recipes[i].ingredients;
                for (let j=0; j<recipeIngredients.length; j++) {
                    let ingredient = recipeIngredients[j].ingredient
                    
                    if (isString1IncludeInString2(ingredientSearch, ingredient)) {
                        if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                            matchIngredients.push(ingredient);
                        }
                    }
                    
                }
            addKeywordsToDOM(matchIngredients, "ingredients");
            addTagsToDOM(recipes);
            }
        }
    })
}

function ustensilesSearch() {
    const ustensileSearchBar = document.getElementById('ustensileSearchBar');
    let matchUstensiles =[];

    for (let i=0; i<recipes.length; i++) {
        const recipeUstensiles = recipes[i].ustensils;
        for (let j=0; j<recipeUstensiles.length; j++) {
            let ustensile = recipeUstensiles[j];
            if (!isKeyWordAlreadyInArray(ustensile, matchUstensiles)) {
                matchUstensiles.push(ustensile);
            }
        }
    }
    addKeywordsToDOM(matchUstensiles, "ustensiles");
    addTagsToDOM(recipes);

    ustensileSearchBar.addEventListener('input', function() {
        let ustensileSearch = ustensileSearchBar.value;
        let matchUstensiles = [];

        if (ustensileSearch.length<3) {
            for (let i=0; i<recipes.length; i++) {
                const recipeUstensiles = recipes[i].ustensils;
                for (let j=0; j<recipeUstensiles.length; j++) {
                    let ustensile = recipeUstensiles[j];
                    if (!isKeyWordAlreadyInArray(ustensile, matchUstensiles)) {
                        matchUstensiles.push(ustensile);
                    }
                }
            }
            addKeywordsToDOM(matchUstensiles, "ustensiles");
            addTagsToDOM(recipes);
        } else {
            for (let i=0; i<recipes.length; i++) {
                const recipeUstensiles = recipes[i].ustensils;
                for (let j=0; j<recipeUstensiles.length; j++) {
                    let ustensile = recipeUstensiles[j];
                    if (isString1IncludeInString2(ustensileSearch, ustensile)) {
                        if (!isKeyWordAlreadyInArray(ustensile, matchUstensiles)) {
                            matchUstensiles.push(ustensile);
                            console.log("ok")
                        }
                    }
                }
            }
            addKeywordsToDOM(matchUstensiles, "ustensiles");
            addTagsToDOM(recipes);
        }
    })
}

function applianceSearch() {
    const applianceSearchBar = document.getElementById('applianceSearchBar')

    applianceSearchBar.addEventListener('click', function(){
        let applianceSearch = applianceSearchBar.value;
        let matchAppliance = [];
        for (let i=0; i<recipes.length; i++) {
            const recipeAppliance = recipes[i].appliance;
            if (isString1IncludeInString2(applianceSearch, recipeAppliance)) {
                if (!isKeyWordAlreadyInArray(recipeAppliance, matchAppliance)) {
                    matchAppliance.push(recipeAppliance);
                }
            }
        }
        addKeywordsToDOM(matchAppliance, "appliance");
        addTagsToDOM(recipes);
    })
}

function main() {

    const mainBarSearch = document.querySelector('.mainSearch');
    addRecipesToDOM(recipes);

    mainBarSearch.addEventListener('input', function() {
        let mainSearch = mainBarSearch.value;
        let matchRecipes = [];

        if (mainSearch.length<3) {
            matchRecipes = recipes;
        } else {
            const recipesLength = recipes.length;

            let matchAppliance = [];
            let matchIngredients = [];
            let matchUstensils = [];

            for (let i=0; i<recipesLength; i++) {

                const recipe = recipes[i];
                const recipeId = recipe.id;
                const recipeName = recipe.name;
                const recipeDescription = recipe.description;
                const recipeIngredients = recipe.ingredients; 
                const recipeAppliance = recipe.appliance;
                const recipeUstensils = recipe.ustensils;

                if(isString1IncludeInString2(mainSearch, recipeName) && !isRecipeAlreadyInArray(recipeId, matchRecipes)) {
                    matchRecipes.push(recipe);
                }

                if(isString1IncludeInString2(mainSearch, recipeDescription) && !isRecipeAlreadyInArray(recipeId, matchRecipes)) { // check if not alreay included
                    matchRecipes.push(recipe);
                }

                for (let j=0; j<recipeIngredients.length; j++) {
                    let ingredient = recipeIngredients[j].ingredient
                    if (isString1IncludeInString2(mainSearch, ingredient)) {
                        if (!isRecipeAlreadyInArray(recipeId, matchRecipes)) {
                            matchRecipes.push(recipe);
                        }
                        if (!isKeyWordAlreadyInArray(ingredient, matchIngredients)) {
                            matchIngredients.push(ingredient);
                        }
                    }
                }
                addKeywordsToDOM(matchIngredients, "ingredients");

                if (isString1IncludeInString2(mainSearch, recipeAppliance) && !isKeyWordAlreadyInArray(recipeAppliance, matchAppliance)) {
                    matchAppliance.push(recipeAppliance);
                }
                addKeywordsToDOM(matchAppliance, "appliance");

                for (let k=0; k<recipeUstensils.length; k++) {
                    let ustensil = recipeUstensils[k];
                    if (isString1IncludeInString2(mainSearch, ustensil) && !isKeyWordAlreadyInArray(ustensil, matchUstensils)) {
                        matchUstensils.push(ustensil);
                    }
                }
                addKeywordsToDOM(matchUstensils, "ustensiles");
            }
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