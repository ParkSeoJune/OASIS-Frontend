import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import Diary from "../../api/Diary";
import { Back } from "../../assets/svg";
import {
  ImagesAtom,
  ImageSrcAtom,
  MoodAtom,
  nickNameAtom,
} from "../../atoms/AtomContainer";
import TokenService from "../../lib/TokenService";
import { GradiantButton } from "../Common/Buttons/GradiantButton";
import { Frame, Setting } from "../Common/Frame";
import { EmptyCompo, Title, TitleText } from "../Common/Title";
import InputImage from "./InputImage/InputImage";
import Mood from "./Mood/Mood";
import * as S from "./style";

function CreateDiary() {
  const navigate = useNavigate();
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [imageSrc] = useRecoilState<File[]>(ImageSrcAtom);
  const [btn] = useRecoilState(MoodAtom);
  const myName: string = useRecoilValue(nickNameAtom);
  const resetMood = useResetRecoilState(MoodAtom);
  const resetImageSrc = useResetRecoilState(ImageSrcAtom);
  const resetImages = useResetRecoilState(ImagesAtom);

  const resetRecoil = () => {
    resetMood();
    resetImageSrc();
    resetImages();
  };

  const TitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDiaryTitle(e.target.value);
  };
  const ContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDiaryContent(e.target.value);
  };

  const createDiary: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const formData = new FormData();
      if (!imageSrc) return;
      imageSrc.forEach((img) => formData.append("file", img));
      let reqDto = {
        title: diaryTitle,
        content: diaryContent,
        mood: btn?.name,
        writer: myName,
      };

      formData.append(
        "req",
        new Blob([JSON.stringify(reqDto)], { type: "application/json" })
      );
      const response: any = await Diary.postCreateDiary(
        formData,
        TokenService.getLocalAccessToken()
      );

      if (response.status === 201) {
        resetRecoil();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Setting>
        <Frame>
          <Title>
            <div onClick={() => navigate("/")}>
              <Back />
            </div>
            <TitleText>?????? ?????? ??????</TitleText>
            <EmptyCompo />
          </Title>

          <InputImage />

          <S.TextBox>
            <S.TitleText
              placeholder="?????? ??????"
              onChange={TitleChange}
              value={diaryTitle}
            />
            <S.TextArea
              placeholder="????????? ??????????????????.."
              onChange={ContentChange}
              value={diaryContent}
            ></S.TextArea>
          </S.TextBox>

          <Mood />

          <GradiantButton style={{ marginTop: 30 }} onClick={createDiary}>
            ?????? ??????
          </GradiantButton>
        </Frame>
      </Setting>
    </>
  );
}

export default CreateDiary;
