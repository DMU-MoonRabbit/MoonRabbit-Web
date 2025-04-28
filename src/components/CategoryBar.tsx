import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px 16px;
  margin: 0 auto 32px;
  max-width: 680px;
  padding: 0 20px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 8px 8px;
    max-width: 100%;
    padding: 0 4px;
  }
`;

const CategoryButton = styled.button<{ isActive?: boolean }>`
  width: 80px;
  height: 28px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.isActive ? 'var(--color-mainColor)' : 'var(--color-white)'};
  color: ${props => props.isActive ? 'var(--color-white)' : 'var(--color-mainColor)'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
  }
`;

interface CategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  '전체',
  '가족',
  '연인',
  '진로',
  '정신건강',
  '사회생활',
  '대인관계'
];

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          isActive={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default CategoryBar; 