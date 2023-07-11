import React from "react";
import styles from "./MainRecipe.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MainRecipe = ({ recipe }) => {


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
