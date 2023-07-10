
import axios from "axios";
import styles from "./Recipe.module.css";
import React from 'react';

export const Recipe = ({ allRecipe, allRecipeIng, priorityNumber, recommendedRecipe, ingredient, history, setHistory }) => {


    //recommendedRecipe[priorityNumber][0]는 이 컴포넌트가 받은 레시피 번호
    //배열의 인덱스와 맞춰주기 위해 -1 해서 사용함
    const recipeIndex = recommendedRecipe[priorityNumber][0] - 1;

    //모든 레시피-재료에서 해당 레시피 번호와 일치하는 재료 모두 가져옴
    //EX. 이 Recipe 컴포넌트가 전체 레시피 중 4번 레시피(롱티)에 해당하는 내용을 보여준다고 할 때,
    //filteredRecipeIng는 allRecipeIng에서 recipe_index = "4"인 재료를 모두 가져옴
    //보드카, 진, 럼, 데킬라, 콜라, 오렌지 리큐르 등등...
    const filteredRecipeIng = allRecipeIng.filter((item) =>
        item.recipe_index === recommendedRecipe[priorityNumber][0]);

    //console.log(filteredRecipeIng);

    const user_id = "master";

    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);

    let timeString = year + '-' + month + '-' + day + " " + hours + ':' + minutes + ':' + seconds;

    console.log(timeString);

    const addHistory = () => {

        //setHistory
        const newHistory = {
            user_id: user_id, cocktail_name: allRecipe[recipeIndex].cocktail_name, img_path: allRecipe[recipeIndex].img_path, createdAt: timeString
        }

        setHistory([newHistory, ...history])

        console.log(history)

        //DB에 넣기
        if (user_id !== null) {
            axios({
                url: "/api/historyAdd",
                method: 'post',
                data: { user_id: user_id, cocktail_name: allRecipe[recipeIndex].cocktail_name, img_path: allRecipe[recipeIndex].img_path, createdAt: timeString }
            })
                .then(function a(response) {
                    console.log(response)
                    alert('히스토리에 "' + allRecipe[recipeIndex].cocktail_name + '"가 추가되었어요')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

console.log(allRecipe)

    return (
        <div className={styles.background}>
            <div className={styles.photoCase}>
                <div className={styles.photo}> <img style={{ width: '50px' }} src={allRecipe[recipeIndex].img_path} alt={allRecipe[recipeIndex].cocktail_name}></img> </div>
                <div>{allRecipe[recipeIndex].cocktail_name}</div>
                <div className={styles.likes}>♥ {allRecipe[recipeIndex].recipe_like}</div>
            </div>

            <div>
                레시피 번호: {recommendedRecipe[priorityNumber][0]} <br></br>   {/* 번호 나중에 지워도 됨 */}
                재료:

                {/* filteredRecipeIng의 길이만큼 <div>를 생성 */}
                {filteredRecipeIng.map((item) => {

                    // 현재 가진 재료와 같은 것이 있는지 필터
                    const isMatch = ingredient.filter((compareItem) => compareItem.ingredient_name === item.ingredient_name);
                    //console.log(isMatch)

                    //같은 재료가 있으면 length = 1, 없으면 length = 0
                    //각각 빨간색과 검은색 글씨로 표현, 다른 스타일 적용 바람
                    return {
                        ...isMatch.length === 0 ? <div key={item.ingredient_name} className={styles.filteredRecipeIng1}>{item.ingredient_name}</div>
                            : <div key={item.ingredient_name} className={styles.filteredRecipeIng2}>{item.ingredient_name}</div>
                    }

                })}
            </div>
            <div className={styles.recipeContents}>
                <div className={styles.ingredients}>재료: </div>
                <div className={styles.method}>만드는 법: {allRecipe[recipeIndex].method}</div>
                {/* History 갱신 */}
                <button onClick={() => { addHistory() }}> 오늘 먹을래! </button>
            </div>
        </div>
    );
};