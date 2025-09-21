import React from 'react'
import { Playlist, PlaylistStates } from '../types/playlist'
import VideoPlayer from './VideoPlayer'
import PlaylistCard from './PlaylistCard'

interface MobileLayoutProps {
  playlists: Playlist[]
  playlistStates: PlaylistStates
  getEmbedUrl: (url: string) => string
  onTogglePlay: (index: number) => void
  onToggleLike: (index: number) => void
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  playlists, 
  playlistStates, 
  getEmbedUrl, 
  onTogglePlay, 
  onToggleLike 
}) => {
  return (
    <div className="space-y-8">
      {playlists.map((playlist, index) => (
        <div key={playlist.id}>
          {/* 유튜브 영상 */}
          <VideoPlayer
            playlist={playlist}
            showVideo={playlistStates[index]?.showVideo || false}
            getEmbedUrl={getEmbedUrl}
          />
          
          {/* 플레이리스트 카드 */}
          <PlaylistCard
            playlist={playlist}
            playlistState={playlistStates[index] || { isPlaying: false, isLiked: false, showVideo: false }}
            onTogglePlay={() => onTogglePlay(index)}
            onToggleLike={() => onToggleLike(index)}
            isMobile={true}
          />
        </div>
      ))}
    </div>
  )
}

export default MobileLayout
