import { create } from 'zustand'

import axios from '@/api/axios'
import { EquippedItem } from '@/features/mypage/types/user'

// 기존 ConcernStore Concern, Board, PageInfo 타입 등 복사
interface Answer {
  id: number
  content: string
  createdAt: string
  likeCount: number
  reportCount: number
  parentId: number
  userId: number
  nickname: string
  profileImg: string
  equippedItems?: EquippedItem[] // API에서 제공되는 장착 아이템
}

export interface Board {
  boardId: number
  userId: number
  title: string
  content: string
  category: string
  answers: Answer[]
  nickname: string
  profileImg: string
  equippedItems?: EquippedItem[] // API에서 제공되는 장착 아이템
  anonymous?: boolean // 익명 게시글 여부
}

export interface Concern {
  id: number
  userId: number // 작성자 userId 추가
  profileImage: string
  title: string
  category: string
  content: string
  recentComment: {
    author: string
    text: string
  }
  date: string
  backgroundImage: string
  borderImageUrl?: string // 작성자의 장착 테두리
  nicknameColor?: string // 작성자의 장착 닉네임 색상
  isAnonymous?: boolean // 익명 게시글 여부
}

export interface PageInfo {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}

// Concern 상세 타입
export interface ConcernArticle {
  id: number
  userId?: number // 작성자 userId 추가
  title: string
  profileImg: string
  nickname: string
  content: string
  createdAt: string
  answer: string
  like: boolean
  equippedItems?: EquippedItem[] // API에서 제공되는 장착 아이템
  borderImageUrl?: string // 작성자의 장착 테두리
  nicknameColor?: string // 작성자의 장착 닉네임 색상
  isAnonymous?: boolean // 익명 게시글 여부
}

interface UnifiedConcernStore {
  // 목록/카테고리/작성/페이징
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]
  pageInfo: PageInfo
  isModalOpen: boolean
  newConcernTitle: string
  newConcernContent: string
  newConcernCategory: string
  setSelectedCategory: (category: string) => void
  setIsModalOpen: (isOpen: boolean) => void
  setNewConcernTitle: (title: string) => void
  setNewConcernContent: (content: string) => void
  setNewConcernCategory: (category: string) => void
  resetForm: () => void
  fetchConcerns: (page?: number) => Promise<void>
  setPage: (page: number) => void

  // 상세/상호작용
  concern?: ConcernArticle
  setConcern: (concern: ConcernArticle) => void
  toggleConcernLike: () => void
}

// equippedItems에서 테두리와 닉네임 색상 추출하는 헬퍼 함수
const parseEquippedItems = (equippedItems?: EquippedItem[]) => {
  if (!equippedItems || !Array.isArray(equippedItems)) {
    return { borderImageUrl: undefined, nicknameColor: undefined }
  }

  const borderItem = equippedItems.find((item) => item.type === 'BORDER')
  const nicknameColorItem = equippedItems.find(
    (item) => item.type === 'NAME_COLOR',
  )

  // 닉네임 색상은 이미지 URL에서 색상 이름을 추출하여 색상 값으로 변환
  let nicknameColor: string | undefined
  if (nicknameColorItem?.imageUrl) {
    const colorName =
      nicknameColorItem.imageUrl.match(/NameColor_(\w+)\.png/)?.[1]
    if (colorName) {
      const colorMap: Record<string, string> = {
        magenta: '#EC4899',
        cyan: '#7DD3FC',
        space_gray: '#D4D4D4',
        pastel_peach: '#FCA5A5',
      }
      nicknameColor = colorMap[colorName]
    }
  }

  return {
    borderImageUrl: borderItem?.imageUrl,
    nicknameColor,
  }
}

export const transformBoardToConcern = (board: Board): Concern => {
  // 익명 게시글일 경우 장착 아이템을 표시하지 않음
  const { borderImageUrl, nicknameColor } = board.anonymous
    ? { borderImageUrl: undefined, nicknameColor: undefined }
    : parseEquippedItems(board.equippedItems)

  return {
    id: board.boardId,
    userId: board.userId, // userId 포함
    profileImage:
      board.anonymous || !board.profileImg
        ? '/images/MoonRabbitSleep2.png'
        : board.profileImg,
    title: board.title,
    category: board.category,
    content: board.content,
    recentComment:
      board.answers.length > 0
        ? {
            author: board.answers[0].nickname || '달토끼',
            text: board.answers[0].content,
          }
        : {
            author: '달토끼',
            text: '아직 답변이 없어요. 첫 답변을 남겨보세요!',
          },
    date: new Date(board.answers[0]?.createdAt || new Date())
      .toISOString()
      .split('T')[0],
    backgroundImage: '/images/ConcernBackground.png',
    borderImageUrl, // 익명이면 undefined
    nicknameColor, // 익명이면 undefined
    isAnonymous: board.anonymous, // 익명 여부 추가
  }
}

export const useUnifiedConcernStore = create<UnifiedConcernStore>(
  (set, get) => ({
    // 목록/카테고리/작성/페이징
    concerns: [],
    selectedCategory: '전체',
    filteredConcerns: [],
    pageInfo: {
      totalPages: 0,
      totalElements: 0,
      first: true,
      last: true,
      size: 9,
      number: 0,
      numberOfElements: 0,
      empty: true,
    },
    isModalOpen: false,
    newConcernTitle: '',
    newConcernContent: '',
    newConcernCategory: '학교',

    setSelectedCategory: (category) => {
      const { concerns } = get()
      const selectedCategory = category || '전체'
      const filtered =
        selectedCategory === '전체'
          ? concerns
          : concerns.filter((concern) => concern.category === selectedCategory)

      set({
        selectedCategory,
        filteredConcerns: filtered,
      })
    },

    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    setNewConcernTitle: (title) => set({ newConcernTitle: title }),
    setNewConcernContent: (content) => set({ newConcernContent: content }),
    setNewConcernCategory: (category) =>
      set({ newConcernCategory: category || '전체' }),

    resetForm: () =>
      set({
        newConcernTitle: '',
        newConcernContent: '',
        newConcernCategory: '전체',
      }),

    setPage: (page) => {
      const { pageInfo } = get()
      set({
        pageInfo: {
          ...pageInfo,
          number: page,
        },
      })
    },

    fetchConcerns: async (page = 0) => {
      try {
        const { pageInfo } = get()
        const response = await axios.get(
          `https://moonrabbit-api.kro.kr/api/boards/list?page=${page}&size=${pageInfo.size}`,
        )
        const boards: Board[] = response.data.content
        const concerns = boards.map(transformBoardToConcern)

        set({
          concerns,
          filteredConcerns: concerns,
          pageInfo: {
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            first: response.data.first,
            last: response.data.last,
            size: response.data.size,
            number: response.data.number,
            numberOfElements: response.data.numberOfElements,
            empty: response.data.empty,
          },
        })
      } catch {
        // 에러 처리
      }
    },

    // 상세/상호작용
    concern: undefined,
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
  }),
)
