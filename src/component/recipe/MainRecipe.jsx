import React from "react";
import styles from "./MainRecipe.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MainRecipe = ({ recipe, searchTag, allRecipe, allRecipeIng }) => {

  const allIngredient = allRecipeIng.filter((item) => item.recipe_index === recipe.recipe_index);
 // console.log(allIngredient)

  //searchTag와 allIngredient 재료 비교, 같은 거 뽑아내기
  const matchedIngredient = searchTag.map((item) => {
    const Ingredient = allIngredient.filter((compareItem) => item.ingredient_name === compareItem.ingredient_name);
    return Ingredient
  })

 // console.log(matchedIngredient)

  //2차원 배열이므로 1차원으로 변경
  let IngredientList = [];
  matchedIngredient.forEach((element) => {
    IngredientList = IngredientList.concat(element);
  })
 // console.log(IngredientList);

 //console.log(allRecipeIng)

const getColor = (category) => {

  let result = ""

  switch (category) {

    case '보드카' :
    case '진' :
    case '럼' :
    case '데킬라' :
    case '위스키' : 
    case '브랜디' :
    case '맥주' : 
    case '와인' : 
    case '일본주' :
    case '전통주':

      result = styles.Spirit
      break;

    case '리큐르':

    result = styles.Liqueur
      break;

    case '과일' :
    case '민트' :
    case '부재료' :
    case '비터' :
    case '얼음':

    result = styles.SubIngredient
      break;

    case '음료' :
    case '쥬스':

    result = styles.Drink
      break;

    default:
      result = styles.else
  }
  return result;
}



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
        return <div className={getColor(item.ingredient_category)}> {item.ingredient_name} </div> })}



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
