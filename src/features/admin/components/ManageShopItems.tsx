import React, { useEffect, useState } from 'react'
import { ItemEditModal } from './ItemEditModal'
import { ShopItemsTable } from './ShopItemsTable'
import { useManageItems } from '../../features/shop/hooks/useManageItems'
import { ShopItem } from '../../features/shop/types/shop'

export const ManageShopItems = () => {
  const {
    itemsData,
    loading,
    currentPage,
    fetchItems,
    changePage,
    editItem,
    deleteItemWithConfirm,
    getTypeLabel
  } = useManageItems()

  // 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)

  // 초기 데이터 로딩
  useEffect(() => {
    fetchItems(currentPage)
  }, [fetchItems, currentPage])

  // 수정 핸들러
  const handleEdit = (item: ShopItem) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  // 수정 모달 저장
  const handleEditSave = async (itemId: number, name: string, price: number, imageUrl: string) => {
    const success = await editItem(itemId, name, price, imageUrl)
    if (success) {
      fetchItems(currentPage)
    }
  }

  // 수정 모달 닫기
  const handleEditClose = () => {
    setIsEditModalOpen(false)
    setSelectedItem(null)
  }

  // 삭제 핸들러
  const handleDelete = async (itemId: number) => {
    const success = await deleteItemWithConfirm(itemId)
    if (success) {
      fetchItems(currentPage)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <ShopItemsTable
        itemsData={itemsData}
        loading={loading}
        currentPage={currentPage}
        onPageChange={changePage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getTypeLabel={getTypeLabel}
      />

      {/* 아이템 수정 모달 */}
      <ItemEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
        item={selectedItem}
      />
    </div>
  )
}
