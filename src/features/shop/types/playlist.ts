export interface Playlist {
  id: number
  title: string
  videoUrl: string
  videoId: string
  thumbnailUrl: string
  createdAt: string
}

export interface PlaylistState {
  isPlaying: boolean
  isLiked: boolean
  showVideo: boolean
}

export type PlaylistStates = { [key: number]: PlaylistState }
