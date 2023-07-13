
import { useParams } from "react-router-dom";
import styles from "./RecipeDetail.module.css";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export const RecipeDetail = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient,
  allRecipeIng, setAllRecipeIng }) => {

  const { recipe_index } = useParams();

  const [detail, setDetail] = useState({});


  useEffect(() => {
    const filteredRecipe = allRecipe.filter((item) => item.recipe_index === recipe_index);
    setDetail(filteredRecipe[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              <img src={detail.img_path} alt={detail.cocktail_name} />
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{detail.time_stamp}</p>
              <p className={styles.product_name}>{detail.cocktail_name}</p>
              <span className={styles.price}>
                Tip : {detail.tip}
                <span className={styles.unit}>팁?</span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>좋아요 / 싫어요</p>
            </div>

          </section>
        </main>
      </motion.div>



    </>
  );
};

