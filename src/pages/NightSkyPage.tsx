import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryBar from '../components/CategoryBar'
import ConcernCard from '../components/ConcernCard'
import CreateConcernButton from '../components/CreateConcernButton'
import CreateConcernModal from '../components/CreateConcernModal'
import { useUnifiedConcernStore, Concern } from '../stores/useUnifiedConcernStore'
import { useUserProfileStore } from '../stores/useUserProfileStore'
import { usePostAuthorItems } from '../hooks/usePostAuthorItems'

// ConcernCard에 장착 아이템을 적용하는 래퍼 컴포넌트
const ConcernCardWithItems: React.FC<{ concern: Concern; onClick: (id: number) => void }> = ({ concern, onClick }) => {
  const { borderImageUrl } = usePostAuthorItems(concern.userId)
  
  return (
    <ConcernCard
      id={concern.id}
      profileImage={concern.profileImage}
      title={concern.title}
      content={concern.content}
      category={concern.category}
      recentComment={concern.recentComment}
      date={concern.date}
      backgroundImage={concern.backgroundImage}
      onClick={onClick}
      borderImageUrl={borderImageUrl}
    />
  )
}

const NightSkyPage: React.FC = () => {
  //고민 관련 상태관리
  const {
    selectedCategory, //현재 선택된 카테고리
    filteredConcerns, // 필터링 된 고민 목록
    isModalOpen, // 고민 작성 중인지 아닌지
    newConcernTitle, //새로 작성할 고민 제목
    newConcernContent, //고민 내용
    newConcernCategory, //고민 카테고리리
    pageInfo,
    setSelectedCategory,
    setIsModalOpen,
    setNewConcernTitle,
    setNewConcernContent,
    setNewConcernCategory,
    resetForm,
    fetchConcerns,
    setPage,
  } = useUnifiedConcernStore()

  const navigate = useNavigate()

  const { userProfile, fetchUserProfile, fetchUserInventory } = useUserProfileStore()

  useEffect(() => {
    fetchConcerns(pageInfo.number)
  }, [fetchConcerns, pageInfo.number])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  useEffect(() => {
    if (userProfile?.id) {
      fetchUserInventory(userProfile.id)
    }
  }, [userProfile?.id, fetchUserInventory])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleCreateConcern = () => {
    // TODO: 고민 생성 로직 추가
    handleCloseModal()
  }

  const handleCardClick = (id: number) => {
    navigate(`/night-sky/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* 배경 이미지 div */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/images/MoonRabbitStars.png")' }}
      ></div>

      {/* 컨텐츠 컨테이너 */}
      <div className="relative z-10 py-8 px-4">
        <div className="flex justify-between items-center mb-4 ml-2">
          <CategoryBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            disableCentering={true}
          />
          <CreateConcernButton onClick={handleOpenModal} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredConcerns.map((concern) => (
            <ConcernCardWithItems 
              key={concern.id} 
              concern={concern} 
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* 페이징 UI */}
        {!pageInfo.empty && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(pageInfo.number - 1)}
              disabled={pageInfo.first}
              className={`px-4 py-2 rounded-lg ${
                pageInfo.first
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-mainColor text-white hover:bg-opacity-90'
              }`}
            >
              이전
            </button>
            <span className="mx-4">
              {pageInfo.number + 1} / {pageInfo.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pageInfo.number + 1)}
              disabled={pageInfo.last}
              className={`px-4 py-2 rounded-lg ${
                pageInfo.last
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-mainColor text-white hover:bg-opacity-90'
              }`}
            >
              다음
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateConcernModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCategoryChange={setNewConcernCategory}
          selectedCategory={newConcernCategory}
          onTitleChange={setNewConcernTitle}
          onContentChange={setNewConcernContent}
          onCreateConcern={handleCreateConcern}
          title={newConcernTitle}
          content={newConcernContent}
        />
      )}
    </div>
  )
}

export default NightSkyPage
