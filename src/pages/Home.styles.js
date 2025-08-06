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
  overflow-x: auto;
  white-space: nowrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* ✅ PC 화면에서는 가운데 정렬 */
  @media (min-width: 600px) {
    justify-content: center;
  }

  /* ✅ 모바일에서는 왼쪽 정렬 (기본) */
  justify-content: flex-start;
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

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

export const ProductImage = styled.img`
  max-height: 100px;
  object-fit: contain;
  border-radius: 8px;
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