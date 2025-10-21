import clsx from 'clsx'
import React from 'react'

import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { AdminCategoryBar } from '@/features/admin/components/AdminCategoryBar'
import { ManageBoard } from '@/features/admin/components/ManageBoard'
import { ManageDailyQuestion } from '@/features/admin/components/ManageDailyQuestion'
import { ManageShopItems } from '@/features/admin/components/ManageShopItems'
import { ManageUsers } from '@/features/admin/components/ManageUsers'
import { SearchBar } from '@/features/admin/components/SearchBar'
import { useAdminStore } from '@/features/admin/stores/useAdminStore'

export default function AdminPage() {
  const { activeTab } = useAdminStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div
          className={clsx(
            'mb-4 gap-4',
            isMobile ? 'flex flex-col' : 'flex items-center justify-between',
          )}
        >
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
