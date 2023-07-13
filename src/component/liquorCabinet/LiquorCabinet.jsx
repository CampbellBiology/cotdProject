
import styles from "./LiquorCabinet.module.css";
import React from 'react';
import { Cabinet } from "./Cabinet/Cabinet"
import { MostIncluded } from "./Static/MostIncluded"


export const LiquorCabinet = ({ allIngredient, setAllIngredient, allRecipe, setAllRecipe, ingredient, setIngredient,
    allRecipeIng, setAllRecipeIng, history, setHistory }) => {

   // const [page, setPage] = useState(1);


    //히스토리
    // const [history, setHistory] = useState([]);

    // useEffect(() => {
    //     axios.get("/api/getHistory").then((data) => {
    //         //history에 담기
    //         setHistory(data.data);
    //     });
    // }, []);



    // const firstPage = <MostIncluded allRecipe={allRecipe} ingredient={ingredient} setIngredient={setIngredient}
    //     allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
    //     history={history} setHistory={setHistory} />;
    // const secondPage = <History history={history} setHistory={setHistory} />;

    return (
        <>
            <div className={styles.cabinet}>
                <Cabinet allIngredient={allIngredient} setAllIngredient={setAllIngredient} ingredient={ingredient} setIngredient={setIngredient} />
            </div>

            <div className={styles.btnTapList}>
                {/* <ul>
                    <li><button onClick={() => {setPage(1)}} className={styles.btnTap}>뭐 더 사보쉴? 이것도 됨~</button></li>
                    //<li><button onClick={() => {setPage(2)}} className={styles.btnTap}>히스토리용</button></li>
                </ul> */}
            </div>
            <div className={styles.contentBox}>
                <MostIncluded allRecipe={allRecipe} ingredient={ingredient} setIngredient={setIngredient}
                    allRecipeIng={allRecipeIng} setAllRecipeIng={setAllRecipeIng}
                    history={history} setHistory={setHistory} />;

                {/* {(page === 1 ) ? firstPage : secondPage}  */}
            </div>
        </>
    );
};