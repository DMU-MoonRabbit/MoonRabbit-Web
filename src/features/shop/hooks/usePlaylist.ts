import axios from 'axios'
import { useState, useEffect } from 'react'

import { ENDPOINTS } from '@/api/endpoints'
import { getVideoId } from '@/utils/youtube'

import { Playlist, PlaylistStates } from '../types/playlist'

export const usePlaylist = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [playlistStates, setPlaylistStates] = useState<PlaylistStates>({})
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(ENDPOINTS.PLAYLIST_LIST)
        setPlaylists(response.data)

        // 플레이리스트 상태 초기화
        const initialState: PlaylistStates = {}
        response.data.forEach((_: Playlist, index: number) => {
          initialState[index] = {
            isPlaying: false,
            isLiked: false,
            showVideo: false,
          }
        })
        setPlaylistStates(initialState)
      } catch {
        // 에러 처리
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

  const togglePlay = (index: number) => {
    const playlist = playlists[index]
    if (!playlist) return

    const videoId = getVideoId(playlist.videoUrl)
    if (!videoId) return

    const currentState = playlistStates[index]
    const isShowingVideo = currentState?.showVideo || false

    if (!isShowingVideo) {
      // 첫 클릭: 비디오 표시하고 자동재생
      setPlaylistStates((prev) => {
        const newState: PlaylistStates = {}
        Object.keys(prev).forEach((key) => {
          const i = Number(key)
          newState[i] = {
            isPlaying: i === index,
            isLiked: prev[i]?.isLiked ?? false,
            showVideo: i === index,
          }
        })
        return newState
      })
      setPlayingVideoId(videoId)
    } else {
      // 재클릭: 비디오 숨기기 (중지)
      setPlaylistStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          isPlaying: false,
          showVideo: false,
        },
      }))
      setPlayingVideoId(null)
    }
  }

  const toggleLike = (index: number) => {
    setPlaylistStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        isLiked: !prev[index].isLiked,
      },
    }))
  }

  return {
    playlists,
    loading,
    playlistStates,
    playingVideoId,
    togglePlay,
    toggleLike,
  }
}
