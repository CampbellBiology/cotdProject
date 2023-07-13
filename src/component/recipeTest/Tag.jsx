
import styles from "./Tag.module.css";
import React from 'react';


export const Tag = ({ searchTag, setSearchTag, recipeNum, deleteItem, deleteItemDB }) => {


    return (
        <>
            <div className={styles.itemBackground} >
                <div className={styles.name}>{searchTag.ingredient_name}</div>
                <button className={styles.deleteBtn} onClick={() => { deleteItem(searchTag.ingredient_name);  } }> 삭제
                 </button>
            </div>

        </>
    );
};