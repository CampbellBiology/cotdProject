
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from 'react-router-dom';
import { WikiPage } from '../wiki/WikiPage';
import { RecipePage } from '../recipe/RecipePage';
import { LiquorCabinet } from '../liquorCabinet/LiquorCabinet';
import { History } from '../liquorCabinet/Static/History';

export const Main = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng, 
  history, setHistory }) => {

    const [searchTag, setSearchTag] = useState([]);
  
  return (
    <>

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
          <Route path="/wiki" element={<WikiPage allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />

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
          <Route path="/MyPage" element={<WikiPage allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />
        </Routes>
      </AnimatePresence>

    </>
  );
};

