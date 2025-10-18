import React from "react"
import { AdminCategoryBar } from "../components/admin/AdminCategoryBar"
import { SearchBar } from "../components/admin/SearchBar"
import { useAdminStore } from "../stores/useAdminStore"
import { ManageUsers } from "../components/admin/ManageUsers"
import { ManageBoard } from "../components/admin/ManageBoard"
import { ManageDailyQuestion } from "../components/admin/ManageDailyQuestion"

export default function AdminPage() {
  const { activeTab } = useAdminStore()

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-4">
          <AdminCategoryBar />
          <SearchBar />
        </div>
      </div>
      {activeTab === 'members' ? (
        <ManageUsers />
      ) : activeTab === 'posts' ? (
        <ManageBoard />
      ) : (
        <ManageDailyQuestion />
      )}
    </div>
  )
}