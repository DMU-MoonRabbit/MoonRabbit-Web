import React, { useEffect } from "react"
import { useAdminStore, getAdminUsers } from "../stores/useAdminStore"

export const ManageUsers = () => {
  const { pageData, loading, handlePageChange } = useAdminStore()

  useEffect(() => {
    getAdminUsers()
  }, [])

  return(
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 총 건수 */}
      <div className="mb-4">
        <span className="text-gray-600">
          전체 {pageData?.totalElements || 0}건
        </span>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
        </div>
      )}

      {!loading && pageData && (
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
                  <td className="py-3 px-4 text-blue-600 font-medium">{user.point.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">{user.trustPoint}</td>
                  <td className="py-3 px-4 text-purple-600 font-bold">{user.totalPoint.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Lv.{user.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && pageData?.empty && (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다.
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && pageData && !pageData.empty && (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(pageData.number - 1)}
              disabled={pageData.first}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ◀
            </button>
            <span className="px-4 py-2 text-gray-700">
              {pageData.number + 1} / {pageData.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pageData.number + 1)}
              disabled={pageData.last}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶
            </button>
        </div>
      )}
    </div>
  )
}