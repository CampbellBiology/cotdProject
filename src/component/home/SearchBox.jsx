
import styles from "./SearchBox.module.css";
import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 400px;
  height: 45px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

// Search 컴포넌트 스타일 정의
const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

// AutoSearchContainer 컴포넌트 스타일 정의
const AutoSearchContainer = styled.div`
  z-index: 20;
  height: 50vh;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
`;

// AutoSearchWrap 컴포넌트 스타일 정의
const AutoSearchWrap = styled.ul``;

// AutoSearchData 컴포넌트 스타일 정의
const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isFocus ? '#edf5f5' : '#fff')};
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;


export const SearchBox = ({ ingredient, setIngredient, allIngredient, setAllIngredient }) => {
  //let keyword;
  //let imgPath ="안녕"
  const user_id = "master"

  const [autoChk, setAutoChk] = useState(false);

  const deselectedOptions = [];

  //Object.keys 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환함
  //배열의 key값만 가져와서 배열로 만듦
  for (const key in Object.keys(allIngredient)) {
    deselectedOptions[key] = (allIngredient[key].ingredient_name);
  }


  // 각종 useState 친구들 선언해요
  //키보드 무빙용
  const [keyword, setKeyword] = useState('');
  const [index, setIndex] = useState(-1);
  const [keyItems, setKeyItems] = useState([]);
  const autoRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태를 확인하는 변수로 사용해요
  const typingDelay = 300; // 타이핑에 딜레이를 줘요




  // input의 onChange 이벤트 때, 입력값을 inputValue에 저장하고 hasText값 갱신
  const handleInputChange = (e) => {
    setKeyword(e.currentTarget.value);
    setIsTyping(true); // 타이핑 상태를 true로 설정
  }



  //동기화 적용시킴
  const findImage = async (selectedItemName) => {
    const result = allIngredient.filter((el) => el.ingredient_name === selectedItemName);
    const image = result[0] ? result[0].img_path : '';

    return image;
  };


  //addItem함수
  //clickedOption은 전체 아이템 중 선택한 아이템의 ingredient_name
  const addItem = async (keyword) => {

    //기존 술장 목록과 선택한 아이템의 이름을 비교
    const result = ingredient.filter((el) => el.ingredient_name === keyword);

    //같은 게 없으면addItem
    if (result[0] == null) {


      //더해줄 item
      //item의 이름은 선택한 inputvalue이고, img는 전체 목록에서 filter로 찾음(findImage함수)
      const image = await findImage(keyword)
      const addingItem = {
        ingredient_name: keyword,
        img_path: image
      };

      //item add해주기
      // 깊은 복사하고(...ingredient) 새로 넣어주기
      setIngredient([...ingredient, addingItem])
      console.log(addingItem)


      //DB에 넣기
      if (user_id !== null && result[0] == null) {
        axios({
          url: "/api/itemAdd",
          method: 'post',
          data: { user_id: user_id, ingredient_name: keyword }
        })
          .then(function a(response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else { alert("중복된 재료입니다.") }

    console.log(result)

  }


  //onFocus, onBlur일 때  
  const autoSearch = () => {
    if (autoChk === true) {
      setAutoChk(false);
      return;
    }
    setAutoChk(true);
  }



  //onKeyUp일 때
  // const onSubmitSearch = (e) => {
  //   setKeyword(e.target.value)
  //   //keyword = (e.target.value);
  //   if (e.key === "Enter") {

  //     if (keyItems.length !== 0) {
  //       setKeyword(keyItems[0].ingredient_name);
  //       setKeyItems([]);
  //       setIndex(-1);
  //       addItem(keyItems[0].ingredient_name);
  //       setKeyword('');
  //     }
  //   }
  // }

  console.log('인덱스' + index)

  // 화살표 키 이벤트 처리 함수
  const handleKeyArrow = (e) => {
    //콤보박스 자동 완성 결과가 있을 때 keyItems.length > 0
    if (keyItems.length > 0) {
      switch (e.key) {
        //하단 방향키를 누르면 해당 인덱스에서 prevIndex +1 에서 배열 길이로 나눈 나머지를 setIndex로 스테이트를 변경해요
        case 'ArrowDown':
          setIndex((prevIndex) => (prevIndex + 1) % keyItems.length);
          break;
        case 'ArrowUp':
          setIndex((prevIndex) =>
            prevIndex === 0 ? keyItems.length - 1 : prevIndex - 1
          );
          break;
        //esc키를 누르면 setKeyItems으로 초기화 해줘요
        case 'Escape':
          setKeyItems([]);
          setIndex(-1);
          break;
        //enter키를 누르면 setKeyItems으로 초기화 하고 keyItems[index].ingredient_name을 인풋창에 띄워요
        case 'Enter':
          if (index !== -1) {

            if (keyword !== null || keyword !== "" || keyword !== '' || keyword !== undefined) {
              setKeyword(keyItems[index].ingredient_name);
              setKeyItems([]);
              setIndex(-1);
              addItem(keyItems[index].ingredient_name);
              setKeyword('');
            } 

          } else {
            setKeyword(keyItems[0].ingredient_name);
            setKeyItems([]);
            setIndex(-1);
            addItem(keyItems[0].ingredient_name);
            setKeyword('');
          }
          break;
        default:
          // 디폴트 키입력은 없어요
          break;
      }
    } 
    //자동 완성 결과가 생기기 전에
    else if (e.key === 'Enter') {
      if (keyword === null || keyword === "" || keyword === '' || keyword === undefined) {
        alert('입력된 값이 없다')
      } else {
        alert('검색 결과가 없어요')
      }
    }
  };

  // 데이터 업데이트 함수
  const updateData = async () => {


    //allIngredient를 인풋창 value로 필터해요
    const res = await allIngredient;
    const filteredData = res.filter((item) =>
      (item.ingredient_name.replace(" ", "")).includes(keyword.replace(" ", ""))
    );

    //10개까지만 보여줘요
    const slicedData = filteredData.slice(0, 10);
    //길이순 정렬 ex) 체리, 체리 리큐르, 마라스키노 체리
    const lengthArr = slicedData.sort((x, y) => x.ingredient_name.length - y.ingredient_name.length)
    //console.log(lengthArr)

    setKeyItems(lengthArr);
  };

  useEffect(() => {
    // 타이핑 딜레이를 가진 타이머 생성
    const typingTimer = setTimeout(() => {
      if (isTyping) {
        //타이핑을 시작하면 데이터를 필터해서 가공해요
        updateData();
        setIsTyping(false); // 타이핑 상태를 false로 설정
      }
      //타이핑에 딜레이를 줘서 최적화 해줬어요
    }, typingDelay);

    // 컴포넌트 언마운트나 검색어 변경 시 타이머 정리
    return () => clearTimeout(typingTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, isTyping]);



  return (
    <SearchContainer
      id={styles.search}
      onFocus={autoSearch}
      onBlur={autoSearch}>

      <Search
        placeholder="가지고 있는 재료를 등록해주세요!"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyArrow}
      />
      <img src="/favicon.ico" alt="arrowIcon" style={{ width: '30px' }} />
      {keyItems.length > 0 && keyword && (
        <AutoSearchContainer>
          <AutoSearchWrap ref={autoRef}>
            {keyItems.map((search, idx) => (
              <AutoSearchData
                key={search.ingredient_name}
                isFocus={index === idx}
                onClick={() => {
                  setKeyword(search.ingredient_name);
                  setKeyItems([]);
                  setIndex(-1);
                  // setHasText(false);
                  // addItem(options[0]);
                  addItem(search.ingredient_name);
                  // setInputValue('');
                  setKeyword('');
                }}
              >
                {search.ingredient_name}
                <img src="/favicon.ico" alt="arrowIcon" />
              </AutoSearchData>
            ))}
          </AutoSearchWrap>
        </AutoSearchContainer>
      )}
    </SearchContainer>
  );

};