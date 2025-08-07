import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
  overflow-x: auto;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 0;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HomeButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

export const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
    white-space: normal;
  }

  th:first-child,
  td:first-child {
    width: 20%;
    font-weight: bold;
    background-color: #f9f9f9;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    width: 35%;
  }
`;

export const ProductImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 240px;
  margin: 8px auto;
  object-fit: contain;
`;

export const BuyButton = styled.button`
  display: inline-block;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 6px;

  &:hover {
    background-color: #0056b3;
  }
`;

/* 새로 추가하는 비교 대상 추가 버튼 스타일 */
export const AddCompareButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 14px;
  border: 2px dashed #007bff;
  color: #007bff;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  margin: 12px 0;

  &:hover {
    background-color: #e6f0ff;
  }
`;

/* 비교 대상 선택 모달 오버레이 */
export const SelectorOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

/* 비교 대상 선택 모달 컨테이너 */
export const SelectorContainer = styled.div`
  background: white;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.2);
`;

/* 제품 리스트 스타일 */
export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

/* 제품 카드 스타일 */
export const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  width: 140px;
  cursor: pointer;
  text-align: center;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 0 8px #007bff;
  }

  h4 {
    margin: 8px 0 0 0;
    font-size: 14px;
    color: #333;
  }
`;

/* 모달 닫기 버튼 */
export const CloseButton = styled.button`
  margin-top: 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #b02a37;
  }
`;

export const MinusBtn = styled.button`
  width:20px;
  height:20px;
  cursor: pointer;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
`;
export const SearchIn = styled.input`
  width: 80%;
  padding: 6px;
`;
export const SearchDiv = styled.div`
  max-height: 200px;
  overflow-y: auto;
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const TitleDiv = styled.div`
  min-height: 50px; 
  display:flex;
  justify-content: space-between;
`;
export const CoupangMent = styled.div`
  margin-top: 50px;
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