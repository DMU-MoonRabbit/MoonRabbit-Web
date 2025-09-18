import React from 'react'
import { Playlist } from '../types/playlist'

interface VideoPlayerProps {
  playlist: Playlist
  showVideo: boolean
  getEmbedUrl: (url: string) => string
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  playlist, 
  showVideo, 
  getEmbedUrl, 
  className = "" 
}) => {
  return (
    <div className={`bg-mainWhite rounded-lg aspect-video hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ${className}`}>
      {showVideo ? (
        <iframe
          src={getEmbedUrl(playlist.videoUrl)}
          title={playlist.title}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full relative">
          {playlist.thumbnailUrl ? (
            <img 
              src={playlist.thumbnailUrl} 
              alt={playlist.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-mainBlack text-lg lg:text-xl font-normal font-mainFont">
                {playlist.title}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
