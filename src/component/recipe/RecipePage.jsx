
import { MainRecipe } from "./MainRecipe";
import styles from "./RecipePage.module.css";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { SearchRecipe } from './SearchRecipe';


export const RecipePage = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {

  //1. 레시피 검색하는 부분
  const [searchTag, setSearchTag] = useState([]);
  console.log(searchTag)

  //1-1. 레시피 재료 태그 삭제
  const deleteItem = (name) => {
    setSearchTag(searchTag.filter((item) => item.ingredient_name !== name))
  };

  //1-2. searchTag(재료 리스트)에 따라 달라시는 recipeList
  //Cabinet의 MostIncluded와 동일
  //const [filteredItems, setFilteredItems] = useState([]);

  const TmpRecipeList = () => {
    //searchTag에 의한 정렬
  }


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
        <span className={styles.recipeTitle}>레시피 검색!</span>
        <span className={styles.recent} onClick={() => sortRecipeList("recent")}>최신순</span>
        <span className={styles.like} onClick={() => sortRecipeList("like")}>인기순</span>
        <span className={styles.view} onClick={() => sortRecipeList("view")}>조회수순</span>
      </div>



      {/* 1. 레시피 검색창 및 재료 태그 */}
      <div className={styles.SearchRecipe}>
        <SearchRecipe allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
          searchTag={searchTag} setSearchTag={setSearchTag}
          deleteItem={deleteItem}
          recipeList={recipeList} setRecipeList={setRecipeList}
          TmpRecipeList={TmpRecipeList}
        />
      </div>

      <div className={styles.flex_wrap}>
        {recipeList.map((item) => {
          return (<MainRecipe recipe={item} key={item.recipe_index} allRecipe={allRecipe} setAllRecipe={setAllRecipe} />)
        }
        )}
      </div>
    </motion.div>
  );
};

