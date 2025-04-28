import React from 'react';
import styled, { css } from 'styled-components';
import { useResponsiveStore } from '../stores/useResponsiveStore';

// ConcernCard 컴포넌트의 props 타입 정의
interface ConcernCardProps {
  profileImage: string;
  title: string;
  category: string;
  content: string;
  recentComment: {
    author: string;
    text: string;
  };
  date?: string;
  backgroundImage?: string;
}

// 자주 사용되는 스타일 믹스인
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 텍스트 말줄임(...) 처리를 위한 믹스인
const textEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 좌우로 움직이는 애니메이션
const floatingAnimation = css`
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-0.5rem) rotate(1deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  animation: float 4s ease-in-out infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

// 카드의 기본 컨테이너
const Card = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  max-width: 35rem;
  height: auto;
  min-height: 16.25rem;
  position: relative;
  background: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'url(/images/ConcernBackground.png)'};
  background-size: 100% 100%;
  background-position: center;
  border-radius: 1.5rem;
  overflow: hidden;
  margin: 0 auto;
  ${flexCenter}
  padding: 0 0.625rem;
  transition: transform 0.2s ease-in-out;
  ${floatingAnimation}

  &:hover {
    transform: translateY(-0.125rem);
  }
`;

// 카드 내부 콘텐츠를 감싸는 컨테이너
const CardContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 0 0.3125rem;
`;

// 프로필 이미지 컨테이너
const ProfileImage = styled.div`
  position: absolute;
  left: 1.875rem;
  top: 1.1875rem;
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  background: var(--color-lightBackground);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 제목 텍스트
const Title = styled.h3`
  position: absolute;
  left: 7.5rem;
  top: 1.5rem;
  font-size: 1.2rem;
  font-family: var(--font-mainFont);
  color: var(--color-darkWalnut);
  background: var(--color-lightBeige);
  border-radius: 2.5rem;
  padding: 0.375rem 1rem;
  line-height: 1.2;
  margin: 0;
  max-width: 23.75rem;
  ${textEllipsis}
`;

// 카테고리 태그
const CategoryButton = styled.span`
  position: absolute;
  left: 7.5rem;
  top: 4.25rem;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1.25rem;
  background-color: var(--color-lightBeige);
  color: var(--color-mainColor);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-0.0625rem);
  }
`;

// 본문 내용 컨테이너
const Content = styled.div`
  position: absolute;
  left: 1.875rem;
  top: 7.4375rem;
  width: calc(100% - 3.75rem);
  max-width: 29.375rem;
  height: 4rem;
  background: var(--color-white);
  border-radius: 1.25rem;
  padding: 0.5rem 1rem;
`;

// 본문 텍스트 (2줄 제한)
const ContentText = styled.p`
  font-size: 1rem;
  color: var(--color-darkWalnut);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 날짜 표시
const Date = styled.span`
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  font-size: 0.7rem;
  color: var(--color-darkWalnut);
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

// 댓글 섹션 컨테이너
const CommentSection = styled.div`
  position: absolute;
  left: 1.875rem;
  bottom: 1.3125rem;
  width: calc(100% - 3.75rem);
  max-width: 29.375rem;
  height: 2rem;
  background: var(--color-lightBeige);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
`;

// 댓글 작성자
const CommentAuthor = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mainBlack);
  margin-right: 0.5rem;
  ${textEllipsis}
`;

// 댓글 내용
const CommentText = styled.p`
  font-size: 0.9rem;
  color: var(--color-mainBlack);
  margin: 0;
  line-height: 1.4;
  ${textEllipsis}
`;

// 카테고리 컨테이너
const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  margin: 0 auto 32px;
  max-width: 680px;
  padding: 0 20px;
  justify-content: center;

  @media (max-width: 600px) {
    gap: 8px 8px;
    max-width: 100%;
    padding: 0 4px;
  }
`;

// ConcernCard 컴포넌트
const ConcernCard: React.FC<ConcernCardProps> = ({
  profileImage,
  title,
  category,
  content,
  recentComment,
  date,
  backgroundImage
}) => {
  const res = useResponsiveStore((state) => state.res);

  // 모바일
  const mobileStyles = {
    card: res === 'mo' ? {
      maxWidth: '100%',
      borderRadius: '1rem',
      backgroundSize: '100% 100%',
      padding: '0 0.9375rem'
    } : {},
    cardContent: res === 'mo' ? {
      padding: '0 0.3125rem',
      width: '100%'
    } : {},
    profileImage: res === 'mo' ? {
      width: '3.75rem',
      height: '3.75rem',
      borderRadius: '1.875rem',
      left: '1.875rem',
      top: '0.9375rem'
    } : {},
    title: res === 'mo' ? {
      left: '6.25rem',
      top: '0.9375rem',
      fontSize: '1rem',
      padding: '0.25rem 0.75rem',
      maxWidth: 'calc(100% - 7.5rem)'
    } : {},
    category: res === 'mo' ? {
      left: '6.25rem',
      top: '3.75rem',
      fontSize: '0.8rem',
      padding: '0.25rem 0.5rem',
      maxWidth: 'calc(100% - 7.5rem)'
    } : {},
    content: res === 'mo' ? {
      left: '1.875rem',
      top: '6.25rem',
      height: 'auto',
      minHeight: '3.75rem',
      padding: '0.5rem 0.75rem',
      width: 'calc(100% - 3.75rem)'
    } : {},
    contentText: res === 'mo' ? {
      fontSize: '0.9rem'
    } : {},
    date: res === 'mo' ? {
      right: '0.75rem',
      bottom: '0.375rem',
      fontSize: '0.65rem'
    } : {},
    commentSection: res === 'mo' ? {
      left: '1.875rem',
      bottom: '0.9375rem',
      height: 'auto',
      minHeight: '1.75rem',
      padding: '0.25rem 0.75rem',
      width: 'calc(100% - 3.75rem)',
      justifyContent: 'flex-start'
    } : {},
    commentAuthor: res === 'mo' ? {
      fontSize: '0.8rem',
      marginRight: '0.375rem'
    } : {},
    commentText: res === 'mo' ? {
      fontSize: '0.8rem'
    } : {}
  };

  return (
    <Card backgroundImage={backgroundImage} style={mobileStyles.card}>
      <CardContent style={mobileStyles.cardContent}>
        <ProfileImage style={mobileStyles.profileImage}>
          <img src={profileImage} alt="Profile" />
        </ProfileImage>
        <Title style={mobileStyles.title}>{title}</Title>
        <CategoryContainer>
          {category.split(',').map((cat, index) => (
            <CategoryButton key={index}>{cat.trim()}</CategoryButton>
          ))}
        </CategoryContainer>
        <Content style={mobileStyles.content}>
          <ContentText style={mobileStyles.contentText}>{content}</ContentText>
          {date && <Date style={mobileStyles.date}>{date}</Date>}
        </Content>
        <CommentSection style={mobileStyles.commentSection}>
          <CommentAuthor style={mobileStyles.commentAuthor}>{recentComment.author}:</CommentAuthor>
          <CommentText style={mobileStyles.commentText}>{recentComment.text}</CommentText>
        </CommentSection>
      </CardContent>
    </Card>
  );
};

export default ConcernCard;