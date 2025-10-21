import React from 'react'

import PlaylistCard from '../../features/shop/components/PlaylistCard'
import VideoPlayer from '../../features/shop/components/VideoPlayer'
import { Playlist, PlaylistStates } from '../../features/shop/types/playlist'

interface DesktopLayoutProps {
  playlists: Playlist[]
  playlistStates: PlaylistStates
  getEmbedUrl: (url: string) => string
  onTogglePlay: (index: number) => void
  onToggleLike: (index: number) => void
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  playlists,
  playlistStates,
  getEmbedUrl,
  onTogglePlay,
  onToggleLike,
}) => {
  return (
    <div>
      {/* 유튜브 영상 섹션 */}
      <div className="mb-8">
        <h2 className="text-3xl font-mainFont text-darkWalnut text-center mb-8">
          추천 영상
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {playlists.map((playlist, index) => (
            <VideoPlayer
              key={playlist.id}
              playlist={playlist}
              showVideo={playlistStates[index]?.showVideo || false}
              getEmbedUrl={getEmbedUrl}
            />
          ))}
        </div>
      </div>

      {/* 카드 섹션 */}
      <div className="grid grid-cols-3 gap-6">
        {playlists.map((playlist, index) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            playlistState={
              playlistStates[index] || {
                isPlaying: false,
                isLiked: false,
                showVideo: false,
              }
            }
            onTogglePlay={() => onTogglePlay(index)}
            onToggleLike={() => onToggleLike(index)}
            isMobile={false}
          />
        ))}
      </div>
    </div>
  )
}

export default DesktopLayout
