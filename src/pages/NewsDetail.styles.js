// src/pages/News.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  color: #222;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  background-color: #fff;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

export const HomeButton = styled(BackButton)``;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #111;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
  object-fit: cover;
`;

export const Summary = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  font-weight: bold;
`;

export const Sections = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const Message = styled.p`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: #777;
`;
export const CoupangMent = styled.div`
  margin-top: 200px;
  font-size: 12px;
  text-align: center;
`;
export const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 55px;
  right: 20px;
  padding: 10px 16px;
  font-size: 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #40a9ff;
  }
  @media (min-width: 1024px) {
    right: 300px;
  }
`;