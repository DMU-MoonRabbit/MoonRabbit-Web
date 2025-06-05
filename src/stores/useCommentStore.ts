import { create } from 'zustand'

export interface Comment {
  id: number;
  profileImage: string;
  author: string;
  content: string;
  date: string;
  like: boolean;
  replies: Comment[];
}

interface CommentStore {
  comments: Comment[]
  replyTargetId: number | null
  inputValues: Record<string | number, string>
  setReplyTargetId: (id: number | null) => void
  setInputValue: (key: string | number, value: string) => void
  commentContent: string
  setCommentContent: (content: string) => void
  replyContents: { [id: number]: string }
  setReplyContent: (id: number, content: string) => void
  toggleCommentLike: (id: number) => void
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
]

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: initialComments,
  replyTargetId: null,
  inputValues: {},

  setReplyTargetId: (id) => set({ replyTargetId: id }),

  setInputValue: (key, value) =>
    set(state => ({
      inputValues: { ...state.inputValues, [key]: value }
    })),

  commentContent: '',
  setCommentContent: (content) => set({ commentContent: content }),

  replyContents: {},
  setReplyContent: (id, content) =>
    set((state) => ({
      replyContents: {
        ...state.replyContents,
        [id]: content,
      },
    })),

  toggleCommentLike: (id) =>
    set((state) => ({
      comments: toggleLikeRecursive(state.comments, id),
  })),
}))
