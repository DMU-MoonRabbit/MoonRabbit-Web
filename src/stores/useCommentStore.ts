import { create } from 'zustand'
import axios from 'axios';

export interface Comment {
  id: number;
  profileImg: string;
  nickname: string;
  userId: number;
  parentId: number;
  content: string;
  createdAt: string;
  likeCount: number;
  reportCount: number;
  like: boolean;
  replies: Comment[];
}

interface CommentStore {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
  addComment: (newComment: Comment, parentId?: number | null) => void
  replyTargetId: number | null
  inputValues: Record<string | number, string>
  setReplyTargetId: (id: number | null) => void
  setInputValue: (key: string | number, value: string) => void
  commentContent: string
  setCommentContent: (content: string) => void
  replyContents: { [id: number]: string }
  setReplyContent: (id: number, content: string) => void
  toggleCommentLike: (id: number) => void
  currentUser: string;
  setCurrentUser: (user: string) => void;
  deleteComment: (commentId: number) => void;
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

function insertReplyRecursive(comments: Comment[], parentId: number, reply: Comment): Comment[] {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [reply, ...comment.replies]
      }
    }
    return {
      ...comment,
      replies: insertReplyRecursive(comment.replies, parentId, reply)
    }
  })
}

function removeCommentRecursive(comments: Comment[], id: number): Comment[] {
  return comments
    .filter(comment => comment.id !== id)
    .map(comment => ({
      ...comment,
      replies: removeCommentRecursive(comment.replies, id)
    }))
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  setComments: (comments) => set({ comments }),

  addComment: (newComment, parentId = null) => {
    const updated = [...get().comments]

    if (parentId === null) {
      set({ comments: [newComment, ...updated] })
    } else {
      const updatedComments = insertReplyRecursive(updated, parentId, newComment)
      set({ comments: updatedComments })
    }
  },

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
  currentUser: '',
  setCurrentUser: (user) => set({ currentUser: user }),

  deleteComment: async (commentId: number) => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    try {
      await axios.delete(`http://moonrabbit-api.kro.kr/api/answer/delete/${commentId}`, {
          headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const updatedComments = removeCommentRecursive(get().comments, commentId)
      set({ comments: updatedComments })
    } catch (err) {
      console.error('댓글 삭제 실패', err)
    }
  }
}))
