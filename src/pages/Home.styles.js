import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Tabs = styled.div`
  display: flex;
  white-space: nowrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* 기본: PC */
  justify-content: center;
  overflow-x: visible;

  /* 모바일 */
  @media (max-width: 599px) {
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Tab = styled.button`
  flex: 0 0 auto;
  padding: 0.6rem 1.2rem;
  background-color: ${({ active }) => (active ? '#0070f3' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap; /* ✅ 줄바꿈 방지 */
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? '#005bb5' : '#ddd')};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  margin: 0 auto 1.5rem;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
  }
`;

export const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  font-size: 1.1rem;
  line-height: 2rem;

  li {
    margin-bottom: 1rem;
  }
`;
export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
  text-align: left;
`;

export const ProductCard = styled.div`
  display: flex; /* 좌우 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 50px; /* 이미지와 텍스트 사이 간격 */
  border: 1px solid #ddd;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  /* <a>(Link)로 렌더링될 때 기본 링크 스타일 제거 */
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* 모바일: 사진을 줄여서라도 텍스트가 2줄 안에 깔끔히 들어오게 */
  @media (max-width: 599px) {
    gap: 14px;

    h3, p {
      flex: 1;
      min-width: 0;
      margin: 6px 0;
      word-break: keep-all;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    h3 {
      font-size: 1rem;
      line-height: 1.45;
    }

    p {
      font-size: 0.85rem;
      line-height: 1.4;
      color: #666;
    }
  }
`;

export const ProductImage = styled.img`
  max-height: 100px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;

  @media (max-width: 599px) {
    width: 96px;
    max-height: 72px;
  }
`;
export const ExampleComparisonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

export const ExampleComparisonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
`;

export const ExampleImages = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fafafa;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const ComparisonTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  text-align: center;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: row; /* 기본값: 한 줄 */
  justify-content: center;
  flex-wrap: wrap; /* 혹시 너무 길어질 경우 대비 */
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: column; 
    gap: 0;
  }
`;
export const TitleFont = styled.p`
  font-size: 32px;
  font-weight: bold;
  @media (max-width: 600px) {
    margin-top: -10px;
  }
`;
export const NoResult = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #666;
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
export const SubTabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0 25px 0;
  gap: 30px;

  max-width: 600px;   /* 최대 가로 너비 설정 (필요에 따라 조절) */
  flex-wrap: wrap;    /* 넘치면 줄바꿈 */
`;

export const SubTab = styled.button`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? '#0073e6' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;

  min-width: 80px;    /* 최소 너비 */
  text-align: center;

  &:hover {
    background-color: ${({ active }) => (active ? '#005bb5' : '#d9d9d9')};
  }
`;