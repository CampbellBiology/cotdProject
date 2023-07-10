
import styles from "./Recipe.module.css";
import React, { useState } from 'react';
import { SearchRecipe } from './SearchRecipe';



export const Recipe = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {

    const [searchTag, setSearchTag] = useState([]);

    const deleteItem = (name) => {
        setSearchTag(searchTag.filter((item) => item.ingredient_name !== name))    
      };
    


    return (
        <>
            <div className={styles.recipeTitle}>레시피 검색</div>
            <div><ul>
                <li>최신순</li>
                <li>인기순</li>
                <li>조회수</li>
                <li>좋아요수</li>
            </ul></div>
            <div className={styles.SearchRecipe}>
                <SearchRecipe allIngredient={allIngredient} setAllIngredient={setAllIngredient}
                    allRecipe={allRecipe} setAllRecipe={setAllRecipe}
                    ingredient={ingredient} setIngredient={setIngredient}
                    allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
                    searchTag={searchTag} setSearchTag={setSearchTag} 
                    deleteItem = {deleteItem}/>
            </div>


            <div>
                전체리스트

                <div>{searchTag.map((item, i) => {
                    return (
                        <div></div>
                        // <Item searchTag={item} setSearchTag={setSearchTag} recipeNum={i} deleteItem={deleteItem} deleteItemDB={deleteItemDB} key={i} />
                    )
                })}</div>
            </div>

        </>
    );
};