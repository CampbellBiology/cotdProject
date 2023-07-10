import React from "react";
import styles from "./MainRecipe.module.css";
import { Link } from "react-router-dom";

export const MainRecipe = ({ recipe }) => {


  return (
    <div className={styles.recipe}>
      <Link to={`/recipe/${recipe.recipe_index}`}>
        <div className={styles.recipe_image}>
          <img src={recipe.img_path} alt="demo" />
        </div>


        <div className={styles.recipe_name}>
          <span>{recipe.cocktail_name}</span>
        </div>
      </Link>

    </div>
  );
};
