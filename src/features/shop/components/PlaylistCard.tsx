import React from 'react'
import { Playlist, PlaylistState } from '../types/playlist'
import { PlayButton } from './PlayButton'
import { LikeButton } from '../../features/concern-board/components/LikeButton'

interface PlaylistCardProps {
  playlist: Playlist
  playlistState: PlaylistState
  onTogglePlay: () => void
  onToggleLike: () => void
  isMobile?: boolean
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ 
  playlist, 
  playlistState, 
  onTogglePlay, 
  onToggleLike,
  isMobile = false
}) => {
  const cardPadding = isMobile ? "p-3" : "p-4"
  const imageSize = isMobile ? "w-12 h-12" : "w-16 h-16"
  const titleSize = isMobile ? "text-base" : "text-lg"
  const buttonSpacing = isMobile ? "space-x-2" : "space-x-3"
  const marginTop = isMobile ? "mt-2" : ""

  return (
    <div className={`bg-mainWhite rounded-lg shadow-md border-3 border-mainColor ${cardPadding} hover:shadow-lg transition-shadow duration-300 ${marginTop}`}>
      <div className="flex items-center space-x-3">
        <img 
          className={`${imageSize} rounded-md shadow-sm flex-shrink-0`}
          src={playlist.thumbnailUrl || "https://placehold.co/120x120"} 
          alt={`${playlist.title} 이미지`}
        />
        <div className="flex-1 min-w-0">
          <h3 className={`text-mainBlack ${titleSize} font-normal font-mainFont mb-2`}>
            {playlist.title}
          </h3>
          <div className={`flex items-center ${buttonSpacing}`}>
            <PlayButton
              isPlaying={playlistState.isPlaying}
              onToggle={onTogglePlay}
              size="sm"
            />
            <LikeButton
              isLiked={playlistState.isLiked}
              onToggle={onToggleLike}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistCard
