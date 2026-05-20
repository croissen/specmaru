import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 50px 16px 30px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.div`
  font-size: 18px;
`;

export const Logo = styled.div`
  font-weight: bold;
  white-space: nowrap;
  /* 화면이 좁아지면 줄바꿈 대신 글자 크기를 줄여 한 줄 유지 */
  font-size: clamp(15px, 5.2vw, 28px);
`;

export const Main = styled.main`
  flex: 1;
`;

export const Footer = styled.footer`
  margin-top: 50px;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  border-top: 1px solid #eee;
`;