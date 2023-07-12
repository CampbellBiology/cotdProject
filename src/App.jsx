
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './component/main/Main';
import { Home } from './component/main/Home';
import { Test2 } from './component/test2/Test2';
import { Test3 } from './component/test3/Test3';
import { Test4 } from './component/test4/Test4';
import { LiquorCabinet } from './component/liquorCabinet/LiquorCabinet';
import axios from 'axios';


function App() {

  const user_id = "master";

  //모든 재료 가져오기
  const [allIngredient, setAllIngredient] = useState([]);

  useEffect(() => {
    axios.get("/api/getAllIngredient").then((data) => {
      setAllIngredient(data.data);
    });
  }, []);


  //모든 레시피 가져오기
  const [allRecipe, setAllRecipe] = useState([]);

  useEffect(() => {
    axios.get("/api/getAllRecipe").then((data) => {
      //allRecipe에 담기
      setAllRecipe(data.data);
    });
  }, []);


  //모든 레시피-재료 가져오기
  const [allRecipeIng, setAllRecipeIng] = useState([]);

  useEffect(() => {
    axios.get("/api/getAllRecipeIngredient").then((data) => {
      //allRecipeIng에 담기
      setAllRecipeIng(data.data);
    });
  }, []);

  //console.log(allRecipeIng)




  //내 술장에 있는 재료
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    if (user_id !== null) {
      axios({
        url: "/api/item",
        method: 'post',
        data: { user_id: user_id }
      })
        .then(function a(response) {
          //console.log(response)
          setIngredient(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [setIngredient]);


  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<Main
          allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />} />
        <Route path="/home/*" element={<Home allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/liquorCabinet" element={
          <LiquorCabinet
            allIngredient={allIngredient} setAllIngredient={setAllIngredient}
            allRecipe={allRecipe} setAllRecipe={setAllRecipe}
            ingredient={ingredient} setIngredient={setIngredient}
            allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
          />} />

      </Routes>

    </div>
  );
}

export default App;