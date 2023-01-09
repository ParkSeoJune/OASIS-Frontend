import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QuestionContent } from "../../interfaces/QuestionInterface";
import TokenService from "../../lib/TokenService";
import MainQuestion from "../../api/Question";
import WriteQuestionComment from "./WriteQuestionComment/WriteQuestionComment";
import QuestionDetail from "./QuestionDetail/QuestionDetail";

const defaultQuestion: QuestionContent = {
  userName: "",
  coupleName: "",
  answer: "",
  coupleAnswer: "상대방이 아직 답변하지 않았어요!",
};

function Question() {
  const [questionContent, setQuestionContent] =
    useState<QuestionContent>(defaultQuestion);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const location = useLocation();

  const id = location.state.Id;
  const content = location.state.content;

  const getComment = async () => {
    try {
      const response: any = await MainQuestion.getDiaryComment(
        id,
        TokenService.getLocalAccessToken()
      );
      console.log(response.data);
      setQuestionContent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
    if (questionContent.answer === "") setIsTrue(false);
  }, []);

  return (
    <>
      {!isTrue && (
        <WriteQuestionComment
          id={id}
          content={content}
          questionContent={questionContent}
        />
      )}
      {isTrue && (
        <QuestionDetail
          id={id}
          content={content}
          questionContent={questionContent}
        />
      )}
    </>
  );
}

export default Question;
