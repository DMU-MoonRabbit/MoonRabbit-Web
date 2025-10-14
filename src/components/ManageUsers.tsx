import React, { useEffect, useState } from "react"
import { useAdminStore, getAdminUsers, updateUserPoint, updateUserTrust } from "../stores/useAdminStore"
import { ManagePointModal } from "./ManagePointModal"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"

export const ManageUsers = () => {
  const { pageData, loading, handlePageChange } = useAdminStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'point' | 'trust' | null
    userId: number | null
    userName: string
    currentValue: number
  }>({
    isOpen: false,
    type: null,
    userId: null,
    userName: '',
    currentValue: 0,
  })

  const openModal = (type: 'point' | 'trust', userId: number, userName: string, currentValue: number) => {
    setModalState({
      isOpen: true,
      type,
      userId,
      userName,
      currentValue,
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      userId: null,
      userName: '',
      currentValue: 0,
    })
  }

  const handleSave = async (newValue: number) => {
    if (!modalState.userId || !modalState.type) return
    
    try {
      console.log('저장 시도:', {
        type: modalState.type,
        userId: modalState.userId,
        newValue,
      })
      
      if (modalState.type === 'point') {
        await updateUserPoint(modalState.userId, newValue)
      } else if (modalState.type === 'trust') {
        await updateUserTrust(modalState.userId, newValue)
      }
      
      // 성공 후 현재 페이지 데이터 새로고침
      const currentPage = pageData?.number || 0
      await getAdminUsers(currentPage, 10)
      
      console.log('저장 완료!')
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    }
  }

  useEffect(() => {
    getAdminUsers(0, 10)
  }, [])

  return(
    <div className={clsx("bg-white rounded-lg shadow-sm", isMobile ? "p-4" : "p-6")}>
      {/* 총 건수 */}
      <div className="mb-4">
        <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
          전체 {pageData?.totalElements || 0}건
        </span>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
        </div>
      )}

      {/* PC 뷰 */}
      {!loading && pageData && !isMobile && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">이메일</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">닉네임</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">포인트</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">신뢰도</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">총 포인트</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">레벨</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">가입일</th>
              </tr>
            </thead>
            <tbody>
              {pageData.content.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">{user.id}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{user.nickname}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-medium">{user.point.toLocaleString()}</span>
                      <button
                        onClick={() => openModal('point', user.id, user.nickname, user.point)}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        수정
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">{user.trustPoint}</span>
                      <button
                        onClick={() => openModal('trust', user.id, user.nickname, user.trustPoint)}
                        className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                      >
                        수정
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-purple-600 font-bold">{user.totalPoint.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Lv.{user.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.createdAt.slice(0, 16).replace('T', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 모바일 뷰 */}
      {!loading && pageData && isMobile && (
        <div className="space-y-4">
          {pageData.content.map((user) => (
            <div 
              key={user.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* 헤더: 닉네임과 레벨 */}
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{user.nickname}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Lv.{user.level}
                </span>
              </div>

              {/* 정보 그리드 */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID</p>
                  <p className="text-sm font-medium text-gray-800">{user.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">가입일</p>
                  <p className="text-sm text-gray-700">{user.createdAt.slice(0, 10)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">총 포인트</p>
                  <p className="text-sm font-bold text-purple-600">{user.totalPoint.toLocaleString()}</p>
                </div>
              </div>

              {/* 포인트 수정 */}
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded mb-2">
                <div className="flex-1">
                  <p className="text-xs text-blue-700 mb-0.5">포인트</p>
                  <p className="text-base font-bold text-blue-600">{user.point.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => openModal('point', user.id, user.nickname, user.point)}
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  수정
                </button>
              </div>

              {/* 신뢰도 수정 */}
              <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded">
                <div className="flex-1">
                  <p className="text-xs text-green-700 mb-0.5">신뢰도</p>
                  <p className="text-base font-bold text-green-600">{user.trustPoint}</p>
                </div>
                <button
                  onClick={() => openModal('trust', user.id, user.nickname, user.trustPoint)}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && pageData?.empty && (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다.
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && pageData && !pageData.empty && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(pageData.number - 1)}
            disabled={pageData.first}
            className={`px-4 py-2 rounded-lg ${
              pageData.first
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={16} className="text-darkWalnut" />
          </button>
          <span className="mx-4 text-darkWalnut font-mainFont">
            {pageData.number + 1} / {pageData.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageData.number + 1)}
            disabled={pageData.last}
            className={`px-4 py-2 rounded-lg ${
              pageData.last
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={16} className="text-darkWalnut" />
          </button>
        </div>
      )}

      {/* 포인트/신뢰도 수정 모달 */}
      <ManagePointModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={handleSave}
        title={`${modalState.userName}님의 ${modalState.type === 'point' ? '포인트' : '신뢰도'} 수정`}
        initialValue={modalState.currentValue}
      />
    </div>
  )
}