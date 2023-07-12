
import { MainRecipe } from "./MainRecipe";
import styles from "./RecipePage.module.css";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { SearchRecipe } from './SearchRecipe';


export const RecipePage = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng, searchTag, setSearchTag }) => {

  //1. 레시피 검색하는 부분
  //const [searchTag, setSearchTag] = useState([]);
  //const [TagNames, setTagNames] = useState([]);


  //1-1. 레시피 재료 태그 삭제
  const deleteItem = (name) => {
    setSearchTag(searchTag.filter((item) => item.ingredient_name !== name))
  };

  //1-2. searchTag(재료 리스트)에 따라 달라시는 recipeList
  //Cabinet의 MostIncluded와 동일
  //const [filteredItems, setFilteredItems] = useState([]);



  //2. 레시피 리스트 보여주는 부분

  const [recipeList, setRecipeList] = useState([]);


  // useEffect(() => {
  //   setRecipeList([...allRecipe])

  // }, [allRecipe]);

  // const newList = (newTag) => {
  //   console.log(newTag)

  //   let filteredIng = allRecipeIng.filter((item) => item.ingredient_name === newTag.ingredient_name);
  //   console.log(filteredIng)
  //   //let filterRecipe = allRecipe.filter((item) => item.recipe_index === filteredIng.recipe_index);

  //   const filterRecipe = filteredIng.map((item) => {
  //     const filtered = allRecipe.filter((compareItem) => item.recipe_index === compareItem.recipe_index);
  //     console.log(filtered)
  //     return filtered
  //   })

  //   console.log(allRecipe)
  //   console.log(filterRecipe)

  //   //2차원 배열 1차원으로 만들기
  //   let to1chawon = [];
  //   filterRecipe.filter((item) => item.length !== 0).forEach((element) => {
  //     to1chawon = to1chawon.concat(element);
  //   })

  //   console.log(to1chawon);


  //   setRecipeList(to1chawon);
  // }




  useEffect(() => {
    console.log(searchTag)

    if (searchTag.length === 0) {
      setRecipeList([...allRecipe])
    } else {

      //searchTag가 1개 이상일 때 searchTag의 재료명과 allRecipeIng의 재료를 비교
      const filteredRecipeIng = searchTag.map((item) => {
        const filtered = allRecipeIng.filter((compareItem) => item.ingredient_name === compareItem.ingredient_name);
        console.log(filtered)
        return filtered
      });

      //2차원 배열이므로 1차원으로 변경
      let IngTo1chawon = [];
      filteredRecipeIng.filter((item) => item.length !== 0).forEach((element) => {
        IngTo1chawon = IngTo1chawon.concat(element);
      })
      console.log(IngTo1chawon);

      //걸러진 RecipeIng들을 recipeIndex로 비교해 searchTag에 해당하는 재료를 가진 recipe를 찾아냄
      const filterRecipe = IngTo1chawon.map((item) => {
        const filteredRec = allRecipe.filter((compareItem) => item.recipe_index === compareItem.recipe_index);
        console.log(filteredRec)
        return filteredRec
      })

      console.log(filterRecipe);

      //2차원 배열이므로 1차원으로 변경
      let RecipeTo1chawon = [];
      filterRecipe.filter((item) => item.length !== 0).forEach((element) => {
        RecipeTo1chawon = RecipeTo1chawon.concat(element);
      })
      console.log(RecipeTo1chawon);

      //1차원 배열의 레시피 인덱스만 뽑아내기 => ['32', '4', '6', '7', '17', '18', '19', '14', '16', '37', '7', '5', '9', '10', '14']와 같이 나옴
      let result = [];
      RecipeTo1chawon.map((item) =>
        result = [...result, item.recipe_index]
      );

      console.log(result);

      //많이 중복된 순으로 정렬하기
      const result2 = result.reduce((accu, curr) => {
        accu[curr] = (accu[curr] || 0) + 1;
        return accu;
      }, {});

      console.log(result2)


      //오브젝트를 내림차순으로 정렬한 배열
      let ArrRecipe = Object.entries(result2).sort(([, a], [, b]) => b - a);
      console.log(ArrRecipe);
      console.log(ArrRecipe[0]);

      //레시피 인덱스 정렬했고 그 레시피 인덱스 배열대로 레시피 찾아내야함
      const filteredArrRecipe = ArrRecipe.map((item) => {
        const filteredRec = allRecipe.filter((compareItem) => item[0] === compareItem.recipe_index);
        console.log(filteredRec)
        return filteredRec
      })

      console.log(filteredArrRecipe)

            //2차원 배열이므로 1차원으로 변경 3트째
            let ArrRecipeTo1chawon = [];
            filteredArrRecipe.forEach((element) => {
              ArrRecipeTo1chawon = ArrRecipeTo1chawon.concat(element);
            })
            console.log(ArrRecipeTo1chawon);

      setRecipeList(ArrRecipeTo1chawon);
    }

  }, [allRecipe, searchTag, allRecipeIng])



  //3. 레시피 리스트 정렬
  const sortRecipeList = (type) => {
    const newRecipeList = [...recipeList];
    if (type === "recent") {
      newRecipeList.sort((a, b) => a.recipe_index - b.recipe_index);
      setRecipeList(newRecipeList);
    }
    else if (type === "like") {
      newRecipeList.sort((a, b) => b.recipe_like - a.recipe_like);
      setRecipeList(newRecipeList);
    }
    else if (type === "view") {
      newRecipeList.sort((a, b) => b.view_count - a.view_count);
      setRecipeList(newRecipeList);
    }
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}


    >

      {/* 3. 레시피 정렬 */}
      <div>
        <span className={styles.recipeTitle}>레시피 검색!</span>
        <span className={styles.recent} onClick={() => sortRecipeList("recent")}>최신순</span>
        <span className={styles.like} onClick={() => sortRecipeList("like")}>인기순</span>
        <span className={styles.view} onClick={() => sortRecipeList("view")}>조회수순</span>
      </div>



      {/* 1. 레시피 검색창 및 재료 태그 */}
      <div className={styles.SearchRecipe}>
        <SearchRecipe allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
          searchTag={searchTag} setSearchTag={setSearchTag}
          deleteItem={deleteItem}
          recipeList={recipeList} setRecipeList={setRecipeList}
        />
      </div>

      {/* 2. 레시피 리스트 */}
      <div className={styles.flex_wrap}>
        {recipeList.map((item) => {
          return (<MainRecipe recipe={item} searchTag = {searchTag} allRecipe={allRecipe} allRecipeIng={allRecipeIng} key={item.recipe_index}/>)
        }
        )}
      </div>
    </motion.div>
  );
};

