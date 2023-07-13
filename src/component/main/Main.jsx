
import styles from "./Main.module.css";
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Test2 } from '../test2/Test2';
import { RecipePage } from '../recipe/RecipePage';
import { LiquorCabinet } from '../liquorCabinet/LiquorCabinet';
import { History } from '../history/History';
import { Test4 } from '../test4/Test4';


export const Main = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng,
  history, setHistory }) => {

  const navigate = useNavigate();

  const [searchTag, setSearchTag] = useState([]);

  // 페이지 이동
  const btnClick = (e) => {

    switch (e) {
      case 'recipe':
        navigate('/home/recipe')
        console.log('레시피로 이동')
        break;

      case 'wiki':
        navigate('/home/wiki')
        console.log('위키로 이동')
        break;

      case 'cabinet':
        navigate('/home/cabinet')
        console.log('술장으로 이동')
        break;

      case 'history':
        navigate('/home/history')
        console.log('히스토리로 이동')
        break;

      case 'info':
        navigate('/home/mypage')
        console.log('마이페이지로 이동')
        break;

      default:
        return
    }

  }


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
          <img src="/SearchImg.png" alt="SearchImg" />
          <input className={styles.searchBar} placeholder='칵테일 또는 재료를 검색하세요'>
          </input>
        </div>
      </div>


      {/* 페이지 이동 */}
      <div className={styles.flexBox}>
        <div className={styles.recipeBtn} onClick={() => btnClick('recipe')} >
          <img src="/1.png" alt="recipe" />
        </div>

        <div className={styles.wikiBtn} onClick={() => btnClick('wiki')} >
          <img src="/2.png" alt="wiki" />
        </div>

        <div className={styles.cabinetBtn} onClick={() => btnClick('cabinet')} >
          <img src="/3.png" alt="cabinet" />
        </div>

        <div className={styles.cabinetBtn} onClick={() => btnClick('history')} >
          <img src="/4.png" alt="history" />
        </div>

        <div className={styles.infoBtn} onClick={() => btnClick('info')} >
          <img src="/5.png" alt="info" />
        </div>

      </div>


      <AnimatePresence>
        <Routes>
          {/* 1- RecipePage */}
          <Route path="/" element={<RecipePage
            allIngredient={allIngredient} setAllIngredient={setAllIngredient}
            allRecipe={allRecipe} setAllRecipe={setAllRecipe}
            ingredient={ingredient} setIngredient={setIngredient}
            allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
            searchTag={searchTag} setSearchTag={setSearchTag} />} />
          {/* 2- Wiki */}
          <Route path="/wiki" element={<Test2 allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />

          {/* 3- LiquorCabinet */}
          <Route path="/cabinet" element={
            <LiquorCabinet
              allIngredient={allIngredient} setAllIngredient={setAllIngredient}
              allRecipe={allRecipe} setAllRecipe={setAllRecipe}
              ingredient={ingredient} setIngredient={setIngredient}
              allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
            />} />

          {/* 4- History */}
          <Route path="/history" element={<History history={history} setHistory={setHistory} />} />

          {/* 5- MyPage */}
          <Route path="/mypage" element={<Test4 allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />
        </Routes>
      </AnimatePresence>

    </>
  );
};

