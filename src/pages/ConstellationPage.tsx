import React from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { usePlaylist } from '../hooks/usePlaylist'
import { getEmbedUrl } from '../utils/youtube'
import StarBackground from '../components/StarBackground'
import PageHeader from '../components/PageHeader'
import MobileLayout from '../components/MobileLayout'
import DesktopLayout from '../components/DesktopLayout'

const ConstellationPage: React.FC = () => {
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'
  
  const { 
    playlists, 
    loading, 
    playlistStates, 
    togglePlay, 
    toggleLike 
  } = usePlaylist()

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      <StarBackground isMobile={isMobile} />

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <PageHeader />

        <div className="mb-8 relative z-10">
          {loading ? (
            <div className="text-center py-8">
              <span className="text-darkWalnut text-lg font-mainFont">플레이리스트를 불러오는 중...</span>
            </div>
          ) : (
            <>
              {isMobile && (
                <MobileLayout
                  playlists={playlists}
                  playlistStates={playlistStates}
                  getEmbedUrl={getEmbedUrl}
                  onTogglePlay={togglePlay}
                  onToggleLike={toggleLike}
                />
              )}

              {!isMobile && (
                <DesktopLayout
                  playlists={playlists}
                  playlistStates={playlistStates}
                  getEmbedUrl={getEmbedUrl}
                  onTogglePlay={togglePlay}
                  onToggleLike={toggleLike}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConstellationPage
