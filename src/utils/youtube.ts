/**
 * YouTube URL에서 videoId 추출
 */
export const getVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

/**
 * YouTube 임베드 URL 생성
 */
export const getEmbedUrl = (url: string): string => {
  const videoId = getVideoId(url)
  if (!videoId) return ''

  // URL에서 시간 파라미터 추출 (t=30s 형태)
  const timeMatch = url.match(/[?&]t=(\d+)s?/)
  const startTime = timeMatch ? timeMatch[1] : '0'

  return `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`
}
