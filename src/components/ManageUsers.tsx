import React from "react"
import { useManageUsersStore } from "../stores/useManageUsersStore"
import { usePaginationStore } from "../stores/usePaginationStore"
import { useManageUsersAPI } from "../hooks/useManageUsersAPI"
import { ManagePointModal } from "./ManagePointModal"
import { UserReportsModal } from "./UserReportsModal"
import { UsersTable } from "./UsersTable"

export const ManageUsers = () => {
  const {
    pageData,
    loading,
    editModalState,
    reportsModalState,
    openEditModal,
    closeEditModal,
    openReportsModal,
    closeReportsModal,
  } = useManageUsersStore()
  
  const { usersPage, setUsersPage } = usePaginationStore()
  const { fetchUsers, updatePoint, updateTrust } = useManageUsersAPI()

  const handleSave = async (newValue: number) => {
    if (!editModalState.userId || !editModalState.type) return
    
    try {
      if (editModalState.type === 'point') {
        await updatePoint(editModalState.userId, newValue)
      } else if (editModalState.type === 'trust') {
        await updateTrust(editModalState.userId, newValue)
      }
      
      // 성공 후 현재 페이지 데이터 새로고침
      await fetchUsers(usersPage)
      
    } catch (error) {
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (pageData?.totalPages || 0)) {
      setUsersPage(newPage)
    }
  }

  const handleEditPoint = (userId: number, userName: string, currentValue: number) => {
    openEditModal('point', userId, userName, currentValue)
  }

  const handleEditTrust = (userId: number, userName: string, currentValue: number) => {
    openEditModal('trust', userId, userName, currentValue)
  }

  const handleViewReports = (userId: number, userName: string) => {
    openReportsModal(userId, userName)
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
        onViewReports={handleViewReports}
      />

      {/* 포인트/신뢰도 수정 모달 */}
      <ManagePointModal
        isOpen={editModalState.isOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        title={`${editModalState.userName}님의 ${editModalState.type === 'point' ? '포인트' : '신뢰도'} 수정`}
        initialValue={editModalState.currentValue}
      />

      {/* 신고 내역 조회 모달 */}
      <UserReportsModal
        isOpen={reportsModalState.isOpen}
        onClose={closeReportsModal}
        userId={reportsModalState.userId || 0}
        userName={reportsModalState.userName}
      />
    </div>
  )
}