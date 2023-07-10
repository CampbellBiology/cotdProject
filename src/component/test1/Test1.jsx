
import React from 'react';
import styles from './test1.module.css'
import { SearchBox } from "./SearchBox"


export const Test1 = ({ingredient, setAllIngredient, allIngredient, setIngredient}) => {

  console.log("testt11111")

  return (

    <div className={styles.styleTest}>
      <div className={styles.case}>
      <SearchBox ingredient={ingredient} setIngredient={setIngredient} allIngredient={allIngredient} setAllIngredient={setAllIngredient} />
      </div>
    </div>
  );
};

