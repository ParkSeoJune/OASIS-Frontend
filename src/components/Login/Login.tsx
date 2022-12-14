import * as S from "./style";
import * as I from "../../assets/svg";
import { LoginInterface } from "../../interfaces/AuthInterface";
import { useForm } from "react-hook-form";
import Auth from "../../api/Auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { isCoupleAtom, loggedAtom } from "../../atoms/AtomContainer";
import { Frame, Setting } from "../Common/Frame";
import { useNavigate } from "react-router-dom";
import { Input } from "../Common/Inputs/AuthInput";
import { Logo } from "../Common/Logos/BigLogo";
import { BottomText } from "../Common/Texts/BottomText";
import { GradiantButton } from "../Common/Buttons/GradiantButton";
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInterface>();
  const navigate = useNavigate();
  const [, setLogged] = useRecoilState(loggedAtom);
  const [, setisCouple] = useRecoilState(isCoupleAtom);

  const logged = useRecoilValue(loggedAtom);
  const isCouple = useRecoilValue(isCoupleAtom);

  useEffect(() => {
    if (logged) {
      if (isCouple) {
        // true이면 커플 연결된 상태
        navigate("/");
      } else navigate("/linkcouple");
    } else navigate("/login");
  }, [logged]); // 이거 커플이면 메인화면가는건데 다른페이지(일기디테일페이지)도 못들어가게함(확인해보기)

  const onValid = async (data: LoginInterface) => {
    try {
      const response: any = await Auth.login(data);

      localStorage.setItem("token", JSON.stringify(response.data));
      if (localStorage.getItem("token") === null) {
        throw new Error(`No token`);
      }

      if (response.status === 200) {
        setisCouple(response.data.couple);
        setLogged(true);
        console.log(
          JSON.parse(localStorage.getItem("token") || "").accessToken
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const inValid = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <Setting>
        <Frame>
          <Logo>
            <I.Logo />
          </Logo>
          <S.Title>LOGIN</S.Title>
          <S.Description>
            앱을 사용하기 위해선 로그인이 필요합니다.
          </S.Description>
          <form onSubmit={handleSubmit(onValid, inValid)}>
            <S.InputBox>
              <Input
                placeholder="아이디를 입력해주세요"
                {...register("id", { required: true })}
              ></Input>
              <Input
                placeholder="비밀번호를 입력해주세요"
                {...register("password", { required: true })}
              ></Input>

              <S.StyledLink to="/find">
                비밀번호 또는 아이디를 잊어버리셨나요?
              </S.StyledLink>
              <GradiantButton>Login</GradiantButton>
            </S.InputBox>
          </form>
          <S.BottomTextBox>
            <BottomText color="#959595" weight="400">
              계정이 없으신가요?{" "}
            </BottomText>
            <BottomText
              color="#E4B3B5"
              weight="700"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </BottomText>
          </S.BottomTextBox>
        </Frame>
      </Setting>
    </>
  );
}

export default Login;
