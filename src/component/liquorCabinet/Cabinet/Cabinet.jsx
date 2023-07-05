

import styles from "../Cabinet/Cabinet.module.css";
import React from 'react';
import axios from 'axios';
import { SearchBox } from "./SearchBox"
import { Item } from "./Item"

export const Cabinet = ({ allIngredient, setAllIngredient, ingredient, setIngredient }) => {

  // const [ingredient, setIngredient] = useState([]);



  const user_id = "master";



  const deleteItem = (name) => {
    setIngredient(ingredient.filter((item) => item.ingredient_name !== name))

  };

  const deleteItemDB = (name) => {

    if (user_id !== null) {
      axios({
        url: "/api/itemDelete",
        method: 'post',
        data: { user_id: user_id, ingredient_name: name }
      })
        .then(function a(response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }


  return (
    <div className={styles.case}>
      <SearchBox ingredient={ingredient} setIngredient={setIngredient} allIngredient={allIngredient} setAllIngredient={setAllIngredient} />

      <div className = {styles.ingredient}>{
      ingredient.length === 0 ? <div>재료가 없네요</div> : <div>{ingredient.map((item, i) => {
          return (
            <Item ingredient={item} setIngredient={setIngredient} ingNum={i} deleteItem={deleteItem} deleteItemDB={deleteItemDB} key={i} />
          )
        })}</div>
      }</div>

    </div>
  );
};