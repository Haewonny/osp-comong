import {
    Container1,
    ReviewCol,
    RvRow1,
    RvRow2,
    RvRow3,
    FeatherIMG,
  } from "./DetailStyle";
  import "./ReviewPage.css";
  import styled from "styled-components";
  import feather from "../../images/review/Feather.svg";
  import { useState, useEffect } from "react";
  import Pagination from "react-js-pagination";
  import { db } from "../../firebase";
  
  const Review = (doc) => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const ref = db.collection("review"); // "컬렉션명"
    const id = doc.id;
    const [items, setItems] = useState(3);
    const [page, setPage] = useState(1);
    const handlePageChange = (page) => {
      setPage(page);
    };
    var count = 0;
    for (let i = 0; i < data.length; i++) {
      count = i + 1;
    }
  
    //review
    function getData() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setData(items);
        setLoader(false);
      });
    }
  
    useEffect(() => {
      getData();
      console.log(data);
    }, []);
  
    //이미지
  
    return (
      <div>
        <Container1>
          {loader === false &&
            data
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((rest) => (
                <div key={rest.id}>
                  <ReviewCol>
                    <RvRow1>
                      <div>
                        <img src={rest.url} className="reviewimg" id="img" />
                      </div>
                      <div className="enter" />
                    </RvRow1>
                    <RvRow2>
                      <FeatherIMG src={feather} alt="feather" />
                      <div className="NickName">{rest.text1}</div>
                      <div className="star">평점 #{rest.star}</div>
                      <div className="enter" />
                    </RvRow2>
                    <RvRow3>
                      <div className="ReviewM">메뉴: {rest.text2}</div>
                      <div className="ReviewC">{rest.content}</div>
                      <div className="enter" />
                    </RvRow3>
                  </ReviewCol>
                </div>
              ))}
          <Pagination
            activePage={page}
            itemsCountPerPage={3}
            totalItemsCount={count}
            pageRangeDisplayed={4}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </Container1>
      </div>
    );
  };
  
  export default Review;