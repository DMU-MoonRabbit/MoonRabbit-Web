import React from "react"
import { AdminCategoryBar } from '../features/admin/components/AdminCategoryBar'
import { SearchBar } from '../features/admin/components/SearchBar'
import { useAdminStore } from '../features/admin/stores/useAdminStore'
import { useResponsiveStore } from '../common/hooks/useResponsiveStore'
import { ManageUsers } from '../features/admin/components/ManageUsers'
import { ManageBoard } from '../features/admin/components/ManageBoard'
import { ManageDailyQuestion } from '../features/admin/components/ManageDailyQuestion'
import { ManageShopItems } from '../features/admin/components/ManageShopItems'
import clsx from "clsx"

export default function AdminPage() {
  const { activeTab } = useAdminStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div className={clsx(
          "mb-4 gap-4",
          isMobile ? "flex flex-col" : "flex items-center justify-between"
        )}>
          <AdminCategoryBar />
          <SearchBar />
        </div>
      </div>
      {activeTab === 'members' ? (
        <ManageUsers />
      ) : activeTab === 'posts' ? (
        <ManageBoard />
      ) : activeTab === 'dailyQuestion' ? (
        <ManageDailyQuestion />
      ) : (
        <ManageShopItems />
      )}
    </div>
  )
}