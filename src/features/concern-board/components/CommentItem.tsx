import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ENDPOINTS } from '@/api/endpoints'
import Liked from '@/assets/images/likedThick.svg'
import Like from '@/assets/images/likeThick.svg'
import MiniModal from '@/common/components/MiniModal'
import ReportModal from '@/common/components/ReportModal'
import { ReportCreateRequest } from '@/features/admin/types/report'
import { useAuthStore } from '@/features/auth/stores/useAuthStore'
import { usePostAuthorItems } from '@/features/mypage/hooks/usePostAuthorItems'
import { useUserProfileStore } from '@/features/mypage/stores/useUserProfileStore'
import useUserStore from '@/features/mypage/stores/useUserStore'

import { Comment, useCommentStore } from '../stores/useCommentStore'

import { CommentInput } from './CommentInput'

interface CommentItemProps {
  comment: Comment
  depth?: number
  boardId?: number
  boardAuthorId?: number
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  boardId,
  boardAuthorId,
}) => {
  const { replyTargetId, setReplyTargetId, deleteComment, selectAnswer } =
    useCommentStore()
  const { userId, setUserId } = useUserStore()
  const { isLoggedIn } = useAuthStore()
  const showReplyInput = replyTargetId === comment.id
  const { userProfile, fetchUserProfile } = useUserProfileStore()
  const navigate = useNavigate()

  // 댓글 좋아요 상태 로컬 관리
  const [commentLikeState, setCommentLikeState] = useState({
    likedByMe: comment.likedByMe ?? comment.like ?? false,
    likeCount: comment.likeCount,
  })

  // comment가 변경되면 좋아요 상태도 업데이트
  useEffect(() => {
    setCommentLikeState({
      likedByMe: comment.likedByMe ?? comment.like ?? false,
      likeCount: comment.likeCount,
    })
    setIsSelected(comment.isSelected || false)
  }, [comment.id, comment.likedByMe, comment.like, comment.likeCount, comment.isSelected])

  // API 데이터에서 장착 아이템 정보를 받아오거나, 본인 댓글이면 현재 장착 아이템 사용
  const { borderImageUrl: ownBorderUrl, nicknameColor: ownNicknameColor } =
    usePostAuthorItems(comment.userId)
  const borderImageUrl = comment.borderImageUrl || ownBorderUrl
  const nicknameColor = comment.nicknameColor || ownNicknameColor

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'success',
    message: '',
  })

  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [isSelected, setIsSelected] = useState(comment.isSelected || false)

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  // 채택 버튼 클릭 핸들러
  const handleSelectAnswer = async () => {
    if (!boardId || !boardAuthorId) {
      showModal('error', '게시글 정보를 불러올 수 없습니다.')
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) {
      showModal('error', '로그인 후 채택할 수 있습니다.')
      return
    }

    setIsSelecting(true)
    try {
      const success = await selectAnswer(boardId, comment.id)
      if (success) {
        setIsSelected(true) // 채택 성공 시 로컬 상태 업데이트
        showModal('success', '댓글이 채택되었습니다!')
      } else {
        showModal('error', '채택에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      showModal('error', '채택 중 오류가 발생했습니다.')
    } finally {
      setIsSelecting(false)
    }
  }

  const handleDelete = async () => {
    const success = await deleteComment(comment.id)
    if (success) {
      showModal('success', '삭제되었습니다!')
    } else {
      showModal('error', '삭제에 실패했습니다.')
    }
  }

  // 신고 제출 함수
  const handleReportSubmit = async (reportData: ReportCreateRequest) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('로그인 후 신고할 수 있습니다.')
    }

    const response = await axios.post(ENDPOINTS.REPORT_CREATE, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return response.data
  }

  // 댓글 좋아요 토글 함수
  const handleCommentLikeToggle = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      showModal('error', '로그인 후 좋아요를 누를 수 있습니다.')
      return
    }

    try {
      // userProfile에서 userId 가져오기
      let currentUserId = userProfile?.id

      // 프로필이 로드되지 않았으면 먼저 로드
      if (!currentUserId) {
        await fetchUserProfile()
        currentUserId = useUserProfileStore.getState().userProfile?.id
      }

      if (!currentUserId) {
        showModal('error', '사용자 정보를 불러올 수 없습니다.')
        return
      }

      const isCurrentlyLiked = commentLikeState.likedByMe

      let response

      if (isCurrentlyLiked) {
        // 좋아요 취소
        response = await axios.delete(
          ENDPOINTS.ANSWER_LIKE(comment.id, currentUserId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )
      } else {
        // 좋아요 추가
        response = await axios.post(
          ENDPOINTS.ANSWER_LIKE(comment.id, currentUserId),
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )
      }

      // API 응답에서 업데이트된 상태 반영
      if (response.data) {
        const updatedComment = response.data
        const newLikeStatus = updatedComment.likedByMe ?? !isCurrentlyLiked
        const newLikeCount =
          updatedComment.likeCount ?? commentLikeState.likeCount

        // 로컬 상태 업데이트
        setCommentLikeState({
          likedByMe: newLikeStatus,
          likeCount: newLikeCount,
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const errorData = error.response?.data

        if (status === 400) {
          const serverMessage = errorData?.message || errorData?.error

          // "이미 좋아요를 눌렀습니다" 에러 처리
          if (serverMessage?.includes('이미 좋아요')) {
            // 클라이언트 상태를 서버와 동기화
            setCommentLikeState({
              likedByMe: true,
              likeCount: commentLikeState.likeCount + 1,
            })

            showModal('error', '이미 좋아요를 눌렀습니다.')
          } else {
            showModal('error', serverMessage || '잘못된 요청입니다.')
          }
        } else if (status === 401 || status === 403) {
          showModal('error', '로그인이 필요합니다.')
        } else if (status === 500) {
          const serverMessage = errorData?.message || errorData?.error
          showModal(
            'error',
            serverMessage ||
              '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          )
        } else {
          showModal('error', '좋아요 처리에 실패했습니다.')
        }
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('accessToken')
      const getUserId = async () => {
        try {
          const response = await axios.get(ENDPOINTS.COMMENT_LIST(comment.id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUserId(response.data.id)
        } catch {
          // 에러 처리
        }
      }
      getUserId()
    }
  }, [comment.id, isLoggedIn, setUserId])

  // 게시글 작성자인지 확인 (댓글 작성자가 아닌 게시글 작성자)
  const isBoardAuthor = boardAuthorId === userProfile?.id && userId !== comment.userId
  const canSelect = isBoardAuthor && depth === 0 && !isSelected

  return (
    <>
      <div
        className={`mt-12 ${
          isSelected
            ? 'border-l-4 border-mainColor bg-gradient-to-r from-mainColor/5 to-transparent p-4 rounded-lg shadow-md'
            : 'border-l-4 border-transparent pl-4'
        }`}
      >
        {isSelected && (
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-mainColor text-white rounded-full text-sm font-mainFont font-bold shadow-sm">
              ⭐ 채택된 답변
            </span>
          </div>
        )}
        <div className="flex items-center">
          {/* 프로필 이미지 + 테두리 */}
          <div
            className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] mr-[8px]"
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={comment.profileImg?.trim() || '/images/MoonRabbitSleep2.png'}
              className="absolute inset-0 w-full h-full rounded-full object-cover"
              style={{ aspectRatio: '1 / 1' }}
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
              onClick={() => navigate(`/mypage/${comment.userId}`)}
            />
            {/* 장착된 테두리 - 본인 댓글일 때만 표시 */}
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
            className="text:[16px] md:text-[18px]"
            style={nicknameColor ? { color: nicknameColor } : {}}
          >
            {comment.nickname}
          </p>
        </div>
        <p className="whitespace-pre-line break-words font-gothicFont text-[16px] md:text-[18px] md:leading-tight my-4">
          {comment.content}
        </p>
        <div className="flex text-[14px] md:text-[16px] items-center flex-wrap gap-2">
          <p className="mr-4">
            {comment.createdAt.split('T')[0].replace(/-/g, '.')}
          </p>
          {depth === 0 && (
            <div
              className="mr-4 cursor-pointer text-[14px] md:text-[16px]"
              onClick={() =>
                setReplyTargetId(
                  replyTargetId === comment.id ? null : comment.id,
                )
              }
            >
              {replyTargetId === comment.id ? '닫기' : '답글쓰기'}
            </div>
          )}
          {userId === comment.userId && (
            <div
              className="mr-4 text-mainColor cursor-pointer"
              onClick={handleDelete}
            >
              삭제하기
            </div>
          )}
          {userId !== comment.userId && (
            <div
              className="mr-4 text-red-500 cursor-pointer"
              onClick={() => setReportModalOpen(true)}
            >
              신고하기
            </div>
          )}
          {/* 채택 버튼 - 게시글 작성자만, 본인 댓글이 아닌 댓글, 채택되지 않은 댓글, 답글이 아닌 댓글만 */}
          {canSelect && (
            <button
              onClick={handleSelectAnswer}
              disabled={isSelecting}
              className="px-3 py-1 bg-mainColor text-white rounded-full text-sm font-mainFont hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSelecting ? '채택 중...' : '채택하기'}
            </button>
          )}
          <div onClick={handleCommentLikeToggle} className="mr-2">
            <img
              src={commentLikeState.likedByMe ? Liked : Like}
              alt="좋아요아이콘"
              className="cursor-pointer"
            />
          </div>
          <div>{commentLikeState.likeCount}</div>
        </div>
        {/* 답글Input */}
        {showReplyInput && (
          <div className="ml-6 mt-4">
            <CommentInput parentId={comment.id} />
          </div>
        )}
        {/* 답글 렌더링 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 mt-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                boardId={boardId}
                boardAuthorId={boardAuthorId}
              />
            ))}
          </div>
        )}
      </div>

      <MiniModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        message={modalState.message}
      />

      {/* 댓글 신고 모달 */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportSubmit}
        targetType="ANSWER"
        targetId={comment.id}
      />
    </>
  )
}
