import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import mappin from "../../images/main/mappin.svg";
import star from "../../images/detail/star.svg";
import phone from "../../images/detail/phone.svg";
import menu from "../../images/detail/menu.svg";
import link from "../../images/detail/fi_link.svg";
import clock from "../../images/main/clock.svg";
import finfo from "../../images/detail/fi_info.svg";
import {
  Row1,
  Row3,
  Row4,
  Row5,
  InfoCol,
  Star,
  MapPinIMG,
  Category,
  DetailName,
  StarIMG,
  MenuIMG,
  Address,
  Tel,
  Detailaddress,
  PhoneIMG,
  Menu1,
  Menu2,
  Menu3,
  ClockIMG,
  Clock,
  Parking,
  LinkIMG,
  ParkingIMG,
  Addhours,
} from "./ListDetailStyle.js";

const TopContainer = styled.div`
  display: flex;
  background: #fff7ef;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  scroll-snap-align: start;
`;

function ListDetailTop(props) {
  const { id } = useParams(); // 유저가 URL 파라미터에 입력한 거 가져올 때 사용하는 훅
  let navigate = useNavigate(); // 페이지 이동

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const ref = db.collection("place02"); // "컬렉션명"
  var arr = [0];
  for (let i = 0; i < data.length; i++) {
    arr[i] = i + 1;
  }

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
  }, []);

  return (
    <>
      <TopContainer>
        <div className="detailBG">
          {loader === false &&
            data.slice(arr[id] - 1, arr[id]).map((rest2) => (
              <div className="eachDetailImg">
                <img src={rest2.url} style={{transform: 'translate(50, 50)' ,width: '100%',height: '100%', objectFit: 'cover',width: '470px',height: '560px'}}/>
              </div>
            ))}

          <div className="topBox">
            <div className="all">
              <div className="detailinfo">가게정보</div>
              <div>
                {loader === false &&
                  data.slice(arr[id] - 1, arr[id]).map((rest2) => (
                    <div>
                      <InfoCol>
                        <Row1>
                          <DetailName>{rest2.name}</DetailName>
                          <Category>| {rest2.cate}</Category>
                        </Row1>
                        <Row3>
                          <MapPinIMG src={mappin} alt="mappin" />
                          <Address>{rest2.addr}</Address>
                          <PhoneIMG src={phone} alt="phone" />
                          <Tel>{rest2.tel}</Tel>

                          <MenuIMG src={menu} alt="menu" />
                          <Menu1>
                            {rest2.price1}원 ~ {rest2.price2}원
                          </Menu1>
                        </Row3>
                        <Row4>
                          <ClockIMG src={clock} alt="clock" />
                          <Clock>{rest2.time}</Clock>
                          <ParkingIMG src={finfo} alt="finfo" />
                          <Parking>{rest2.park}</Parking>
                          <LinkIMG src={link} alt="link" />
                          <Link>{rest2.site}</Link>
                        </Row4>
                        <Row5>
                          <div>
                            <button
                              className="Rbutton"
                              onClick={() => {
                                navigate("/review");
                              }}
                            >
                              리뷰 작성
                            </button>
                          </div>
                        </Row5>
                      </InfoCol>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </TopContainer>
    </>
  );
}

export default ListDetailTop;
