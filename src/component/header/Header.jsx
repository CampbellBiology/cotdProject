
import styles from "./Header.module.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';



export const Header = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient, allRecipeIng, setAllRecipeIng }) => {

  const navigate = useNavigate();

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

      case 'history':
        navigate('/home/history')
        console.log('히스토리로 이동')
        break;

      case 'info':
        navigate('/home/info')
        console.log('마이페이지로 이동')
        break;

      default:
        return
    }

  }

  const goMain = () => {
    navigate('/')
    window.location.reload()
  }


  return (
    <>

      <div className={styles.sign}>
        <span>로그인</span>
        <span> ㅣ </span>
        <span>회원가입</span>
      </div>

      <div className={styles.header}>
        <div className={styles.logo} onClick={() => {goMain()}}>
          <img src="/logo.png" alt="logo" />
        </div>

        <div className={styles.search}>
          <img src="/SearchImg.png" alt="SearchImg" />
          <input className={styles.searchBar} placeholder='칵테일을 검색해요'>
          </input>
        </div>
      </div>


      {/* 4. 각 페이지 이동 */}
      <div className={styles.flexBox}>
        <div className={styles.recipeBtn} onClick={() => btnClick('recipe')} >
          <img src="/recipe.png" alt="recipe" />
        </div>

        <div className={styles.wikiBtn} onClick={() => btnClick('wiki')} >
          <img src="/wiki.png" alt="wiki" />
        </div>

        <div className={styles.cabinetBtn} onClick={() => btnClick('cabinet')} >
          <img src="/cabinet.png" alt="cabinet" />
        </div>

        <div className={styles.cabinetBtn} onClick={() => btnClick('history')} >
          <img src="/cabinet.png" alt="history" />
        </div>

        <div className={styles.infoBtn} onClick={() => btnClick('info')} >
          <img src="/info.png" alt="info" />
        </div>

      </div>

    </>
  );
};

