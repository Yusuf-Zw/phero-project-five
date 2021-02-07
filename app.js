// 1st Phase
const searchingBtn = document.getElementById('searchBtn');
const mealMenu = document.getElementById('hotMeal');
const mealDescription = document.querySelector('.mealDescription');
const crossBtn = document.getElementById('crossBtn');


searchBtn.addEventListener('click', mealFullMenu);
mealMenu.addEventListener('click', mealRecipes);
crossBtn.addEventListener('click', () => {
    mealDescription.parentElement.classList.remove('displayingRecipe');
});

// 2nd Phase
function mealFullMenu(){
    let searchingInput = document.getElementById('searchingInput').value.trim();
    //fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=`+`${searchingInput}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=` +`${searchingInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `<div class = "meal-items" data-id = "${meal.idMeal}">
                            <div class = "meal-images">
                                <img src = "${meal.strMealThumb}">
                            </div>

                            <div>
                            <h3>${meal.strMeal}</h3>
                            <a href = "" class = "recipe-btn">How to Prepare</a>
                            </div>

                        </div>`;
                        
            });
            mealMenu.classList.remove('invalid');
        }
        
         else{
            html = "Sorry, Invalid choosing. We have no meal what you've searched!";
            mealMenu.classList.add('invalid');
        }

        mealMenu.innerHTML = html;
    });
}

// 3rd Phase
function mealRecipes(choose){
    choose.preventDefault();
    if(choose.target.classList.contains('recipe-btn')){
        let mealOptions = choose.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=`+`${mealOptions.dataset.id}`)
        .then(response => response.json())
        .then(data => findRecipe(data.meals));
    }
}

// 4th Phase
function findRecipe(meal){
    meal = meal[0];

    let html = `<h1>${meal.strMeal}</h1>
        <h3>${meal.strCategory}</h3>
        <div>
            <div class = "meal-images">
                <img src = "${meal.strMealThumb}" alt = "">
            </div>
                <h2>Preparing Instructions:</h2>
                <br>
                <h3><li> ${meal.strInstructions}</li></h3>
        </div>`;
        
    mealDescription.innerHTML = html;
    mealDescription.parentElement.classList.add('displayingRecipe');
}