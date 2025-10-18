import React from "react"
import { AdminCategoryBar } from "../components/admin/AdminCategoryBar"
import { SearchBar } from "../components/admin/SearchBar"
import { useAdminStore } from "../stores/useAdminStore"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { ManageUsers } from "../components/admin/ManageUsers"
import { ManageBoard } from "../components/admin/ManageBoard"
import { ManageDailyQuestion } from "../components/admin/ManageDailyQuestion"
import { ManageShopItems } from "../components/admin/ManageShopItems"
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