
import styles from "./MostIncluded.module.css";
import React, { useEffect, useState } from 'react';
import { Recipe } from "./Recipe";


export const MostIncluded = ({ allRecipe, ingredient, allRecipeIng, setAllRecipeIng, history, setHistory}) => {


    const [filteredItems, setFilteredItems] = useState([]);
    const [recommendedRecipe, setRecommendedRecipe] = useState([]);


    //레시피-재료 테이블과 내가 가진 재료 비교해서 내가 가진 재료와 일치한 레시피-재료 테이블 뽑기
    //추후 레시피-재료 테이블의 ingredient_index를 가진 recipe를 가져오기 위함임
    //map과 filter를 혼용해서 결과가 2차원 배열로 나옴

    useEffect(() => {

        const filteredItems123 = ingredient.map((item) => {
            const filtered = allRecipeIng.filter((compareItem) => item.ingredient_name === compareItem.ingredient_name);
            return filtered
        });

        setFilteredItems(filteredItems123.filter((item) => item.length !== 0));

        console.log(filteredItems)
// eslint-disable-next-line
    }, [ingredient, allRecipeIng]);

        //  console.log(filteredItems[0][0].recipe_index)

        useEffect(() => {

        //2차원 배열 1차원으로 만들기
        let to1chawon = [];
        filteredItems.forEach((element) => {
            to1chawon = to1chawon.concat(element);
        })

        console.log(to1chawon);

        //1차원 배열의 레시피 인덱스만 뽑아내기 => ['32', '4', '6', '7', '17', '18', '19', '14', '16', '37', '7', '5', '9', '10', '14']와 같이 나옴
        let result = [];
        to1chawon.map((item) => 
            result = [...result, item.recipe_index]
        );

        console.log(result);

        //많이 중복된 순으로 정렬하기
        //중복된 인덱스를 가진 레시피는 내 술장에 있는 재료를 많이 포함한 레시피가 됨

        //각 인덱스별로 카운트한 오브젝트, 
        const result2 = result.reduce((accu, curr) => {
            accu[curr] = (accu[curr] || 0) + 1;
            return accu;
        }, {});

        console.log(result2)
    


        //오브젝트를 내림차순으로 정렬한 배열
        //앞에 있는 레시피인덱스일수록 내가 가진 재료와 많이 겹치는 레시피임
        //console.log(test);['5', 2], ['9', 1] 이런 식으로 나오는데,
        // 5번 레시피가 2개 재료 포함, 9번 레시피가 1개 재료 포함한것
        let test = Object.entries(result2).sort(([, a], [, b]) => b - a);
        console.log(test);
        console.log(test[0]);

        setRecommendedRecipe([...test]);

    }, [filteredItems]);

    console.log(recommendedRecipe)


    return (
        <div className={styles.staticBackground}>

            {recommendedRecipe.map((item, i) => {
                return (

                    <Recipe allRecipe = {allRecipe} priorityNumber={i}  key={i} 
                      recommendedRecipe={recommendedRecipe}
                     allRecipeIng={allRecipeIng} ingredient = {ingredient}
                     history = {history}  setHistory = {setHistory}/>
                )
            }
            )}

        </div>
    );
};