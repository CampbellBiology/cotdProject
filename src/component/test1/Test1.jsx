
import styles from "./test1.module.css";
import React from 'react';
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Test2 } from '../test2/Test2';
import { RecipePage } from '../recipe/RecipePage';
import { LiquorCabinet } from '../liquorCabinet/LiquorCabinet';
import { Test4 } from '../test4/Test4';


export const Test1 = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {

  const navigate = useNavigate();


  // //1. 레시피 검색하는 부분
  // const [searchTag, setSearchTag] = useState([]);
  // console.log(searchTag)

  // //1-1. 레시피 재료 태그 삭제
  // const deleteItem = (name) => {
  //   setSearchTag(searchTag.filter((item) => item.ingredient_name !== name))
  // };

  //2. 레시피 리스트 보여주는 부분

  // const [recipeList, setRecipeList] = useState([]);

  // useEffect(() => {
  //   setRecipeList([...allRecipe])
  // }, [allRecipe])
  // console.log(recipeList)

  // //1-2. searchTag(재료 리스트)에 따라 달라시는 recipeList
  // //Cabinet의 MostIncluded와 동일
  // const [filteredItems, setFilteredItems] = useState([]);

  // const TmpRecipeList = () => {
  //   //searchTag에 의한 정렬
  // }



  //3. 레시피 리스트 정렬
  // const sortRecipeList = (type) => {
  //   const newRecipeList = [...recipeList];
  //   if (type === "recent") {
  //     newRecipeList.sort((a, b) => a.time_stamp - b.time_stamp);
  //     setRecipeList(newRecipeList);
  //   }
  //   else if (type === "like") {
  //     newRecipeList.sort((a, b) => b.recipe_like - a.recipe_like);
  //     setRecipeList(newRecipeList);
  //   }
  //   else if (type === "view") {
  //     newRecipeList.sort((a, b) => b.view_count - a.view_count);
  //     setRecipeList(newRecipeList);
  //   }
  // }


  //4. 페이지 이동
  const btnClick = (e) => {

    switch (e) {
      case 'recipe':
        navigate('/home/recipe')
        console.log('레시피로 이동')
        break;

      case 'wiki':
        navigate('/home/wiki')
        console.log('위키로 이동')
        break;

      case 'cabinet':
        navigate('/home/cabinet')
        console.log('술장으로 이동')
        break;

      case 'info':
        navigate('/home/mypage')
        console.log('마이페이지로 이동')
        break;

      default:
        return
    }

  }


  return (
    <>

      <div className={styles.sign}>
        <span>로그인</span>
        <span> ㅣ </span>
        <span>회원가입</span>
      </div>

      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>

        <div className={styles.search}>
          <img src="/SearchImg.png" alt="SearchImg" />
          <input className={styles.searchBar} placeholder='칵테일 또는 재료를 검색하세요'>
          </input>
        </div>
      </div>


      {/* 4. 각 페이지 이동 */}
      <div className={styles.flexBox}>
        <div className={styles.recipeBtn} onClick={() => btnClick('recipe')} >
          <img src="/1.png" alt="recipe" />
        </div>

        <div className={styles.wikiBtn} onClick={() => btnClick('wiki')} >
          <img src="/2.png" alt="wiki" />
        </div>

        <div className={styles.cabinetBtn} onClick={() => btnClick('cabinet')} >
          <img src="/3.png" alt="cabinet" />
        </div>

        <div className={styles.infoBtn} onClick={() => btnClick('info')} >
          <img src="/4.png" alt="info" />
        </div>

      </div>

      {/* 3. 레시피 정렬 */}
      {/* <div className={styles.recipeTitle}>레시피 검색!</div>
      <div id={styles.filter}>
        <span id={styles.recent} onClick={() => sortRecipeList("recent")}>최신순</span>
        <span id={styles.row} onClick={() => sortRecipeList("like")}>인기순</span>
        <span id={styles.high} onClick={() => sortRecipeList("view")}>조회수순</span>
      </div> */}


      {/* 1. 레시피 검색창 및 재료 태그 */}
      {/* <div className={styles.SearchRecipe}>
        <SearchRecipe allIngredient={allIngredient} setAllIngredient={setAllIngredient}
          allRecipe={allRecipe} setAllRecipe={setAllRecipe}
          ingredient={ingredient} setIngredient={setIngredient}
          allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
          searchTag={searchTag} setSearchTag={setSearchTag}
          deleteItem={deleteItem}
          recipeList={recipeList} setRecipeList={setRecipeList}
          TmpRecipeList={TmpRecipeList}
        />
      </div> */}


      {/* 2. 검색에 따라 바뀌는 레시피 리스트 */}
      {/* <div className={styles.flex_wrap}>
        {recipeList.map((item, i) => {
          return (<MainRecipe recipe={item} allRecipe={allRecipe} setAllRecipe={setAllRecipe} key={i} />)
        }
        )}
      </div> */}


<AnimatePresence>
        <Routes>
          {/* 1- RecipePage */}
          <Route path="/recipe" element={<RecipePage 
                        allIngredient={allIngredient} setAllIngredient={setAllIngredient}
                        allRecipe={allRecipe} setAllRecipe={setAllRecipe}
                        ingredient={ingredient} setIngredient={setIngredient}
                        allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng} />} />
          {/* 2- Wiki */}
          <Route path="/wiki" element={<Test2 allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />
          
          {/* 3- LiquorCabinet */}
          <Route path="/cabinet" element={
            <LiquorCabinet
              allIngredient={allIngredient} setAllIngredient={setAllIngredient}
              allRecipe={allRecipe} setAllRecipe={setAllRecipe}
              ingredient={ingredient} setIngredient={setIngredient}
              allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
            />} />

          {/* 4- MyPage */}
          <Route path="/mypage" element={<Test4 allRecipe={allRecipe} setAllRecipe={setAllRecipe} />} />
        </Routes>
      </AnimatePresence>

    </>
  );
};

