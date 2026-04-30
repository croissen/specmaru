import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 50px 0 30px 0;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.div`
  font-size: 18px;
`;

export const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
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