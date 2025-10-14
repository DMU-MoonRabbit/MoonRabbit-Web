import React, { useState } from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

// 게시글 타입 정의
interface BoardPost {
  id: number
  title: string
  content: string
  author: string
  authorId: number
  createdAt: string
  category: string
}

// 신고된 글 타입 정의
interface ReportedPost {
  id: number
  type: 'BOARD' | 'COMMENT'
  reportedId: number
  content: string
  reason: string
  reporterId: number
  reporterName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reportedAt: string
}

// 목업 데이터
const mockBoardPosts: BoardPost[] = [
  {
    id: 1,
    title: "고민이 있어요",
    content: "요즘 너무 힘들어요...",
    author: "달토끼1",
    authorId: 1,
    createdAt: "2024-01-15",
    category: "가족"
  },
  {
    id: 2,
    title: "연애 고민",
    content: "친구와의 관계가 어려워요",
    author: "별토끼2",
    authorId: 2,
    createdAt: "2024-01-20",
    category: "연애"
  },
  {
    id: 3,
    title: "진로 상담",
    content: "어떤 직업을 선택해야 할까요?",
    author: "밤토끼3",
    authorId: 3,
    createdAt: "2024-02-01",
    category: "진로"
  }
]

const mockReportedPosts: ReportedPost[] = [
  {
    id: 1,
    type: 'BOARD',
    reportedId: 5,
    content: "부적절한 내용이 포함된 게시글",
    reason: "욕설 사용",
    reporterId: 10,
    reporterName: "신고자1",
    status: 'PENDING',
    reportedAt: "2024-01-25"
  },
  {
    id: 2,
    type: 'COMMENT',
    reportedId: 15,
    content: "부적절한 댓글 내용",
    reason: "스팸",
    reporterId: 11,
    reporterName: "신고자2",
    status: 'PENDING',
    reportedAt: "2024-01-26"
  }
]

export const ManageBoard = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const [activeTab, setActiveTab] = useState<'posts' | 'reports'>('posts')
  const [currentPage, setCurrentPage] = useState(0)
  const [reportsPage, setReportsPage] = useState(0)
  const pageSize = 10

  // 페이지네이션 처리
  const getPaginatedPosts = (page: number) => {
    const startIndex = page * pageSize
    return mockBoardPosts.slice(startIndex, startIndex + pageSize)
  }

  const getPaginatedReports = (page: number) => {
    const startIndex = page * pageSize
    return mockReportedPosts.slice(startIndex, startIndex + pageSize)
  }

  const totalPostsPages = Math.ceil(mockBoardPosts.length / pageSize)
  const totalReportsPages = Math.ceil(mockReportedPosts.length / pageSize)

  const handlePostPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPostsPages) {
      setCurrentPage(newPage)
    }
  }

  const handleReportsPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalReportsPages) {
      setReportsPage(newPage)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '대기중'
      case 'APPROVED':
        return '승인됨'
      case 'REJECTED':
        return '거부됨'
      default:
        return status
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
          onClick={() => setActiveTab('reports')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'reports'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          신고된 글 ({mockReportedPosts.length})
        </button>
      </div>

      {/* 게시글 목록 탭 */}
      {activeTab === 'posts' && (
        <>
          {/* 총 건수 */}
          <div className="mb-4">
            <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
              전체 {mockBoardPosts.length}건
            </span>
          </div>

          {/* 게시글 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">제목</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">작성자</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">카테고리</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">작성일</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedPosts(currentPage).map((post, index) => (
                  <tr 
                    key={post.id} 
                    className={clsx(
                      "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    )}
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">{post.id}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate" title={post.title}>
                        {post.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{post.author}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{post.createdAt}</td>
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

          {/* 게시글 페이지네이션 */}
          {totalPostsPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => handlePostPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} className="text-darkWalnut" />
              </button>
              <span className="mx-4 text-darkWalnut font-mainFont">
                {currentPage + 1} / {totalPostsPages}
              </span>
              <button
                onClick={() => handlePostPageChange(currentPage + 1)}
                disabled={currentPage === totalPostsPages - 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPostsPages - 1
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

      {/* 신고된 글 목록 탭 */}
      {activeTab === 'reports' && (
        <>
          {/* 총 건수 */}
          <div className="mb-4">
            <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
              전체 {mockReportedPosts.length}건
            </span>
          </div>

          {/* 신고된 글 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">타입</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">신고된 글 ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">내용</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">신고 이유</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">신고자</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">상태</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">신고일</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedReports(reportsPage).map((report, index) => (
                  <tr 
                    key={report.id} 
                    className={clsx(
                      "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    )}
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">{report.id}</td>
                    <td className="py-3 px-4">
                      <span className={clsx(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        report.type === 'BOARD' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-orange-100 text-orange-800'
                      )}>
                        {report.type === 'BOARD' ? '게시글' : '댓글'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{report.reportedId}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate" title={report.content}>
                        {report.content}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{report.reason}</td>
                    <td className="py-3 px-4 text-gray-700">{report.reporterName}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{report.reportedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 신고된 글 페이지네이션 */}
          {totalReportsPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => handleReportsPageChange(reportsPage - 1)}
                disabled={reportsPage === 0}
                className={`px-4 py-2 rounded-lg ${
                  reportsPage === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} className="text-darkWalnut" />
              </button>
              <span className="mx-4 text-darkWalnut font-mainFont">
                {reportsPage + 1} / {totalReportsPages}
              </span>
              <button
                onClick={() => handleReportsPageChange(reportsPage + 1)}
                disabled={reportsPage === totalReportsPages - 1}
                className={`px-4 py-2 rounded-lg ${
                  reportsPage === totalReportsPages - 1
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
    </div>
  )
}
