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
  padding: 12px 24px;
  margin-right: 15px;
  background-color: #007bff;
  color: white;
  font-weight: 600;
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
    text-decoration: underline;
  }
`;
