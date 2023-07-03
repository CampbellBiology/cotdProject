
//import styles from "./History.module.css";
import React from 'react';
import { HistoryComponent } from "./HistoryComponent"



export const History = ({ history, setHistory }) => {

    console.log(history)


    //히스토리의 timestamp만 가져와서 자름
    let newDay = history.map((item) =>
        item.createdAt.split(" ")[0])

    //0: "2023-07-03" 1: "2023-07-03" 2: "2023-06-30" 이런 식으로 나오옴
    console.log(newDay)

    //배열 중복 제거
    const dayList = newDay.filter((element, index) => {
        return newDay.indexOf(element) === index;
    });

    // ['2023-07-03', '2023-06-30']처럼 정리됨
    console.log(dayList)


    return (
        <>

            {/* dayList만큼 반복 */}
            {dayList.map((item, i) => {
                return (<HistoryComponent history={history} dayList={dayList} historyNum={i} key={i} />)
            })}

        </>
    )
};