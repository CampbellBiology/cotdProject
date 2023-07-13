
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './component/main/Main';
<<<<<<< HEAD
import { Home } from './component/home/Home';
import { WikiPage } from './component/wiki/WikiPage';
=======
import { Home } from './component/main/Home';
import { Test2 } from './component/test2/Test2';
>>>>>>> f64be7bcd89e06d4c596b768b2b6bb6fac157856
import { Test3 } from './component/test3/Test3';
import { RecipeDetail } from './component/RecipeDetail/RecipeDetail';
import { LiquorCabinet } from './component/liquorCabinet/LiquorCabinet';
import { History } from './component/history/History';
import axios from 'axios';
import { Header } from './component/header/Header';

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

  //히스토리
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/getHistory").then((data) => {
      //history에 담기
      setHistory(data.data);
    });
  }, []);


  //히스토리
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/getHistory").then((data) => {
      //history에 담기
      setHistory(data.data);
    });
  }, []);



  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Main
          allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
<<<<<<< HEAD
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />}
          history={history} setHistory={setHistory} />
        <Route path="/home/*" element={<Home allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
          history={history} setHistory={setHistory} />} />
        <Route path="/test2" element={<WikiPage />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/recipe/:recipe_index" element={<RecipeDetail allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />} />
=======
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} 
          history={history} setHistory={setHistory}/>} />
        <Route path="/home/*" element={<Home allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} 
          history={history} setHistory={setHistory}/>} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
>>>>>>> f64be7bcd89e06d4c596b768b2b6bb6fac157856
        <Route path="/liquorCabinet" element={
          <LiquorCabinet
            allIngredient={allIngredient} setAllIngredient={setAllIngredient}
            allRecipe={allRecipe} setAllRecipe={setAllRecipe}
            ingredient={ingredient} setIngredient={setIngredient}
            allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
            history={history} setHistory={setHistory}
          />} />
        <Route path="/history" element={<History history={history} setHistory={setHistory} />} />

      </Routes>

    </div>
  );
}

export default App;