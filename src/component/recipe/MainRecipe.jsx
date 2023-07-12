import React from "react";
import styles from "./MainRecipe.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MainRecipe = ({ recipe, searchTag, allRecipe, allRecipeIng }) => {

  const allIngredient = allRecipeIng.filter((item) => item.recipe_index === recipe.recipe_index);
  console.log(allIngredient)

  //searchTag와 allIngredient 재료 비교, 같은 거 뽑아내기
  const matchedIngredient = searchTag.map((item) => {
    const Ingredient = allIngredient.filter((compareItem) => item.ingredient_name === compareItem.ingredient_name);
    return Ingredient
  })

  console.log(matchedIngredient)

  //2차원 배열이므로 1차원으로 변경
  let IngredientList = [];
  matchedIngredient.forEach((element) => {
    IngredientList = IngredientList.concat(element);
  })
  console.log(IngredientList);


  return (

    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.recipe}>
        <Link to={`/recipe/${recipe.recipe_index}`}>
          <div className={styles.recipe_image}>
            <img src={recipe.img_path} alt="demo" />
          </div>

          {IngredientList.map((item) => {
        return <div>{item.ingredient_name}</div>})}



          <div>
            <span className={styles.recipe_name}>{recipe.cocktail_name}</span>
          </div>

          <div className={styles.recipe_method}>
            <span>{recipe.method}</span>
          </div>
        </Link>

      </div>

    </motion.div>
  );
};
