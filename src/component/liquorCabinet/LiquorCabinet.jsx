
import styles from "./LiquorCabinet.module.css";
import React, { useState } from 'react';
import { Cabinet } from "./Cabinet/Cabinet"
import { AllIncluded } from "./Static/AllIncluded"
import { MostIncluded } from "./Static/MostIncluded"
import { History } from "./Static/History"


export const LiquorCabinet = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient,
    allRecipeIng, setAllRecipeIng }) => {

    const [page, setPage] = useState(<AllIncluded/>);

    return (
        <>
            <div className={styles.cabinet}>
                <Cabinet allIngredient={allIngredient} setAllIngredient={setAllIngredient} ingredient={ingredient} setIngredient={setIngredient} />
            </div>

            <div className={styles.btnTapList}>
                <ul>
                    <li><button onClick={() => setPage(<AllIncluded/>)} className={styles.btnTap}>이걸로 만들 수 있는 애</button></li>
                    <li><button 
                    onClick={() =>setPage(<MostIncluded allRecipe={allRecipe} ingredient={ingredient} setIngredient={setIngredient} 
                        allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />)} 
                    className={styles.btnTap}>뭐 더 사보쉴? 이것도 됨~</button></li>
                    <li><button onClick={() => setPage(<History />)} className={styles.btnTap}>히스토리용</button></li>
                </ul>
            </div>
            <div className={styles.contentBox}>
                내용
                {page}
            </div>
        </>
    );
};