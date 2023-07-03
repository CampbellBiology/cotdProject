
import styles from "./LiquorCabinet.module.css";
import React, { useEffect, useState } from 'react';
import { Cabinet } from "./Cabinet/Cabinet"
import { AllIncluded } from "./Static/AllIncluded"
import { MostIncluded } from "./Static/MostIncluded"
import { History } from "./Static/History"
import axios from "axios";


export const LiquorCabinet = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient,
    allRecipeIng, setAllRecipeIng }) => {

    const [page, setPage] = useState(1);

    
  //히스토리
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/getHistory").then((data) => {
      //history에 담기
      setHistory(data.data);
    });
  }, []);


    const firstPage = <AllIncluded/>;
    const secondPage = <MostIncluded allRecipe={allRecipe} ingredient={ingredient} setIngredient={setIngredient} 
    allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
    history = {history}  setHistory = {setHistory} />;
    const thirdPage = <History history = {history}  setHistory = {setHistory} />;

    return (
        <>
            <div className={styles.cabinet}>
                <Cabinet allIngredient={allIngredient} setAllIngredient={setAllIngredient} ingredient={ingredient} setIngredient={setIngredient} />
            </div>

            <div className={styles.btnTapList}>
                <ul>
                    <li><button onClick={() => {setPage(1)}} className={styles.btnTap}>이걸로 만들 수 있는 애</button></li>
                    <li><button onClick={() => {setPage(2)}} className={styles.btnTap}>뭐 더 사보쉴? 이것도 됨~</button></li>
                    <li><button onClick={() => {setPage(3)}} className={styles.btnTap}>히스토리용</button></li>
                </ul>
            </div>
            <div className={styles.contentBox}>
                
                {(page === 1 ) ? firstPage : 
                    (page === 2) ? secondPage : thirdPage} 
            </div>
        </>
    );
};