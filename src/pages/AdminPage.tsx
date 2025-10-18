import React from "react"
import { AdminCategoryBar } from "../components/AdminCategoryBar"
import { SearchBar } from "../components/SearchBar"
import { useAdminStore } from "../stores/useAdminStore"
import { ManageUsers } from "../components/ManageUsers"
import { ManageBoard } from "../components/ManageBoard"
import { ManageDailyQuestion } from "../components/ManageDailyQuestion"

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