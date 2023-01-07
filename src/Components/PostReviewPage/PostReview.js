import { GlobalFonts } from "../../fonts/font";
import "./PostReview.css";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import x from "../../images/xBtn.svg";
import { FaStar } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

const PostRContainer = styled.div`
  background: #fff7ef;
  display: flex;
  height: 90%;
  width: 100%;
  z-index: 3;
  scroll-snap-align: start;
`;

const ButtonR = styled.button`
  background-color: #ffa574;
  color: white;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-size: 14px;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #fad4b2;
  }
`;

const Wrap = styled.div`
text-align: center;
margin 30px auto;
`;

const Wraps = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  padding-left: 15px;

  & svg {
    color: white;
    cursor: pointer;
  }

  :hover svg {
    color: #ffa574;
  }

  & svg:hover ~ svg {
    color: white;
  }

  .colorStar {
    color: #ffa574;
  }
`;

//모달창
const OverLay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: fit-content;
  border-radius: 20px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const XBtn = styled.img`
  max-width: 25px;
  display: grid;
  margin: 20px 0 0 90%;
`;

const Contents = styled.div`
  margin: 60px;

  h1 {
    font-family: "Spoqa Han Sans Neo";
    font-size: 20px;
    font-weight: 600;
  }
  h4 {
    font-family: "Spoqa Han Sans Neo";
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 60px;
  }
`;

const Button = styled.button`
  background-color: #ffa574;
  color: white;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  font-size: 14px;
  padding: 10px 40px;
  border: none;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #fad4b2;
  }
`;

const SelectBox = styled.div`
  display: inline-block;
  position: relative;
  float: left;
  left: 0px;
  width: 115px;
  height: 35px;
  padding: 5px;
  margin-left: 15px;

  border-radius: 6px;

  box-sizing: border-box;
  z-index: 999;
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;

  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #ffa574;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Label2 = styled.label`
  display: flex;
  font-size: 15px;
  padding: 0 15x 0 15px;
  color: rgb(125, 125, 125);
  align-items: center;
  justify-content: center;
  width: 90px;
  font-family: "Spoqa Han Sans Neo Regular";
  margin: 5px;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 6px;
  border: ${(props) =>
    props.show ? "1px solid rgba(0, 16, 61, 0.12)" : "none"};

  background-color: #ffffff;
`;

const Option = styled.li`
  font-family: "SUIT Regular";

  font-size: 14px;
  padding: 10px;
  text-align: center;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #fff7ef;
  }
