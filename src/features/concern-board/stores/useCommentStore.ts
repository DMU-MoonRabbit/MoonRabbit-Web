import { create } from 'zustand'
import axios from 'axios'
import { EquippedItem } from '../../features/mypage/types/user'

// equippedItems에서 테두리와 닉네임 색상 추출하는 헬퍼 함수
const parseEquippedItems = (equippedItems?: EquippedItem[]) => {
  if (!equippedItems || !Array.isArray(equippedItems)) {
    return { borderImageUrl: undefined, nicknameColor: undefined }
  }

  const borderItem = equippedItems.find(item => item.type === 'BORDER')
  const nicknameColorItem = equippedItems.find(item => item.type === 'NAME_COLOR')
  
  // 닉네임 색상은 이미지 URL에서 색상 이름을 추출하여 색상 값으로 변환
  let nicknameColor: string | undefined
  if (nicknameColorItem?.imageUrl) {
    const colorName = nicknameColorItem.imageUrl.match(/NameColor_(\w+)\.png/)?.[1]
    if (colorName) {
      const colorMap: Record<string, string> = {
        'magenta': '#EC4899',
        'cyan': '#7DD3FC', 
        'space_gray': '#D4D4D4',
        'pastel_peach': '#FCA5A5'
      }
      nicknameColor = colorMap[colorName]
    }
  }

  return {
    borderImageUrl: borderItem?.imageUrl,
    nicknameColor
  }
}

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
  likedByMe?: boolean  // API에서 제공하는 좋아요 상태
  replies?: Comment[]  // optional로 변경
  equippedItems?: EquippedItem[]  // API에서 제공되는 장착 아이템
  borderImageUrl?: string  // 작성자의 장착 테두리
  nicknameColor?: string   // 작성자의 장착 닉네임 색상
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
  updateComment: (id: number, updates: Partial<Comment>) => void
  deleteComment: (commentId: number) => Promise<boolean>
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

function updateCommentRecursive(comments: Comment[], id: number, updates: Partial<Comment>): Comment[] {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, ...updates }
    }
    const updatedReplies = updateCommentRecursive(comment.replies ?? [], id, updates)
    return { ...comment, replies: updatedReplies }
  })
}

// 댓글과 답글 구조 설정
function buildCommentTree(flatComments: Comment[]): Comment[] {
  const commentMap: { [id: number]: Comment & { replies: Comment[] } } = {}
  const rootComments: Comment[] = []

  flatComments.forEach((comment) => {
    // equippedItems 파싱하여 borderImageUrl과 nicknameColor 설정
    const { borderImageUrl, nicknameColor } = parseEquippedItems(comment.equippedItems)
    
    commentMap[comment.id] = { 
      ...comment, 
      replies: [],
      borderImageUrl,
      nicknameColor
    }
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

  updateComment: (id, updates) =>
    set((state) => ({
      comments: updateCommentRecursive(state.comments, id, updates),
    })),

  deleteComment: async (commentId: number) => {
    const token = localStorage.getItem('accessToken')
    if (!token) return false

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
      return true
    } catch (err) {
      console.error('댓글 삭제 실패', err)
      return false
    }
  },
}))
