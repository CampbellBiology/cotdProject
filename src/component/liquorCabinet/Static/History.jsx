
//import styles from "./History.module.css";
import React from 'react';
import { HistoryComponent } from "./HistoryComponent"
import axios from 'axios';




export const History = ({ history, setHistory }) => {

    const user_id = "master"
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



    //히스토리 삭제
    const deleteHistory = (time) => {
        setHistory(history.filter((item) => item.createdAt !== time))

    };

    const deleteHistoryDB = (time) => {

        if (user_id !== null) {
            axios({
                url: "/api/historyDelete",
                method: 'post',
                data: { user_id: user_id, createdAt: time }
            })
                .then(function a(response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }









    return (
        <>

            {/* dayList만큼 반복 */}
            {dayList.map((item, i) => {
                return (<HistoryComponent history={history} dayList={dayList} historyNum={i}
                    deleteHistory={deleteHistory} deleteHistoryDB={deleteHistoryDB} key={i} />)
            })}

        </>
    )
};