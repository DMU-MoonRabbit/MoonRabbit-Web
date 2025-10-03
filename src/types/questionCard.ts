export type QuestionCardType = 'text' | 'challenge' | 'support' | 'quote' | 'confession'

export interface QuestionCard {
  type: QuestionCardType
  content: string
}

export const mockQuestionCards: QuestionCard[] = [
  { type: 'text', content: '카페에서 노트북으로 넷플릭스 봐요 ☕️' },
  { type: 'challenge', content: '3일 동안 SNS 안 하기 📵' },
  { type: 'support', content: '나만 힘든 거 아니구나 싶어서 위로가 돼요 🌙' },
  { type: 'text', content: '런닝하고 샤워하면 고민이 다 날아가더라구요 🏃‍♂️' },
  { type: 'quote', content: '노래방에서 말달리자 3번 부르기' },
  { type: 'confession', content: '요즘 너무 외로워서 누군가랑 대화만 해도 좋을 것 같아요 🥲' },
  { type: 'challenge', content: '낯선 사람에게 하루에 한 번 미소 짓기 😀' },
  { type: 'text', content: '음악 들으면서 그림 그리는 시간이 최고예요 🎨' },
  { type: 'support', content: '모든 게 완벽하지 않아도 괜찮다는 걸 배웠어요 💝' }
]
