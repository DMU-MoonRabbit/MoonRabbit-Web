import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ENDPOINTS } from '@/api/endpoints'
import MiniModal from '@/common/components/MiniModal'

import { useCommentStore } from '../stores/useCommentStore'

interface CommentInputProps {
  parentId?: number | null
}

export const CommentInput: React.FC<CommentInputProps> = ({
  parentId = null,
}) => {
  const { pageNumber } = useParams<{ pageNumber: string }>() // 추후 App.ts에서 boardId로 수정
  const boardId = pageNumber
  const { commentContent, setCommentContent, replyContents, setReplyContent } =
    useCommentStore()

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'error',
    message: '',
  })

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  const value =
    parentId !== null ? replyContents[parentId] || '' : commentContent

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (parentId !== null) {
      setReplyContent(parentId, val)
    } else {
      setCommentContent(val)
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      showModal('error', '로그인이 필요합니다.')
      return
    }

    // 토큰 만료 시간 확인
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = tokenData.exp * 1000
      if (Date.now() >= expirationTime) {
        localStorage.removeItem('accessToken')
        showModal('error', '로그인이 만료되었습니다. 다시 로그인해주세요.')
        return
      }
    } catch {
      localStorage.removeItem('accessToken')
      showModal('error', '유효하지 않은 토큰입니다. 다시 로그인해주세요.')
      return
    }

    const content = value.trim()
    if (!content) return

    try {
      const requestBody =
        parentId === null ? { content } : { content, parentId }

      const response = await axios.post(
        ENDPOINTS.COMMENT_CREATE(Number(boardId)),
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const newComment = response.data
      useCommentStore.getState().addComment(newComment, parentId)

      // 입력창 초기화
      if (parentId !== null) {
        setReplyContent(parentId, '')
      } else {
        setCommentContent('')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem('accessToken')
          showModal('error', '인증이 만료되었습니다. 다시 로그인해주세요.')
        } else if (err.response?.status === 500) {
          showModal(
            'error',
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          )
        } else if (err.response?.status === 404) {
          showModal('error', '게시글을 찾을 수 없습니다.')
        }
      }
    }
  }

  return (
    <>
      <div className="border-2 border-darkWalnut p-[12px] mt-2 rounded-[12px]">
        <textarea
          className="font-gothicFont appearance-none border-none outline-none resize-none bg-transparent p-0 m-0 shadow-none focus:ring-0 focus:outline-none w-full"
          rows={4}
          value={value}
          onChange={onChange}
        />
        <div
          className="cursor-pointer flex justify-self-end bg-mainColor text-mainWhite w-fit p-[4px] px-[10px] rounded-[10px] text-[14px] md:text-[16px] mt-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
          onClick={handleSubmit}
        >
          등록
        </div>
      </div>

      <MiniModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        message={modalState.message}
      />
    </>
  )
}
