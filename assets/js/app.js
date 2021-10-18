const searchBtn = document.querySelector("#search-btn");
const mealList = document.querySelector("#meal");
const mealDetailContent = document.querySelector(".meal-details-content");
const recipeBtn = document.querySelector("#recipe-close-btn");

// console.log(searchBtn);

searchBtn.addEventListener("click", getMealList);
// searchBtn.addEventListener("click", () => {
//     alert(1)
// });
mealList.addEventListener("click", getMealRecipe);
recipeBtn.addEventListener("click", () => {
  mealDetailContent.parentElement.classList.remove("show-recipe");
});

window.addEventListener("scroll", () => {
  let scroll = document.querySelector(".scroll-top");
  scroll.classList.toggle("active", window.scrollY > 500);
  // console.log(scroll)
});

function getMealList() {
  let searchInputTxt = document.querySelector("#search-input").value.trim();

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                        <div class="meal-item" data-id = '${meal.idMeal}'>
							<div class="meal-img">
								<img src='${meal.strMealThumb}' alt="food" />
							</div>
							<div class="meal-name">
								<h3>${meal.strMeal}</h3>
								<a href="#" class="recipe-btn">Get recipe</a>
						    </div>
						</div>
                    `;
        });
        mealList.classList.remove("notfound");
      } else {
        html = "We didn't find any meal";
        mealList.classList.add("notfound");
      }

      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];

  let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
		<p class="recipe-category">${meal.strCategory}</p>
		<div class="recipe-instruct">
			<h3>Instructions</h3>
			<p>${meal.strInstructions}</p>
		</div>
		<div class="recipe-meal-img">
			<img src="${meal.strMealThumb}" />
		</div>
		<div class="recipe-link">
			<a href="${meal.strYoutube}" target="_blank">Watch Video</a>
		</div>
    `;
  mealDetailContent.innerHTML = html;
  mealDetailContent.parentElement.classList.add("show-recipe");
}
