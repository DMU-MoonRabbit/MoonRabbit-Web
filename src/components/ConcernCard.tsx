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

// 카드의 기본 컨테이너
const Card = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  max-width: 560px;
  height: auto;
  min-height: 260px;
  position: relative;
  background: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'url(/images/ConcernBackground.png)'};
  background-size: 100% 100%;
  background-position: center;
  border-radius: 24px;
  overflow: hidden;
  margin: 0 auto;
  ${flexCenter}
  padding: 0 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

// 카드 내부 콘텐츠를 감싸는 컨테이너
const CardContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 0 5px;
`;

// 프로필 이미지 컨테이너
const ProfileImage = styled.div`
  position: absolute;
  left: 30px;
  top: 19px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
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

// 제목 컨테이너
const TitleSection = styled.div`
  position: absolute;
  left: 120px;
  top: 19px;
  width: calc(100% - 140px);
  max-width: 380px;
  height: 44px;
  background: var(--color-lightBackground);
  border-radius: 20px;
  padding: 0 12px;
  transition: background-color 0.2s ease-in-out;
`;

// 제목 텍스트
const Title = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-mainFont);
  color: var(--color-darkWalnut);
  background: var(--color-lightBeige);
  border-radius: 40px;
  padding: 6px 16px;
  line-height: 1.2;
  ${textEllipsis}
`;

// 카테고리 태그
const Category = styled.span`
  position: absolute;
  left: 120px;
  top: 71px;
  font-size: 0.9rem;
  color: var(--color-accent);
  background: var(--color-white);
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }
`;

// 본문 내용 컨테이너
const Content = styled.div`
  position: absolute;
  left: 30px;
  top: 119px;
  width: calc(100% - 60px);
  max-width: 470px;
  height: 64px;
  background: var(--color-white);
  border-radius: 20px;
  padding: 8px 16px;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
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
  right: 16px;
  bottom: 8px;
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
  left: 30px;
  bottom: 21px;
  width: calc(100% - 60px);
  max-width: 470px;
  height: 32px;
  background: var(--color-lightBeige);
  border-radius: 40px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
`;

// 댓글 작성자
const CommentAuthor = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-darkWalnut);
  margin-right: 8px;
  ${textEllipsis}
`;

// 댓글 내용
const CommentText = styled.p`
  font-size: 0.9rem;
  color: var(--color-darkWalnut);
  margin: 0;
  line-height: 1.2;
  ${textEllipsis}
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
      borderRadius: '16px',
      backgroundSize: '100% 100%',
      padding: '0 15px'
    } : {},
    cardContent: res === 'mo' ? {
      padding: '0 5px',
      width: '100%'
    } : {},
    profileImage: res === 'mo' ? {
      width: '60px',
      height: '60px',
      borderRadius: '30px',
      left: '30px',
      top: '15px'
    } : {},
    titleSection: res === 'mo' ? {
      left: '100px',
      top: '15px',
      height: '40px',
      padding: '8px 10px',
      width: 'calc(100% - 120px)'
    } : {},
    title: res === 'mo' ? {
      fontSize: '1rem'
    } : {},
    category: res === 'mo' ? {
      left: '100px',
      top: '60px',
      fontSize: '0.8rem',
      padding: '4px 8px'
    } : {},
    content: res === 'mo' ? {
      left: '30px',
      top: '100px',
      height: 'auto',
      minHeight: '60px',
      padding: '8px 12px',
      width: 'calc(100% - 60px)'
    } : {},
    contentText: res === 'mo' ? {
      fontSize: '0.9rem'
    } : {},
    date: res === 'mo' ? {
      right: '12px',
      bottom: '6px',
      fontSize: '0.65rem'
    } : {},
    commentSection: res === 'mo' ? {
      left: '30px',
      bottom: '15px',
      height: 'auto',
      minHeight: '28px',
      padding: '4px 12px',
      width: 'calc(100% - 60px)',
      justifyContent: 'flex-start'
    } : {},
    commentAuthor: res === 'mo' ? {
      fontSize: '0.8rem',
      marginRight: '6px'
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
        <TitleSection style={mobileStyles.titleSection}>
          <Title style={mobileStyles.title}>{title}</Title>
        </TitleSection>
        <Category style={mobileStyles.category}>{category}</Category>
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