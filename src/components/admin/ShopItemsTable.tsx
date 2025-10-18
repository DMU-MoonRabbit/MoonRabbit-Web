import React from 'react'
import { useResponsiveStore } from '../../stores/useResponsiveStore'
import { AdminPagination } from './AdminPagination'
import clsx from 'clsx'
import { ShopItemListResponse, ShopItem } from '../../types/shop'

interface ShopItemsTableProps {
  itemsData: ShopItemListResponse | null
  loading: boolean
  currentPage: number
  onPageChange: (page: number) => void
  onEdit: (item: ShopItem) => void
  onDelete: (itemId: number) => void
  getTypeLabel: (type: ShopItem['type']) => string
}

export const ShopItemsTable: React.FC<ShopItemsTableProps> = ({
  itemsData,
  loading,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
  getTypeLabel,
}) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <>
      {/* 총 건수 */}
      <div className="mb-4">
        <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
          전체 {itemsData?.totalElements || 0}건
        </span>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
        </div>
      )}

      {/* PC 뷰 */}
      {!loading && itemsData && !itemsData.empty && !isMobile && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">이미지</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">이름</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">타입</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">가격</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">관리</th>
              </tr>
            </thead>
            <tbody>
              {itemsData.content.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={clsx(
                    "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  )}
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">{item.id}</td>
                  <td className="py-3 px-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = '/images/MoonRabbitLogo.png'
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{item.name}</td>
                  <td className="py-3 px-4">
                    <span className={clsx(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      item.type === 'BANNER' && "bg-blue-100 text-blue-800",
                      item.type === 'BORDER' && "bg-green-100 text-green-800",
                      item.type === 'NAME_COLOR' && "bg-purple-100 text-purple-800"
                    )}>
                      {getTypeLabel(item.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{item.price.toLocaleString()} P</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(item)}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                      >
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

      {/* 모바일 뷰 */}
      {!loading && itemsData && !itemsData.empty && isMobile && (
        <div className="space-y-4">
          {itemsData.content.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* 헤더: 이미지와 이름 */}
              <div className="flex gap-3 mb-3 pb-3 border-b border-gray-200">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = '/images/MoonRabbitLogo.png'
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={clsx(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      item.type === 'BANNER' && "bg-blue-100 text-blue-800",
                      item.type === 'BORDER' && "bg-green-100 text-green-800",
                      item.type === 'NAME_COLOR' && "bg-purple-100 text-purple-800"
                    )}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 정보 그리드 */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID</p>
                  <p className="text-sm font-medium text-gray-800">{item.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">가격</p>
                  <p className="text-sm font-bold text-blue-600">{item.price.toLocaleString()} P</p>
                </div>
              </div>

              {/* 관리 버튼 */}
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(item)}
                  className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  수정
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-700 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 빈 데이터 */}
      {!loading && itemsData?.empty && (
        <div className="text-center py-8 text-gray-500">
          등록된 상점 아이템이 없습니다.
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && itemsData && !itemsData.empty && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={itemsData.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  )
}

