// 닉네임 색상 매핑 상수
export const NICKNAME_COLOR_MAP: Record<string, string> = {
  'magenta': '#EC4899',      // pink-600
  'cyan': '#7DD3FC',          // sky-300
  'space_gray': '#D4D4D4',    // neutral-300
  'pastel_peach': '#FCA5A5',  // red-300
}

// 닉네임 색상 정의 (상점 모달용)
export const NICKNAME_COLOR_DEFINITIONS: Record<string, {
  koName: string
  colorValue: string
  gradientClass: string
  textColorClass: string
}> = {
  'magenta': { 
    koName: '마젠타',
    colorValue: '#EC4899',
    gradientClass: 'bg-pink-600', 
    textColorClass: 'text-pink-600' 
  },
  'cyan': { 
    koName: '시안',
    colorValue: '#7DD3FC',
    gradientClass: 'bg-sky-300', 
    textColorClass: 'text-sky-300' 
  },
  'space_gray': { 
    koName: '스페이스 그레이',
    colorValue: '#D4D4D4',
    gradientClass: 'bg-gradient-to-b from-neutral-300 to-black', 
    textColorClass: 'text-neutral-300' 
  },
  'pastel_peach': { 
    koName: '파스텔 피치',
    colorValue: '#FCA5A5',
    gradientClass: 'bg-gradient-to-b from-red-300 via-red-200 to-yellow-200', 
    textColorClass: 'text-red-300' 
  },
}

// 레벨별 필요 경험치 계산 함수
export const getExpForLevel = (level: number): number => level * 100

