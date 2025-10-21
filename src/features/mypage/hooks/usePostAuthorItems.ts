import { useUserProfileStore } from '../stores/useUserProfileStore'

/**
 * 게시글/댓글 작성자의 장착 아이템을 조회하는 커스텀 훅
 * 본인이 작성한 콘텐츠에만 장착 아이템을 반환합니다.
 * 
 * @param authorId - 게시글/댓글 작성자의 userId
 * @returns 작성자 여부, 테두리 URL, 닉네임 색상 스타일
 */
export const usePostAuthorItems = (authorId?: number) => {
  const userProfile = useUserProfileStore(state => state.userProfile)
  const getEquippedBorder = useUserProfileStore(state => state.getEquippedBorder)
  const getEquippedNicknameColor = useUserProfileStore(state => state.getEquippedNicknameColor)

  // 작성자가 없거나 본인이 아닌 경우
  if (!authorId || userProfile?.id !== authorId) {
    return {
      isOwner: false,
      borderImageUrl: undefined,
      nicknameColor: undefined,
    }
  }

  // 본인이 작성한 콘텐츠인 경우
  const border = getEquippedBorder()
  const color = getEquippedNicknameColor()

  return {
    isOwner: true,
    borderImageUrl: border?.imageUrl,
    nicknameColor: color || undefined,
  }
}

