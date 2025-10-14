import React, { useState, useEffect } from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReportedBoard } from './ReportedBoard'
import ENDPOINTS from '../api/endpoints'
import axios from 'axios'
import clsx from 'clsx'

interface BoardPost {
  boardId: number
  userId: number
  title: string
  content: string
  category: string
  answers: Answer[]
  nickname: string
  profileImg: string
  selectedAnswerId: number
  likeCount: number
  equippedItems: EquippedItem[]
}

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
  equippedItems: EquippedItem[]
  likedByMe: boolean
  selected: boolean
}

interface EquippedItem {
  type: string
  imageUrl: string
}

interface BoardPageData {
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  size: number
  content: BoardPost[]
  number: number
  sort: any[]
  numberOfElements: number
  pageable: any
  empty: boolean
}

// 신고된 게시글 타입 정의
interface ReportedBoardItem {
  id: number
  reportedId: number
  title: string
  content: string
  reason: string
  reporterId: number
  reporterName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reportedAt: string
}

// 신고된 댓글 타입 정의
interface ReportedCommentItem {
  id: number
  reportedId: number
  content: string
  reason: string
  reporterId: number
  reporterName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reportedAt: string
}


const mockReportedBoards: ReportedBoardItem[] = [
  {
    id: 1,
    reportedId: 5,
    title: "부적절한 제목의 게시글",
    content: "부적절한 내용이 포함된 게시글입니다.",
    reason: "욕설 사용",
    reporterId: 10,
    reporterName: "신고자1",
    status: 'PENDING',
    reportedAt: "2024-01-25"
  },
  {
    id: 2,
    reportedId: 8,
    title: "스팸성 게시글",
    content: "반복적인 광고 내용이 포함된 게시글입니다.",
    reason: "스팸",
    reporterId: 12,
    reporterName: "신고자3",
    status: 'APPROVED',
    reportedAt: "2024-01-26"
  },
  {
    id: 3,
    reportedId: 12,
    title: "개인정보 노출 게시글",
    content: "다른 사람의 개인정보가 포함된 게시글입니다.",
    reason: "개인정보 노출",
    reporterId: 15,
    reporterName: "신고자4",
    status: 'REJECTED',
    reportedAt: "2024-01-27"
  }
]

const mockReportedComments: ReportedCommentItem[] = [
  {
    id: 1,
    reportedId: 15,
    content: "부적절한 댓글 내용입니다. 욕설이 포함되어 있어요.",
    reason: "욕설 사용",
    reporterId: 11,
    reporterName: "신고자2",
    status: 'PENDING',
    reportedAt: "2024-01-26"
  },
  {
    id: 2,
    reportedId: 23,
    content: "스팸 댓글 내용",
    reason: "스팸",
    reporterId: 13,
    reporterName: "신고자5",
    status: 'PENDING',
    reportedAt: "2024-01-28"
  }
]

export const ManageBoard = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  const [activeTab, setActiveTab] = useState<'posts' | 'reportedBoards' | 'reportedComments'>('posts')
  const [currentPage, setCurrentPage] = useState(0)
  const [reportedBoardsPage, setReportedBoardsPage] = useState(0)
  const [reportedCommentsPage, setReportedCommentsPage] = useState(0)
  
  const [boardData, setBoardData] = useState<BoardPageData | null>(null)
  const [loading, setLoading] = useState(false)
  
  const pageSize = 9 

  // 게시글 목록 조회
  const fetchBoardPosts = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(
        ENDPOINTS.CONCERN_LIST(page, pageSize),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('게시글 목록 API 응답:', response.data)
      setBoardData(response.data)
      setLoading(false)
      
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error)
      setBoardData(null)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBoardPosts(currentPage)
  }, [currentPage])

  const totalReportedBoardsPages = Math.ceil(mockReportedBoards.length / pageSize)
  const totalReportedCommentsPages = Math.ceil(mockReportedComments.length / pageSize)

  const handlePostPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (boardData?.totalPages || 0)) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className={clsx("bg-white rounded-lg shadow-sm", isMobile ? "p-4" : "p-6")}>
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'posts'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          게시글 목록
        </button>
        <button
          onClick={() => setActiveTab('reportedBoards')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'reportedBoards'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          신고된 게시글 ({mockReportedBoards.length})
        </button>
        <button
          onClick={() => setActiveTab('reportedComments')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'reportedComments'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          신고된 댓글 ({mockReportedComments.length})
        </button>
      </div>

      {/* 게시글 목록 탭 */}
      {activeTab === 'posts' && (
        <>
          {/* 로딩 */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
            </div>
          )}

          {/* 총 건수 */}
          {!loading && boardData && (
            <div className="mb-4">
              <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
                전체 {boardData.totalElements}건
              </span>
            </div>
          )}

          {/* 게시글 테이블 */}
          {!loading && boardData && !boardData.empty && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">제목</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">작성자</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">카테고리</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">댓글 수</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">좋아요</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {boardData.content.map((post, index) => (
                    <tr 
                      key={post.boardId} 
                      className={clsx(
                        "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      )}
                    >
                      <td className="py-3 px-4 text-gray-800 font-medium">{post.boardId}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs truncate" title={post.title}>
                          {post.title}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{post.nickname}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{post.answers.length}</td>
                      <td className="py-3 px-4 text-gray-600">{post.likeCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                            수정
                          </button>
                          <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 빈 데이터 */}
          {!loading && boardData && boardData.empty && (
            <div className="text-center py-8 text-gray-500">
              게시글이 없습니다.
            </div>
          )}

          {/* 페이지네이션 */}
          {!loading && boardData && boardData.totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => handlePostPageChange(currentPage - 1)}
                disabled={boardData.first}
                className={`px-4 py-2 rounded-lg ${
                  boardData.first
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} className="text-darkWalnut" />
              </button>
              <span className="mx-4 text-darkWalnut font-mainFont">
                {boardData.number + 1} / {boardData.totalPages}
              </span>
              <button
                onClick={() => handlePostPageChange(currentPage + 1)}
                disabled={boardData.last}
                className={`px-4 py-2 rounded-lg ${
                  boardData.last
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={16} className="text-darkWalnut" />
              </button>
            </div>
          )}
        </>
      )}

      {/* 신고된 게시글 목록 탭 */}
      {activeTab === 'reportedBoards' && (
        <ReportedBoard
          items={mockReportedBoards}
          currentPage={reportedBoardsPage}
          totalPages={totalReportedBoardsPages}
          onPageChange={setReportedBoardsPage}
          type="board"
        />
      )}

      {/* 신고된 댓글 목록 탭 */}
      {activeTab === 'reportedComments' && (
        <ReportedBoard
          items={mockReportedComments}
          currentPage={reportedCommentsPage}
          totalPages={totalReportedCommentsPages}
          onPageChange={setReportedCommentsPage}
          type="comment"
        />
      )}
    </div>
  )
}
