import styled from "styled-components";

export const ImageFrame = styled.div`
  margin-top: 50px;
  width: 375px;
  height: 200px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  width: 375px;
  height: 215px;
  overflow-x: auto;
  white-space: nowrap;
`;

// export const Image = styled.img``;

export const ImageBox = styled.div`
  background: blue;
  width: 140px;
  flex-shrink: 0;
  height: 200px;
  margin-right: 10px;
  border-radius: 18px;
`;

export const ContentBox = styled.div`
  margin-top: 70px;
  width: 375px;
  height: auto;
  position: relative;
`;

export const TextBox = styled.div`
  width: 375px;
  box-shadow: 0px 0px 18px rgba(169, 169, 169, 0.25);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const TitleText = styled.div`
  color: #808080;
  font-weight: 700;
  font-size: 14px;
  margin-top: 25px;
  margin-left: 25px;
`;

export const Text = styled.div`
  width: 325px;
  color: #b9b9b9;
  font-weight: 600;
  font-size: 12px;
  margin: 15px 0 25px 25px;
`;