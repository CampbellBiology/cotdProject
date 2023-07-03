
import styles from "./HistoryComponent.module.css";
import React, { useEffect, useState } from 'react';



export const HistoryComponent = ({ history, dayList, historyNum }) => {

    const day = dayList[historyNum]
    const [filtered, setFiltered] = useState([]);

    //날짜별 분류, day에 해당하는 history만 남음
        const filteredItem = history.filter((item) =>
            item.createdAt.split(" ")[0] === day
        )

    useEffect(() => {
        setFiltered(...filtered, filteredItem)

    }, [day, history, setFiltered]);

    console.log(filtered)


    return (
        <div className={styles.HistoryComponent}>
            날짜 : {day}
            내용: {
                filtered.map((item, i) => {

                    return <div key={i}>
                        <div>사진: <img src={filtered[i].img_path} className={styles.photo} alt={filtered[i].cocktail_name}></img></div>
                        <div>{i}번째 잔: {filtered[i].cocktail_name}</div>
                        <button> 삭제 </button>
                    </div>
                })
            }

        </div>
    )
};