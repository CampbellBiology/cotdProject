

import styles from "./WikiPage.module.css";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { MainWiki } from "./MainWiki";

export const WikiPage = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {

  //1. 레시피 검색하는 부분


  //2. 레시피 리스트 보여주는 부분

  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    setRecipeList([...allRecipe])
  }, [allRecipe])
  console.log(recipeList)


  //3. 레시피 리스트 정렬
  const sortRecipeList = (type) => {
    const newRecipeList = [...recipeList];
    if (type === "recent") {
      newRecipeList.sort((a, b) => a.time_stamp - b.time_stamp);
      setRecipeList(newRecipeList);
    }
    else if (type === "like") {
      newRecipeList.sort((a, b) => b.recipe_like - a.recipe_like);
      setRecipeList(newRecipeList);
    }
    else if (type === "view") {
      newRecipeList.sort((a, b) => b.view_count - a.view_count);
      setRecipeList(newRecipeList);
    }
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}


    >

      {/* 3. 레시피 정렬 */}
      <div>
        <span className={styles.recipeTitle}> 주류 위키  !</span>
        <span className={styles.recent} onClick={() => sortRecipeList("recent")}>최신순</span>
        <span className={styles.like} onClick={() => sortRecipeList("like")}>인기순</span>
        <span className={styles.view} onClick={() => sortRecipeList("view")}>조회수순</span>
      </div>



      <div className={styles.flex_wrap}>
        {recipeList.map((item) => {
          return (<MainWiki recipe={item} key={item.recipe_index} allRecipe={allRecipe} setAllRecipe={setAllRecipe} />)
        }
        )}
      </div>
    </motion.div>
  );
};

