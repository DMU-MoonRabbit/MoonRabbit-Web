import { useState, useCallback } from 'react'
import { ShopItemListResponse, ShopItem } from '../../features/shop/types/shop'
import { ENDPOINTS } from '../../api/endpoints'
import axios from 'axios'

export const useManageItems = () => {
  const [itemsData, setItemsData] = useState<ShopItemListResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // 아이템 목록 조회
  const fetchItems = useCallback(async (page = 0) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(ENDPOINTS.ITEM_LIST, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        params: {
          page,
          size: 10
        }
      })
      setItemsData(response.data)
      setCurrentPage(page)
    } catch (error) {
      console.error('아이템 목록 조회 실패:', error)
      throw new Error('아이템 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  // 아이템 수정
  const updateItem = useCallback(async (itemId: number, name: string, price: number, imageUrl: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.put(
        ENDPOINTS.ADMIN_ITEM_UPDATE(itemId),
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          params: {
            name: name.trim(),
            price,
            imageUrl: imageUrl.trim()
          }
        }
      )
    } catch (error) {
      console.error('아이템 수정 실패:', error)
      throw new Error('아이템 수정에 실패했습니다.')
    }
  }, [])

  // 아이템 삭제
  const deleteItem = useCallback(async (itemId: number) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete(ENDPOINTS.ADMIN_ITEM_DELETE(itemId), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
    } catch (error) {
      console.error('아이템 삭제 실패:', error)
      throw new Error('아이템 삭제에 실패했습니다.')
    }
  }, [])

  // 페이지 변경
  const changePage = useCallback((newPage: number) => {
    if (newPage >= 0 && newPage < (itemsData?.totalPages || 0)) {
      fetchItems(newPage)
    }
  }, [itemsData?.totalPages, fetchItems])

  // 아이템 타입 라벨 변환
  const getTypeLabel = useCallback((type: ShopItem['type']) => {
    switch (type) {
      case 'BANNER':
        return '배너'
      case 'BORDER':
        return '테두리'
      case 'NAME_COLOR':
        return '닉네임 색상'
      default:
        return type
    }
  }, [])

  // 아이템 수정 (모달용)
  const editItem = useCallback(async (itemId: number, name: string, price: number, imageUrl: string) => {
    try {
      await updateItem(itemId, name, price, imageUrl)
      alert('아이템이 성공적으로 수정되었습니다.')
      return true
    } catch (error) {
      alert(error instanceof Error ? error.message : '아이템 수정에 실패했습니다.')
      return false
    }
  }, [updateItem])

  // 아이템 삭제
  const deleteItemWithConfirm = useCallback(async (itemId: number) => {
    if (!confirm('정말로 이 아이템을 삭제하시겠습니까?')) {
      return false
    }

    try {
      await deleteItem(itemId)
      alert('아이템이 성공적으로 삭제되었습니다.')
      return true
    } catch (error) {
      alert(error instanceof Error ? error.message : '아이템 삭제에 실패했습니다.')
      return false
    }
  }, [deleteItem])

  return {
    itemsData,
    loading,
    currentPage,
    fetchItems,
    updateItem,
    deleteItem,
    changePage,
    editItem,
    deleteItemWithConfirm,
    getTypeLabel
  }
}
