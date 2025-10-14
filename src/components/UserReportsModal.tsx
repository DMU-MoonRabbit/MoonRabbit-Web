import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import ENDPOINTS from '../api/endpoints';
import axios from 'axios';

// 신고 내역 타입 정의
interface UserReport {
  id: number
  reportTargetType: 'BOARD' | 'ANSWER'
  targetId: number
  targetContent: string
  reason: string
  reporterId: number
}

interface UserReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
}

// 목업 데이터
const mockUserReports: UserReport[] = [
  {
    id: 1,
    reportTargetType: 'BOARD',
    targetId: 5,
    targetContent: "부적절한 내용이 포함된 게시글입니다.",
    reason: "욕설 사용",
    reporterId: 10
  },
  {
    id: 2,
    reportTargetType: 'ANSWER',
    targetId: 15,
    targetContent: "부적절한 댓글 내용입니다.",
    reason: "스팸",
    reporterId: 11
  }
]

export const UserReportsModal: React.FC<UserReportsModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
}) => {
  const [reports, setReports] = useState<UserReport[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 5

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserReports()
    }
  }, [isOpen, userId])

  const fetchUserReports = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(
        ENDPOINTS.ADMIN_USER_REPORTS(userId, currentPage, pageSize),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('사용자 신고 내역 API 응답:', response.data)
      setReports(response.data.content || [])
      setLoading(false)
      
    } catch (error) {
      console.error('사용자 신고 내역 조회 실패:', error)
      setReports([])
      setLoading(false)
    }
  }

  const getTypeText = (type: string) => {
    return type === 'BOARD' ? '게시글' : '댓글'
  }

  const getTypeColor = (type: string) => {
    return type === 'BOARD' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800'
  }

  const getPaginatedReports = () => {
    const startIndex = currentPage * pageSize
    return reports.slice(startIndex, startIndex + pageSize)
  }

  const totalPages = Math.ceil(reports.length / pageSize)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* 모달 컨텐츠 */}
      <div 
        className="relative z-10 bg-neutral-50 rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 - 로고와 닫기 버튼 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <img
              src="/images/MoonRabbitSleep2.png"
              alt="logo"
              className="w-16 h-16 mr-3"
            />
            <div className="flex flex-col font-mainFont text-darkWalnut">
              <div className="flex items-baseline">
                <span className="text-lightCaramel text-xl">달</span>
                <span className="text-darkWalnut text-xl">토끼</span>
              </div>
              <div className="flex items-baseline text-xs">
                <span className="text-lightCaramel">Moon</span>
                <span className="text-darkWalnut">Rabbit</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-darkWalnut hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* 타이틀 */}
        <h3 className="text-xl font-mainFont text-darkWalnut mb-6">
          {userName}님의 신고 내역
        </h3>
        
        {/* 총 건수 */}
        <div className="mb-4">
          <span className="text-gray-600 text-sm">
            전체 {reports.length}건
          </span>
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
          </div>
        )}

        {/* 신고 내역 테이블 */}
        {!loading && (
          <div className="flex-1 overflow-hidden">
            <div className="overflow-x-auto h-full">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">타입</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">대상 ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">내용</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">신고 이유</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">신고자 ID</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedReports().map((report, index) => (
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
                          getTypeColor(report.reportTargetType)
                        )}>
                          {getTypeText(report.reportTargetType)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{report.targetId}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs truncate" title={report.targetContent}>
                          {report.targetContent}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{report.reason}</td>
                      <td className="py-3 px-4 text-gray-700">{report.reporterId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 빈 데이터 */}
        {!loading && reports.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            신고 내역이 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            >
              ←
            </button>
            <span className="mx-4 text-darkWalnut font-mainFont text-sm">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages - 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
