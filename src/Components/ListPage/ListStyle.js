import styled from "styled-components";

export const ListBG = styled.div`
  background: #fff7ef;
  width: 100vw;
  height: 91vh;
`;

export const PageContainer = styled.div`
  display: grid;
  width: 100%;
  margin-top: 80px;
`;

export const PageRow = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  margin: 1.5% 2% 0 2%;
  grid-template-areas: "col1 col2 col2 col2 col2 col2 col2 col2 col2";
`;

export const Column1 = styled.div`
  grid-area: col1;
`;

export const Column2 = styled.div`
  padding: 0;
  grid-area: col2;
`;

export const ListContents = styled.div`
  z-index: 3;
  max-width: 1200px;
  flex-direction: column;
`;

export const ListRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  margin-top: 5%;
  grid-template-areas: "row1 row1" "row2 row2" "row3 row3";
`;

export const ListPlace01 = styled.div`
  grid-area: row1;
  max-width: 100px;
  margin: 0px 0 0px 0;
  text-align: center;

  font-family: "Spoqa Han Sans Neo Bold";
  font-style: normal;
  font-weight: ${({ tab }) => (tab === 0 ? 700 : 600)};
  font-size: 24px;
  line-height: 150%;
  color: ${({ tab }) => (tab === 0 ? "#FFBA94" : "#464646")};
  &:hover {
    font-family: "Spoqa Han Sans Neo Bold";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    /* identical to box height, or 30px */
    color: #ffba94;
  }
`;

export const ListPlace02 = styled.div`
  grid-area: row2;
  max-width: 100px;
  margin: 20px 0 0px 0;
  text-align: center;
  font-family: "Spoqa Han Sans Neo Bold";
  font-style: normal;
  font-weight: ${({ tab }) => (tab === 1 ? 700 : 600)};
  font-size: 24px;
  line-height: 150%;
  color: ${({ tab }) => (tab === 1 ? "#FFBA94" : "#464646")};
  &:hover {
    font-family: "Spoqa Han Sans Neo Bold";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    /* identical to box height, or 30px */
    color: #ffba94;
  }
`;

export const ListPlace03 = styled.div`
  grid-area: row3;
  max-width: 100px;
  margin: 20px 0 0px 0;
  text-align: center;
  font-family: "Spoqa Han Sans Neo Bold";
  font-style: normal;
  font-weight: ${({ tab }) => (tab === 2 ? 700 : 600)};
  font-size: 24px;
  line-height: 150%;
  color: ${({ tab }) => (tab === 2 ? "#FFBA94" : "#464646")};
  &:hover {
    font-family: "Spoqa Han Sans Neo Bold";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    /* identical to box height, or 30px */
    color: #ffba94;
  }
`;

export const ListBox = styled.div`
  max-width: 1200px;
  margin: 0 0 0 30px;
  background: #ffffff;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`;

export const Container = styled.div`
  display: grid;
  width: 100%;
`;

export const ContentsWrap = styled.div`
  display: grid;
  margin: 0% 2% 0 2%;
`;
export const DataContainer = styled.div`
  display: grid;
  margin: 0 0 0 3%;
  align-self: center;
`;
export const ListPageRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "rcol1 rcol2 rcol2 rcol2";
`;

export const Col1 = styled.div`
  grid-area: rcol1;
`;

export const Col2 = styled.div`
  grid-area: rcol2;
`;

export const ListName = styled.div`
  margin: 2% 0 1% 5%;
  font-family: "Spoqa Han Sans Neo Bold";
  font-style: normal;
  font-size: 38px;
  color: #ffba94;
  font-weight: 700;
`;

export const MainIMG = styled.img`
  width: 150px;
  height: 150px;
  margin: 2% 0 2% 5%;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
`;

export const RestName = styled.div`
  margin: 3% 10px 2% 0;
  font-family: "Spoqa Han Sans Neo Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  /* or 114% */

  font-feature-settings: "pnum" on, "lnum" on;

  color: #424242;
`;

export const MapPinIMG = styled.img`
  float: left;
  max-width: 22px;
  margin: 0 10px 20px 0;
`;

export const InfoText = styled.div`
  max-width: 1000px;
  float: left;
  font-family: "Spoqa Han Sans Neo Regular";
  margin-right: 20px;
  margin-top: 3px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
`;

export const ClockIMG = styled.img`
  float: left;
  max-width: 22px;
  margin: 0 10px 20px 15px;
`;

export const HeartIMG = styled.img`
  clear: both;
  float: left;
  max-width: 23px;
  margin: 0 10px 0px 0;
`;

export const Border = styled.div`
  max-width: 1200px;
  text-align: center;
  margin: 5px 0 5px 0;
  border-bottom: 1px solid #d9d9d9;
`;