`;

const ARRAY = [0, 1, 2, 3, 4];

const PostReview = (props) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [content, setContent] = useState("");
  const [star, setStar] = useState();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  // 모달창
  const [isOpen, setIsOpen] = useState(false);

  function Modal({ onClose }) {
    const handleSubmit = () => {
      onClose?.();
      onClickButton();
      setText1("");
      setText2("");
      setText3("");
      setContent("");
      setClicked([false, false, false, false, false]);
      setImageUrl(null);
    };

    return (
      <OverLay>
        <ModalWrap>
          <XBtn
            src={x}
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <Contents>
            <h2>리뷰를 등록하시겠습니까?</h2>
            <h4>업로드 후에는 수정이 불가합니다.</h4>
            <Button onClick={handleSubmit}>리뷰 등록하기</Button>
          </Contents>
        </ModalWrap>
      </OverLay>
    );
  }

  // 별점
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]);

  // 별점 서버로 보내기
  const sendReview = () => {
    let score = star;
    score = clicked.filter(Boolean).length;
    setStar(score);
  };

  // 사진 프리뷰
  const [imageUrl, setImageUrl] = useState(null);
  const ImgInput = useRef();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (imageUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageUrl);
    } else {
      setPreview(null);
    }
  }, [imageUrl]);

  // 사진 업로드
  const uploadeFiles = (file) => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            bucket
              .doc(text2)
              .collection(Rvselect)
              .add({ url, text1, text2, text3, content, star, place })
              .then((docRef) => {
                console.log(docRef.id);
              });
          });
      }
    );
  };

  // 리뷰 위치
  const [currentValue, setCurrentValue] = useState("이대 정문"); // SelectBox 선택된 값
  const [showOptions, setShowOptions] = useState(false);
  const [place, setPlace] = useState(0);
  let DBselect;
  let Rvselect;

  if (place == 0) {
    DBselect = "place01";
    Rvselect = "review01";
  } // 이대 정문 DB
  else if (place == 1) {
    DBselect = "place02";
    Rvselect = "review02";
  } // 이대 후문 DB
  else if (place == 2) {
    DBselect = "place03";
    Rvselect = "review03";
  } // 신촌 DB

  const bucket = db.collection(DBselect); // 어느 DB에 저장할지 선택
  //-------------------------------------------
  // 리뷰 등록 관련

  var require1 = document.getElementById("text1");
  var require2 = document.getElementById("text2");
  var require3 = document.getElementById("text3");
  var require4 = document.getElementById("filesize");

  var change1 = document.getElementById("Ttext1");
  var change2 = document.getElementById("Ttext2");
  var change3 = document.getElementById("Ttext3");
  var change4 = document.getElementById("Ttext4");

  const onClickBtn = () => {
    change1.style.color = "rgb(125, 125, 125)";
    change2.style.color = "rgb(125, 125, 125)";
    change3.style.color = "rgb(125, 125, 125)";
    change4.style.color = "rgb(125, 125, 125)";
    if (
      require1.value !== "" &&
      require2.value !== "" &&
      require3.value !== "" &&
      star !== 0 
    ) {
      setIsOpen(true);
      change1.style.color = "rgb(125, 125, 125)";
      change2.style.color = "rgb(125, 125, 125)";
      change3.style.color = "rgb(125, 125, 125)";
      change4.style.color = "rgb(125, 125, 125)";
    }
    if (require1.value === "") {
      change1.style.color = "#ffa574";
    }
    if (require2.value === "") {
      change2.style.color = "#ffa574";
    }
    if (require3.value === "") {
      change3.style.color = "#ffa574";
    }
    if (star === 0) {
      change4.style.color = "#ffa574";
    }
  };

  const onClickButton = () => {
    uploadeFiles(ImgInput.current.files[0]);
  };

  const navigate = useNavigate();
  const navigateToList = () => {
    navigate("/list");
  };
  return (
    <>
      <GlobalFonts />
      <PostRContainer>
        <div className="postReviewBG">
          <div className="column">
            <div className="Box">
              {preview ? (
                <img
                  style={{
                    transform: "translate(50, 50)",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={preview}
                  onClick={() => {
                    setImageUrl(null);
                  }}
                />
              ) : (
                <BsPlusSquare
                  size={40}
                  onClick={(event) => {
                    event.preventDefault();
                    ImgInput.current.click();
                  }}
                  className="File"
                  id="File"
                />
              )}
              <input
                ref={ImgInput}
                type="file"
                accept="image/*"
                className="Box"
                id="fileSize"
                onChange={(event) => {
                  const file = ImgInput.current.files[0];
                  if (file) {
                    setImageUrl(file);
                  } else {
                    setImageUrl(null);
                  }
                }}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="info">
            <div className="line">
              <span className="TextI" id="Ttext1">
                닉네임
              </span>
              <input
                className="Write1"
                type="text"
                placeholder="김이화"
                id="text1"
                value={text1}
                onChange={(e) => {
                  setText1(e.target.value);
                }}
              />
              <span className="TextI" id="Ttext2">
                식당이름
              </span>
              <input
                className="Write3"
                type="text"
                placeholder="정확한 식당명을 입력해주세요!"
                id="text2"
                value={text2}
                onChange={(e) => {
                  setText2(e.target.value);
                }}
              />
            </div>
            <div className="line2">
              <span className="TextI" id="Ttext1">
                식당위치
              </span>
              <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
                <Label2>{currentValue}</Label2>
                <SelectOptions show={showOptions}>
                  <Option
                    onClick={() => (setCurrentValue("이대 정문"), setPlace(0))}
                  >
                    <span className="selecttext">이대 정문</span>
                  </Option>
                  <Option
                    onClick={() => (setCurrentValue("이대 후문"), setPlace(1))}
                  >
                    <span className="selecttext">이대 후문</span>
                  </Option>
                  <Option
                    onClick={() => (setCurrentValue("신촌"), setPlace(2))}
                  >
                    <span className="selecttext">신촌</span>
                  </Option>
                </SelectOptions>
              </SelectBox>
              <span className="TextI" id="Ttext3">
                메뉴이름
              </span>
              <input
                className="Write2"
                type="text"
                placeholder="정확한 메뉴명을 입력해주세요!"
                id="text3"
                value={text3}
                onChange={(e) => {
                  setText3(e.target.value);
                }}
              />
            </div>
            <Wraps>
              <span className="TextI" id="Ttext4">
                별점
              </span>
              <Stars>
                {ARRAY.map((el, idx) => {
                  return (
                    <FaStar
                      key={idx}
                      size="30"
                      onClick={() => handleStarClick(el)}
                      className={clicked[el] && "colorStar"}
                    />
                  );
                })}
              </Stars>
            </Wraps>

            <label className="TextI">리뷰 내용</label>
            <textarea
              className="textArea"
              id="content"
              placeholder="내용을 입력해주세요!"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
              maxLenth="100"
            />

            <Wrap>
              <ButtonR type="submit" onClick={onClickBtn}>
                등록하기
              </ButtonR>
              {isOpen && (
                <Modal
                  open={isOpen}
                  onClose={() => {
                    setIsOpen(false);
                    navigateToList();
                  }}
                />
              )}
            </Wrap>
          </div>
        </div>
      </PostRContainer>
    </>
  );
};

export default PostReview;