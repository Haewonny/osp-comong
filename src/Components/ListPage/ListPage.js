import React, { useEffect, useState } from "react";
import { GlobalFonts } from "../../fonts/font";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import "./ListPage.css";
import {
  ListName,
  Column1,
  Column2,
  Container,
  ListBG,
  ListBox,
  ContentsWrap,
  ListContents,
  ListPlace01,
  ListPlace02,
  ListPlace03,
  ListRow,
  PageRow,
  MapPinIMG,
  ClockIMG,
  MainIMG,
  HeartIMG,
  DataContainer,
  ListPageRow,
  Col1,
  Col2,
  Border,
  InfoText,
  RestName,
  PageContainer,
} from "./ListStyle";
import heartt from "../../images/list/heartt.svg";
import clock from "../../images/main/clock.svg";
import mappin from "../../images/main/mappin.svg";
import { db } from "../../firebase";
function ListPage() {
  let [tab, setTab] = useState(0); // 0 정문, 1 후문, 2 신촌

  return (
    <>
      <GlobalFonts />
      <ListBG>
        <PageContainer>
          <PageRow>
            <Column1>
              <ListContents>
                <ListRow>
                  <ListPlace01
                    tab={tab}
                    onClick={() => {
                      setTab(0);
                    }}
                  >
                    이대 정문
                  </ListPlace01>
                  <ListPlace02
                    tab={tab}
                    onClick={() => {
                      setTab(1);
                    }}
                  >
                    이대 후문
                  </ListPlace02>
                  <ListPlace03
                    tab={tab}
                    onClick={() => {
                      setTab(2);
                    }}
                  >
                    신촌
                  </ListPlace03>
                </ListRow>
              </ListContents>
            </Column1>
            <Column2>
              <ListBox>
                <TabContent tab={tab} />
              </ListBox>
            </Column2>
          </PageRow>
        </PageContainer>
      </ListBG>
    </>
  );
}

function TabContent(props) {
  return (
    <div>
      {
        [
          <div>
            <Place01 />
          </div>,
          <div>
            <Place02 />
          </div>,
          <div>
            <Place03 />
          </div>,
        ][props.tab]
      }
    </div>
  );
}

function Place01() {
  let [place01data, setPlace01Data] = useState([]);
  const [loader, setLoader] = useState(true);
  const ref = db.collection("place01"); // 정문 맛집 데이터
  const [items, setItems] = useState(3);
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  let navigate = useNavigate();

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPlace01Data(items);
      setLoader(false);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <ListName>이대 정문 맛집</ListName>
        <ContentsWrap>
          {loader === false &&
            place01data
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((v, i) => {
                return (
                  <div key={i}>
                    <DataContainer
                      onClick={() => {
                        navigate(`/listdetail01/${i + (page - 1) * 3}`);
                      }}
                    >
                      <ListPageRow>
                        <Col1>
                          <MainIMG src={v.url} />
                        </Col1>
                        <Col2>
                          <RestName>{v.name}</RestName>
                          <MapPinIMG src={mappin} />
                          <InfoText>{v.addr}</InfoText>
                          <ClockIMG src={clock} />
                          <InfoText>{v.time}</InfoText>
                          <HeartIMG src={heartt} />
                          <InfoText>대표 메뉴 - {v.bestmenuname}</InfoText>
                        </Col2>
                      </ListPageRow>
                    </DataContainer>
                    <Border />
                  </div>
                );
              })}
        </ContentsWrap>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={place01data.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </Container>
    </>
  );
}

function Place02() {
  let [place02Data, setPlace02Data] = useState([]); // 정문 맛집 데이터
  const [items, setItems] = useState(3);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const ref = db.collection("place02");
  const handlePageChange = (page) => {
    setPage(page);
  };

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPlace02Data(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  let navigate = useNavigate();
  return (
    <>
      <Container>
        <ListName>이대 후문 맛집</ListName>
        <ContentsWrap>
          {loader === false &&
            place02Data
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((v, i) => {
                return (
                  <div key={i}>
                    <DataContainer
                      onClick={() => {
                        navigate(`/listdetail02/${i + (page - 1) * 3}`);
                      }}
                    >
                      <ListPageRow>
                        <Col1>
                          <MainIMG src={v.url} />
                        </Col1>
                        <Col2>
                          <RestName>{v.name}</RestName>
                          <MapPinIMG src={mappin} />
                          <InfoText>{v.addr}</InfoText>
                          <ClockIMG src={clock} />
                          <InfoText>{v.time}</InfoText>
                          <HeartIMG src={heartt} />
                          <InfoText>대표 메뉴 - {v.bestmenuname}</InfoText>
                        </Col2>
                      </ListPageRow>
                    </DataContainer>
                    <Border />
                  </div>
                );
              })}
        </ContentsWrap>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={place02Data.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </Container>
    </>
  );
}

function Place03() {
  let [place03Data, setPlace03Data] = useState([]); // 정문 맛집 데이터
  const [items, setItems] = useState(3);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const ref = db.collection("place03");
  const handlePageChange = (page) => {
    setPage(page);
  };

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPlace03Data(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  let navigate = useNavigate();
  return (
    <>
      <Container>
        <ListName>신촌 맛집</ListName>
        <ContentsWrap>
          {loader === false &&
            place03Data
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((v, i) => {
                return (
                  <div key={i}>
                    <DataContainer
                      onClick={() => {
                        navigate(`/listdetail03/${i + (page - 1) * 3}`);
                      }}
                    >
                      <ListPageRow>
                        <Col1>
                          <MainIMG src={v.url} />
                        </Col1>
                        <Col2>
                          <RestName>{v.name}</RestName>
                          <MapPinIMG src={mappin} />
                          <InfoText>{v.addr}</InfoText>
                          <ClockIMG src={clock} />
                          <InfoText>{v.time}</InfoText>
                          <HeartIMG src={heartt} />
                          <InfoText>대표 메뉴 - {v.bestmenuname}</InfoText>
                        </Col2>
                      </ListPageRow>
                    </DataContainer>
                    <Border />
                  </div>
                );
              })}
        </ContentsWrap>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={place03Data.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </Container>
    </>
  );
}

export default ListPage;
