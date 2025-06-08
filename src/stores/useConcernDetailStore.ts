import { create } from 'zustand'

interface ConcernArticle {
  id: number
  title: string
  profileImage: string
  nickname: string
  content: string
  date: string
  answer: string
  like: boolean
}

interface ConcernState {
  concern?: ConcernArticle
  setConcern: (concern: ConcernArticle) => void
  toggleConcernLike: () => void
}

// 임시 데이터
const initialConcern: ConcernArticle = {
  id: 1,
  title: '시험 망친 것 같아요',
  profileImage: 'https://i.pravatar.cc/150?img=1',
  nickname: '익명고민러',
  content: `이번 시험 정말 열심히 준비했는데 너무 망친 것 같아서 자존감이 떨어져요. Or convallis nisi. Aenean euismod rutrum.
Susoendisse faxlilisis epsom et libere semper, non xonsextetir nisi geestas.
Sed pellentesque enim et enim xingte, eget pellentesqte tellis xinsextetur.
Nukka rgibxus consequent leom axx bikuoat bukka.
Sed pellentesque enim et enim xingte, eget pellentesqte tellis xinsextetur.
Nukka rgibxus consequent leom axx bikuoat bukka.
Or convallis nisi. Aenean euismod rutrum.
Susoendisse faxlilisis epsom et libere semper, non xonsextetir nisi geestas.`,
  date: '2025.06.03',
  answer: `안녕하세요, 글쓴님.
최근 친밀했던 사람에게 큰 상처를 받으셨군요. 나는 예상치 못한 배신감과 충격 속에서 오랫동안 힘들어하는데, 
정작 그 사람은 아무런 사과도 없이 삶을 즐기는 모습을 보면서 더욱 울하고 화가 나셨을 것 같아요.
상대방에게 원망하는 마음이 드는 동시에, 스스로도 이 감정에서 벗어나지 못하는 것에 대한 갈등이 있으신 것처럼 느껴졌습니다.`,
  like: false,
}

export const useConcernDetailStore = create<ConcernState>((set) => ({
  concern: initialConcern,
  setConcern: (concern) => set(() => ({ concern })),

  toggleConcernLike: () =>
    set((state) => {
      if (!state.concern) return {}
      return {
        concern: {
          ...state.concern,
          like: !state.concern.like,
        },
      }
    }),
}))
