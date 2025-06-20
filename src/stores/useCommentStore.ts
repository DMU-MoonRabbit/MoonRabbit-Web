import { create } from 'zustand'
import axios from 'axios'

export interface Comment {
  id: number
  profileImg: string
  nickname: string
  userId: number
  parentId: number
  content: string
  createdAt: string
  likeCount: number
  reportCount: number
  like: boolean // 나중에 삭제
  replies?: Comment[]  // optional로 변경
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
  deleteComment: (commentId: number) => void
}

function toggleLikeRecursive(comments: Comment[], id: number): Comment[] {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, like: !comment.like }
    }
    const updatedReplies = toggleLikeRecursive(comment.replies ?? [], id)
    return { ...comment, replies: updatedReplies }
  })
}

function insertReplyRecursive(
  comments: Comment[],
  parentId: number,
  reply: Comment,
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies ?? []), reply],
      }
    }
    return {
      ...comment,
      replies: insertReplyRecursive(comment.replies ?? [], parentId, reply),
    }
  })
}

function removeCommentRecursive(comments: Comment[], id: number): Comment[] {
  if (!Array.isArray(comments)) return []
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: removeCommentRecursive(comment.replies ?? [], id),
    }))
}

// 댓글과 답글 구조 설정
function buildCommentTree(flatComments: Comment[]): Comment[] {
  const commentMap: { [id: number]: Comment & { replies: Comment[] } } = {}
  const rootComments: Comment[] = []

  flatComments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] }
  })

  flatComments.forEach((comment) => {
    if (comment.parentId === 0 || comment.parentId === null) {
      rootComments.push(commentMap[comment.id])
    } else {
      const parent = commentMap[comment.parentId]
      if (parent) {
        parent.replies.push(commentMap[comment.id])
      } else {
        rootComments.push(commentMap[comment.id])
      }
    }
  })

  return rootComments
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  setComments: (comments) => {
    const tree = buildCommentTree(comments)
    set({ comments: tree })
  },

  addComment: (newComment, parentId = null) => {
    const updated = [...get().comments]

    if (parentId === null) {
      set({ comments: [...updated, newComment] })
    } else {
      const updatedComments = insertReplyRecursive(
        updated,
        parentId,
        newComment,
      )
      set({ comments: updatedComments })
    }
  },

  replyTargetId: null,
  inputValues: {},

  setReplyTargetId: (id) => set({ replyTargetId: id }),

  setInputValue: (key, value) =>
    set((state) => ({
      inputValues: { ...state.inputValues, [key]: value },
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

  deleteComment: async (commentId: number) => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    try {
      await axios.delete(
        `https://moonrabbit-api.kro.kr/api/answer/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const updatedComments = removeCommentRecursive(get().comments, commentId)
      set({ comments: updatedComments })
      alert('삭제되었습니다!')
    } catch (err) {
      console.error('댓글 삭제 실패', err)
    }
  },
}))
