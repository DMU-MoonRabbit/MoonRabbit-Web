import { create } from 'zustand'

interface ConcernArticle {
  id: number;
  title: string;
  profileImage: string;
  nickname: string;
  content: string;
  date: string;
  answer: string;
  like: boolean;
}

interface Comment {
  id: number;
  profileImage: string;
  author: string;
  content: string;
  date: string;
  like: boolean;
  replies: Comment[];
}

interface ConcernState {
  concern?: ConcernArticle;
  comments: Comment[];
  setConcern: (concern: ConcernArticle) => void;
  addComment: (comment: Comment) => void;
  addReply: (parentId: number, reply: Comment) => void;
  toggleConcernLike: () => void;
  toggleCommentLike: (id: number) => void;

  replyTargetId: number | null;
  setReplyTargetId: (id: number | null) => void;
  commentContent: string
  setCommentContent: (content: string) => void
  replyContents: { [id: number]: string }
  setReplyContent: (id: number, content: string) => void
}

function toggleLikeRecursive(comments: Comment[], id: number): Comment[] {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, like: !comment.like }
    }
    const updatedReplies = toggleLikeRecursive(comment.replies, id)
    return { ...comment, replies: updatedReplies }
  })
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
};
const initialComments: Comment[] = [
  {
    id: 1,
    author: '익명1',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    content: '저도 작년에 그랬는데 결국 좋은 결과 있었어요!',
    date: '2025.06.03',
    like: true,
    replies: [
      {
        id: 4,
        author: '익명4',
        profileImage: 'https://i.pravatar.cc/150?img=1',
        content: '우와 용기 얻고 갑니다.',
        date: '2025.06.03',
        like: false,
        replies: [],
      },
      {
        id: 5,
        author: '익명5',
        profileImage: 'https://i.pravatar.cc/150?img=1',
        content: '우와 용기 얻고 갑니다.',
        date: '2025.06.03',
        like: false,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: '익명2',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    content: '너무 자책하지 마세요. 누구나 실수할 수 있어요.',
    date: '2025.06.04',
    like: false,
    replies: [],
  },
];


export const useConcernDetailStore = create<ConcernState>((set) => ({
  concern: initialConcern,
  comments: initialComments,
  setConcern: (concern) => set(() => ({ concern })),
  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),

  addReply: (parentId, reply) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...c.replies, reply] }
          : c
      ),
    })),

  toggleConcernLike: () =>
    set((state) => {
      if (!state.concern) return {};
      return {
        concern: {
          ...state.concern,
          like: !state.concern.like,
        },
      };
  }),

  toggleCommentLike: (id) =>
    set((state) => ({
      comments: toggleLikeRecursive(state.comments, id),
    })),

  commentContent: '',
  setCommentContent: (content) => set({ commentContent: content }),
  
  replyTargetId: null,
  setReplyTargetId: (id) => set(() => ({ replyTargetId: id })),
  replyContents: {},
  setReplyContent: (id, content) =>
    set((state) => ({
      replyContents: {
        ...state.replyContents,
        [id]: content,
      },
    })),
}))