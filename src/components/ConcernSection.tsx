import React from 'react';
import styled from 'styled-components';
import ConcernCard from './ConcernCard';
import { useResponsiveStore } from '../stores/useResponsiveStore';

const Section = styled.section`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 47px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-family: var(--font-mainFont);
  color: var(--color-darkWalnut);
  text-align: center;
  margin-bottom: 16px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  font-family: var(--font-mainFont);
  color: var(--color-lightWalnut);
  text-align: center;
  margin-bottom: 32px;
`;

const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 24px;
  margin: 0 auto;
  max-width: 1800px;
`;

const ConcernSection: React.FC = () => {
  const res = useResponsiveStore((state) => state.res);
  const columns = res === 'pc' ? 3 : 1;

  // 임시 데이터
  const concerns = [
    {
      id: 1,
      profileImage: '/images/default-profile.png',
      title: '학교 생활이 힘들어요',
      category: '학교',
      content: '친구들과 잘 어울리지 못하고 있어요. 어떻게 하면 좋을까요?',
      recentComment: {
        author: '달토끼',
        text: '천천히 친해져도 괜찮아요. 당신의 페이스대로 진행하세요.'
      }
    },
    {
      id: 2,
      profileImage: '/images/default-profile.png',
      title: '취업 준비가 걱정돼요',
      category: '취업',
      content: '졸업을 앞두고 있는데, 취업 준비가 너무 걱정됩니다.',
      recentComment: {
        author: '달토끼',
        text: '차근차근 준비하시면 좋은 결과가 있을 거예요.'
      }
    },
    {
      id: 3,
      profileImage: '/images/default-profile.png',
      title: '가족 관계가 어려워요',
      category: '가족',
      content: '부모님과 자주 다투게 되고 있어요. 어떻게 대화해야 할지 모르겠어요.',
      recentComment: {
        author: '달토끼',
        text: '서로의 입장을 이해하려 노력해보세요.'
      }
    }
  ];

  return (
    <Section>
      <Title>달토끼의 밤하늘</Title>
      <SubTitle>벌써 2,193개의 고민들이 밤하늘을 수놓고 있어요.</SubTitle>
      <Grid columns={columns}>
        {concerns.map(concern => (
          <ConcernCard
            key={concern.id}
            profileImage={concern.profileImage}
            title={concern.title}
            category={concern.category}
            content={concern.content}
            recentComment={concern.recentComment}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default ConcernSection; 