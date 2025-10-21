import clsx from 'clsx'
import React, { memo, useCallback, useEffect } from 'react'

import { useUserProfileStore } from '../stores/useUserProfileStore'

interface UserInventoryProps {
  userId?: number
}

const UserInventory: React.FC<UserInventoryProps> = memo(({ userId }) => {
  const {
    userInventory,
    loading,
    error,
    fetchUserInventory,
    equipItem,
    unequipItem,
  } = useUserProfileStore()

  useEffect(() => {
    if (userId) {
      fetchUserInventory(userId)
    }
  }, [userId, fetchUserInventory])

  const handleEquipItem = useCallback(
    async (userItemId: number) => {
      await equipItem(userItemId)
    },
    [equipItem],
  )

  const handleUnequipItem = useCallback(
    async (userItemId: number) => {
      await unequipItem(userItemId)
    },
    [unequipItem],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">인벤토리를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!userInventory || userInventory.items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">보유한 아이템이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-mainFont text-darkWalnut mb-2">
          내 아이템 ({userInventory.totalItems}개)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {userInventory.items.map((item) => (
          <div
            key={item.id}
            className={clsx(
              'border rounded-lg p-4 transition-all duration-200',
              item.equipped
                ? 'border-mainColor bg-lightBeige'
                : 'border-gray-200 bg-white hover:border-gray-300',
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-mainFont text-darkWalnut text-sm mb-1">
                  {item.itemName}
                </h4>
                {item.content && (
                  <p className="text-xs text-gray-600 mb-2">{item.content}</p>
                )}
                <span
                  className={clsx(
                    'inline-block px-2 py-1 rounded-full text-xs',
                    item.equipped
                      ? 'bg-mainColor text-white'
                      : 'bg-gray-100 text-gray-600',
                  )}
                >
                  {item.equipped ? '장착 중' : '미장착'}
                </span>
              </div>

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-12 h-12 object-cover rounded ml-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>

            <div className="flex gap-2">
              {item.equipped ? (
                <button
                  onClick={() => handleUnequipItem(item.id)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded transition-colors"
                >
                  장착 해제
                </button>
              ) : (
                <button
                  onClick={() => handleEquipItem(item.id)}
                  className="flex-1 bg-mainColor hover:bg-mainColor/80 text-white text-xs py-2 px-3 rounded transition-colors"
                >
                  장착
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default UserInventory
