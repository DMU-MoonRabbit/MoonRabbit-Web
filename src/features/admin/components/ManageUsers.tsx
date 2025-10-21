import React, { useEffect } from "react"
import { useManageUsersStore } from "../stores/useManageUsersStore"
import { usePaginationStore } from "@/common/hooks/usePaginationStore"
import { useAdminStore } from "../stores/useAdminStore"
import { useManageUsersAPI } from "../hooks/useManageUsersAPI"
import { ManagePointModal } from "./ManagePointModal"
import { UsersTable } from "./UsersTable"

export const ManageUsers = () => {
  const {
    pageData,
    loading,
    filteredUsers,
    editModalState,
    openEditModal,
    closeEditModal,
    setPageData,
    setFilteredUsers,
  } = useManageUsersStore()
  
  const { usersPage, setUsersPage } = usePaginationStore()
  const { searchTerm, isSearching, clearSearch } = useAdminStore()
  const { fetchUsers, searchUsers, updatePoint, updateTrust } = useManageUsersAPI()

  // 초기 데이터 로딩
  useEffect(() => {
    if (!isSearching) {
      fetchUsers(usersPage)
    }
  }, [usersPage])

  useEffect(() => {
    if (isSearching && searchTerm.trim()) {
      searchUsers(searchTerm)
      setUsersPage(0)
    } else if (!isSearching && !searchTerm.trim()) {
      setFilteredUsers([])
      setUsersPage(0)
      fetchUsers(0)
    }
  }, [isSearching, searchTerm])
  const handleSave = async (changeValue: number) => {
    if (!editModalState.userId || !editModalState.type) return
    
    try {
      if (editModalState.type === 'point') {
        await updatePoint(editModalState.userId, changeValue)
      } else if (editModalState.type === 'trust') {
        await updateTrust(editModalState.userId, changeValue)
      }
      
      // 성공 후 현재 페이지 데이터 새로고침
      if (isSearching && searchTerm.trim()) {
        await searchUsers(searchTerm)
      } else {
        await fetchUsers(usersPage)
      }
      // 모달 닫기
      closeEditModal()
      
    } catch (error) {
      console.error('저장 실패:', error)
      
      let errorMessage = '저장에 실패했습니다. 다시 시도해주세요.'
      
      if (error instanceof Error) {
        if (error.message.includes('로그인이 필요')) {
          errorMessage = '로그인이 필요합니다. 다시 로그인해주세요.'
          // 로그인 페이지로 리다이렉트
          window.location.href = '/login'
          return
        } else if (error.message.includes('관리자 권한')) {
          errorMessage = '관리자 권한이 필요합니다.'
        } else {
          errorMessage = error.message
        }
      }
      
      alert(errorMessage)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (pageData?.totalPages || 0)) {
      setUsersPage(newPage)
      
      // 검색 중이면 클라이언트 사이드 페이지네이션
      if (isSearching && searchTerm.trim() && filteredUsers.length > 0) {
        const pageSize = 10
        const start = newPage * pageSize
        const end = start + pageSize
        const totalElements = filteredUsers.length
        const totalPages = Math.ceil(totalElements / pageSize)
        
        setPageData({
          ...pageData!,
          content: filteredUsers.slice(start, end),
          number: newPage,
          numberOfElements: Math.min(pageSize, totalElements - start),
          first: newPage === 0,
          last: newPage === totalPages - 1,
        })
      } else {
        fetchUsers(newPage)
      }
    }
  }

  const handleEditPoint = (userId: number, userName: string, currentValue: number) => {
    openEditModal('point', userId, userName, currentValue)
  }

  const handleEditTrust = (userId: number, userName: string, currentValue: number) => {
    openEditModal('trust', userId, userName, currentValue)
  }

  return(
    <div className="bg-white rounded-lg shadow-sm p-6">
      <UsersTable
        pageData={pageData}
        loading={loading}
        currentPage={usersPage}
        onPageChange={handlePageChange}
        onEditPoint={handleEditPoint}
        onEditTrust={handleEditTrust}
      />

      {/* 포인트/신뢰도 수정 모달 */}
      <ManagePointModal
        isOpen={editModalState.isOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        title={`${editModalState.userName}님의 ${editModalState.type === 'point' ? '포인트' : '신뢰도'} ${editModalState.type === 'point' ? '지급/차감' : '증가/감소'}`}
        initialValue={editModalState.currentValue}
        type={editModalState.type || 'point'}
      />
    </div>
  )
}