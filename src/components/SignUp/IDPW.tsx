import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  passwordAtom,
  SignUpPageAtom,
  userIdAtom,
} from "../../atoms/AtomContainer";
import { GradiantButton } from "../Common/Buttons/GradiantButton";
import { Input } from "../Common/Inputs/AuthInput";

function IDPW() {
  const [userId, setIdAtom] = useRecoilState(userIdAtom);
  const [password, setPwAtom] = useRecoilState(passwordAtom);
  const setNextPage = useSetRecoilState(SignUpPageAtom);

  const IdChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setIdAtom(e.target.value);
  const PwChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPwAtom(e.target.value);

  return (
    <>
      <Input
        placeholder="아이디를 입력해주세요"
        onChange={IdChange}
        value={userId}
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        onChange={PwChange}
        value={password}
      />
      <GradiantButton onClick={() => setNextPage(true)}>다음</GradiantButton>
    </>
  );
}

export default IDPW;
