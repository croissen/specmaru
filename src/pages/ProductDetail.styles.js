// src/pages/ProductDetail.styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 720px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 20px 0;
  border-radius: 8px;
  object-fit: contain;
  margin: 20px auto;
`;

export const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    padding: 12px 15px;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f4f4f4;
    text-align: left;
    width: 35%;
  }

  td {
    background-color: #fafafa;
  }
`;

export const BuyButton = styled.a`
  display: inline-block;
  padding: 12px 18px;
  margin-right: 15px;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const CompareButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1e7e34;
  }
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

export const CoupangMent = styled.div`
  margin-top: 50px;
  font-size: 12px;
  text-align: center;
`;
export const ButtonDiv = styled.div`
  display:flex;
  justify-content:center;
`;
export const ImageSliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 1.5rem auto;
`;

export const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 24px;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  transition: all 0.3s ease;

 &:hover,
  &:focus:hover {
    color: #0070f3;
    background: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
    box-shadow: none;
    color: #555; /* 기본 색상 */
    background: rgba(255, 255, 255, 0.7); /* 기본 배경 */
  }

  &:first-of-type {
    left: -100px;
  }

  &:last-of-type {
    right: -100px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0.2rem 0.4rem;

    &:first-of-type {
      left: 1px;
    }

    &:last-of-type {
      right: 1px;
    }
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0.2rem 0.4rem;

    &:first-of-type {
      left: 1px; /* 모바일에서는 이미지 바로 옆 */
    }
    &:last-of-type {
      right: 1px;
    }
  }
`;

export const SliderImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
  display: block;
`;
