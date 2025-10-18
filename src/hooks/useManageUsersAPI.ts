import { useEffect } from 'react'
import { useManageUsersStore } from '../stores/useManageUsersStore'
import { usePaginationStore } from '../stores/usePaginationStore'
import { updateUserPoint, updateUserTrust } from '../stores/useAdminStore'
import ENDPOINTS from '../api/endpoints'
import axios from 'axios'

export const useManageUsersAPI = () => {
  const { usersPage } = usePaginationStore()
  const { setPageData, setLoading, setFilteredUsers } = useManageUsersStore()

  // 회원 목록 조회
  const fetchUsers = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(ENDPOINTS.ADMIN_USERS(page, 10), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      setPageData(response.data)
      setLoading(false)

    } catch (error) {
      console.error('회원 목록 조회 실패:', error)
      setPageData({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        size: 10,
        content: [],
        number: page,
        sort: [],
        numberOfElements: 0,
        pageable: {
          offset: page * 10,
          sort: [],
          pageNumber: page,
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        empty: true
      })
      setLoading(false)
    }
  }

  // 회원 검색
  const searchUsers = async (nickname: string) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      // 전체 데이터 가져오기
      const response = await axios.get(ENDPOINTS.ADMIN_USERS(0, 1000), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      // 닉네임으로 필터링
      const filteredContent = response.data.content.filter((user: any) => 
        user.nickname.toLowerCase().includes(nickname.toLowerCase())
      )
      setFilteredUsers(filteredContent)
      
      // 페이지네이션
      const pageSize = 10
      const totalElements = filteredContent.length
      const totalPages = Math.ceil(totalElements / pageSize)
      
      setPageData({
        ...response.data,
        content: filteredContent.slice(0, pageSize),
        totalElements,
        totalPages,
        numberOfElements: Math.min(pageSize, totalElements),
        number: 0,
        first: true,
        last: totalPages <= 1,
        empty: filteredContent.length === 0
      })
      setLoading(false)

    } catch (error) {
      console.error('회원 검색 실패:', error)
      setFilteredUsers([])
      setPageData({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        size: 10,
        content: [],
        number: 0,
        sort: [],
        numberOfElements: 0,
        pageable: {
          offset: 0,
          sort: [],
          pageNumber: 0,
          pageSize: 10,
          paged: true,
          unpaged: false
        },
        empty: true
      })
      setLoading(false)
    }
  }

  // 포인트 수정
  const updatePoint = async (userId: number, newPoint: number) => {
    try {
      await updateUserPoint(userId, newPoint)
      console.log('포인트 수정 성공')
      return true
    } catch (error) {
      console.error('포인트 수정 실패:', error)
      throw error
    }
  }

  // 신뢰도 수정
  const updateTrust = async (userId: number, newTrust: number) => {
    try {
      await updateUserTrust(userId, newTrust)
      console.log('신뢰도 수정 성공')
      return true
    } catch (error) {
      console.error('신뢰도 수정 실패:', error)
      throw error
    }
  }

  return {
    fetchUsers,
    searchUsers,
    updatePoint,
    updateTrust,
  }
}

