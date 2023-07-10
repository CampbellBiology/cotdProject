
import styles from "./Main.module.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainRecipe } from './MainRecipe';
import { Recipe } from '../recipe/Recipe';


export const Main = ({ allIngredient, setAllIngredient, allRecipe , setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {





  const navigate = useNavigate();


  return (
    <>


      <div className={styles.sign}>
        <span>로그인</span>
        <span> ㅣ </span>
        <span>회원가입</span>
      </div>

      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>

        <div className={styles.search}>
          <input placeholder='칵테일 또는 재료를 검색하세요' className={styles.searchBar}>
          </input>
        </div>
      </div>


      <div className={styles.flexBox}>
        <div className={styles.recipeBtn}>
          <img src="/1.png" alt="recipe" />
        </div>

        <div className={styles.wikiBtn}>
          <img src="/2.png" alt="wiki" />
        </div>

        <div className={styles.cabinetBtn}  onClick={()=>{navigate('/liquorCabinet')}}>
          <img src="/3.png" alt="cabinet" />
        </div>

        <div className={styles.infoBtn}>
          <img src="/4.png" alt="info" />
        </div>

      </div>

      <div>
        레시피 검색!
      </div>

      <div>
        <Recipe allIngredient={allIngredient} setAllIngredient={setAllIngredient}
                        allRecipe={allRecipe} setAllRecipe={setAllRecipe}
                        ingredient={ingredient} setIngredient={setIngredient}
                        allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />
      </div>



      <div className={styles.flex_wrap}>
        {allRecipe.map((item) => {
          return (<MainRecipe recipe={item} key={item.recipe_index} allRecipe={allRecipe} setAllRecipe={setAllRecipe} />)
        }
        )}
      </div>


    </>
  );
};

