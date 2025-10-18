import React, { useEffect, useState } from 'react'
import { useUnifiedConcernStore } from '../stores/useUnifiedConcernStore'
import { useCommentStore, Comment } from '../stores/useCommentStore'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'
import { usePostAuthorItems } from '../hooks/usePostAuthorItems'
import { EquippedItem } from '../types/user'
import CommentIcon from '../assets/images/Comment.svg'
import Report from '../assets/images/Report.svg'
import Like from '../assets/images/likeThick.svg'
import Liked from '../assets/images/likedThick.svg'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import clsx from 'clsx'
import { ENDPOINTS } from '../api/endpoints'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import ReportModal from './ReportModal'
import { ReportCreateRequest } from '../types/report'
import MiniModal from './MiniModal'
import { useUserProfileStore } from '../stores/useUserProfileStore'

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

export const ConcernContent: React.FC = () => {
  const { concern, setConcern, toggleConcernLike, concerns } = useUnifiedConcernStore()
  const { comments } = useCommentStore()
  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)
  
  const { userProfile, fetchUserProfile } = useUserProfileStore()

  const { pageNumber } = useParams()
  const currentId = Number(pageNumber)
  const currentIndex = concerns.findIndex((c) => c.id === currentId)
  const navigate = useNavigate()
  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevId = concerns[currentIndex - 1].id
      navigate(`/night-sky/${prevId}`)
    }
  }
  const goToNext = () => {
    if (currentIndex < concerns.length - 1) {
      const nextId = concerns[currentIndex + 1].id
      navigate(`/night-sky/${nextId}`)
    }
  }

  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'

  // 신고 모달 상태
  const [reportModalOpen, setReportModalOpen] = useState(false)

  // 알림 모달 상태
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'error',
    message: ''
  })

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  // 신고 제출 함수
  const handleReportSubmit = async (reportData: ReportCreateRequest) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('로그인 후 신고할 수 있습니다.')
    }

    const response = await axios.post(
      ENDPOINTS.REPORT_CREATE,
      reportData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )

    console.log('신고 제출 성공:', response.data)
    return response.data
  }

  // 좋아요 토글 함수
  const handleLikeToggle = async () => {
    if (!concern) return

    const token = localStorage.getItem('accessToken')
    if (!token) {
      showModal('error', '로그인 후 좋아요를 누를 수 있습니다.')
      return
    }

    try {
      // userProfile에서 userId 가져오기
      let userId = userProfile?.id
      
      // 프로필이 로드되지 않았으면 먼저 로드
      if (!userId) {
        await fetchUserProfile()
        userId = useUserProfileStore.getState().userProfile?.id
      }

      if (!userId) {
        showModal('error', '사용자 정보를 불러올 수 없습니다.')
        return
      }

      const isCurrentlyLiked = concern.like

      let response
      
      if (isCurrentlyLiked) {
        // 좋아요 취소
        response = await axios.delete(
          ENDPOINTS.BOARD_LIKE(concern.id, userId),
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        )
      } else {
        // 좋아요 추가
        response = await axios.post(
          ENDPOINTS.BOARD_LIKE(concern.id, userId),
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        )
      }

      // API 응답에서 업데이트된 상태 반영
      // API가 전체 게시글 정보를 반환한다면 그것을 사용
      if (response.data && typeof response.data === 'object') {
        const updatedData = response.data
        
        // API 응답에 likedByMe나 liked 필드가 있는지 확인
        const newLikeStatus = updatedData.likedByMe ?? updatedData.liked ?? !isCurrentlyLiked
        
        // concern 상태 업데이트
        setConcern({
          ...concern,
          like: newLikeStatus
        })
      } else {
        // 응답이 없으면 토글만 실행
        toggleConcernLike()
      }
    } catch (error) {
      console.error('❌ 좋아요 처리 실패:', error)
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const errorData = error.response?.data
        
        console.error('에러 상세:', {
          status,
          statusText: error.response?.statusText,
          data: errorData,
          message: errorData?.message || errorData?.error
        })
        
        if (status === 401 || status === 403) {
          showModal('error', '로그인이 필요합니다.')
        } else if (status === 500) {
          const serverMessage = errorData?.message || errorData?.error
          const errorCode = errorData?.code
          const displayMessage = errorCode 
            ? `${serverMessage} (오류코드: ${errorCode})\n잠시 후 다시 시도해주세요.`
            : serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          showModal('error', displayMessage)
        } else {
          showModal('error', '좋아요 처리에 실패했습니다.')
        }
      }
    }
  }

  useEffect(() => {
    if (pageNumber) {
      const boardId = Number(pageNumber)
      const fetchConcern = async() => {
      try {
        const token = localStorage.getItem('accessToken')
        let response
        
        try {
          // 로그인 상태라면 토큰 포함하여 조회 (좋아요 상태 확인을 위해)
          const headers: Record<string, string> = {}
          if (token) {
            headers['Authorization'] = `Bearer ${token}`
          }
          
          response = await axios.get(
            ENDPOINTS.CONCERN_DETAIL(boardId),
            {
              headers,
              withCredentials: true
            }
          )
        } catch (authError) {
          // 토큰 관련 에러 (401, 403, U002 등)가 발생하면 토큰 없이 재시도
          if (axios.isAxiosError(authError)) {
            const errorCode = authError.response?.data?.code
            const status = authError.response?.status
            
            if (status === 401 || status === 403 || errorCode === 'U002') {
              console.warn('토큰이 유효하지 않습니다. 비로그인 상태로 조회합니다.')
              // 유효하지 않은 토큰 제거
              if (errorCode === 'U002') {
                localStorage.removeItem('accessToken')
              }
              
              // 토큰 없이 재시도
              response = await axios.get(
                ENDPOINTS.CONCERN_DETAIL(boardId),
                {
                  withCredentials: true
                }
              )
            } else {
              throw authError
            }
          } else {
            throw authError
          }
        }
        
        const data = response.data
        
        // equippedItems 파싱
        const { borderImageUrl, nicknameColor } = parseEquippedItems(data.equippedItems)
        
        // 좋아요 상태 확인
        const isLiked = data.likedByMe ?? data.liked ?? false
        
        const concern = {
          id: data.boardId,  // API는 boardId를 사용
          userId: data.userId,
          title: data.title,
          profileImg: data.profileImg || '/images/MoonRabbitSleep2.png',
          nickname: data.nickname,
          content: data.content,
          createdAt: data.createdAt || new Date().toISOString(),  // createdAt이 없으면 현재 시간
          answer: data.answers?.[0]?.content || '',  // answers 배열의 첫번째 답변
          like: isLiked,
          equippedItems: data.equippedItems || [],
          borderImageUrl,
          nicknameColor,
        }
        setConcern(concern)
      } catch (error) {
        console.error('게시글 정보 불러오기 실패', error)
      }
    }
    fetchConcern()
    }
  }, [pageNumber, setConcern])

  // 커스텀 훅은 조건부 리턴 전에 호출
  const { borderImageUrl: ownBorderUrl, nicknameColor: ownNicknameColor } = usePostAuthorItems(concern?.userId)

  if (!concern) return <p>로딩 중...</p>
  const { title, nickname, profileImg, content, createdAt, userId, borderImageUrl: apiBorderUrl, nicknameColor: apiNicknameColor } = concern

  // API 데이터 우선, 없으면 본인 장착 아이템 사용
  const borderImageUrl = apiBorderUrl || ownBorderUrl
  const nicknameColor = apiNicknameColor || ownNicknameColor

  return (
    <>
      <div className="flex items-center justify-center w-full">
        {!isMobile && (
          <ChevronLeft
            size={32}
            className="cursor-pointer text-darkWalnut hover:text-mainColor transition-colors"
            onClick={goToPrev}
          />
        )}
        <div className={clsx(
          "text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
          isMobile ? "w-[calc(100%-2rem)] mx-auto p-8 mt-8 mb-12" : "w-4/5 p-[50px] pb-[32px] mx-2 my-24 "
        )}>
          <p className={clsx(isMobile ? "text-[24px]" : "text-[30px]")}>{title}</p>
          <div className={clsx("flex items-center", isMobile ? "my-4" : "my-5")}>
            {/* 프로필 이미지 + 테두리 */}
            <div className="relative w-[30px] h-[30px] mr-[12px]" style={{ aspectRatio: '1 / 1' }}>
              <img
                src={profileImg?.trim() || '/images/MoonRabbitSleep2.png'}
                alt="프로필이미지"
                className="absolute inset-0 w-full h-full rounded-full object-cover"
                style={{ aspectRatio: '1 / 1' }}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/MoonRabbitSleep2.png'
                }}
              />
              {/* 장착된 테두리 - 본인 게시글일 때만 표시 */}
              {borderImageUrl && (
                <img
                  src={borderImageUrl}
                  alt="프로필 테두리"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ aspectRatio: '1 / 1' }}
                />
              )}
            </div>
            <p 
              className="text-[16px]"
              style={nicknameColor ? { color: nicknameColor } : {}}
            >
              {nickname}
            </p>
          </div>
          <p className={clsx("whitespace-pre-line break-words font-gothicFont", 
            isMobile ? "text-[16px]" : "text-[18px] leading-tight"
          )}>
            {content}
          </p>
          <div className="flex mt-[40px] md:mt-[60px] justify-between">
            <div className="flex items-center">
              <img src={CommentIcon} alt="댓글아이콘" className="h-[24px]" loading="lazy" />
              <p className="mt-[2px] ml-[4px] mr-[20px] text-[20px]">
                {totalCommentCount}
              </p>
            <img
              src={Report}
              alt="신고"
              className="mr-[16px] cursor-pointer h-[25px]"
              loading="lazy"
              onClick={() => setReportModalOpen(true)}
            />
              <div onClick={handleLikeToggle}>
                <img
                  src={concern?.like ? Liked : Like}
                  className="cursor-pointer h-[25px]"
                  loading="lazy"
                />
              </div>
            </div>
            <p>{createdAt?.split('T')[0]}</p>
          </div>
        </div>
        {!isMobile && (
          <ChevronRight
            size={32}
            className="cursor-pointer text-darkWalnut hover:text-mainColor transition-colors"
            onClick={goToNext}
          />
        )}
      </div>

      {/* 신고 모달 */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportSubmit}
        targetType="BOARD"
        targetId={currentId}
      />

      {/* 알림 모달 */}
      <MiniModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        message={modalState.message}
      />
    </>
  )
}

export const ConcernAnswer: React.FC = () => {
  const { boardDetail } = useBoardDetailStore()
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'
  
  return (
    <div className={clsx("text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
      isMobile ? "w-[calc(100%-2rem)] mx-auto p-8" : "w-4/5 p-[50px]"
    )}>
      <p className="text-[24px] md:text-[30px] mb-[20px]">달토끼 답변</p>
      <p className="whitespace-pre-line break-words font-gothicFont text-[16px] md:text-[18px] md:leading-tight">
        {boardDetail?.aiAnswer || 'AI 답변을 불러오는 중입니다...'}
      </p>
    </div>
  )
}
