import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

import PageHeader from '@/common/components/PageHeader'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: '달토끼는 어떤 서비스인가요?',
      answer:
        '달토끼는 고민이 있을 때 음악을 통해 위로받을 수 있는 서비스입니다. 사용자들이 자신의 고민을 공유하고, AI가 그에 맞는 음악을 추천해드립니다. 또한 다른 사용자들과의 소통을 통해 서로를 위로할 수 있는 커뮤니티 기능도 제공합니다.',
    },
    {
      id: 2,
      question: '회원가입은 어떻게 하나요?',
      answer:
        "달토끼 서비스 이용을 위해서는 회원가입이 필요합니다. 홈페이지의 '로그인' 버튼을 클릭하면 구글 또는 카카오 계정으로 간편하게 회원가입할 수 있습니다.",
    },
    {
      id: 3,
      question: '익명으로 글을 작성할 수 있나요?',
      answer:
        "네, 가능합니다. 고민을 작성할 때 '익명으로 작성하기' 옵션을 선택하면 익명으로 글을 올릴 수 있습니다. 익명으로 작성된 글은 다른 사용자들에게 익명으로 표시됩니다.",
    },
    {
      id: 4,
      question: '음악 추천은 어떻게 이루어지나요?',
      answer:
        '매주 금요일 저녁 10시에 새로운 음악 추천이 업데이트됩니다. 추천된 음악은 플레이리스트 형태로 제공되며, 재생 버튼을 통해 바로 재생할 수 있습니다.',
    },
    {
      id: 5,
      question: '다른 사람의 고민에 댓글로 응답할 수 있나요?',
      answer:
        '네, 가능합니다. 다른 사용자의 고민에 공감하고 위로의 댓글을 남길 수 있습니다. 다만 비방이나 욕설 등 부적절한 내용은 금지되며, 신고 기능을 통해 부적절한 댓글을 신고할 수 있습니다.',
    },
    {
      id: 6,
      question: '마이페이지에서는 무엇을 할 수 있나요?',
      answer:
        "마이페이지에서는 본인이 작성한 고민글들을 확인할 수 있으며, 레벨 시스템을 통해 활동량을 확인할 수 있습니다. 또한 '내 밤하늘'과 '내 아이템' 기능을 통해 개인화된 콘텐츠를 관리할 수 있습니다.",
    },
    {
      id: 7,
      question: '레벨은 어떻게 올리나요?',
      answer:
        '레벨은 고민글 작성, 댓글 작성, 다른 사용자들과의 상호작용 등의 활동을 통해 경험치를 얻어 올릴 수 있습니다. 더 많은 활동을 할수록 더 높은 레벨에 도달할 수 있습니다.',
    },
    {
      id: 8,
      question: '부적절한 게시물이나 댓글을 신고하고 싶어요',
      answer:
        '각 게시물과 댓글 옆에 있는 신고 버튼을 클릭하여 부적절한 내용을 신고할 수 있습니다. 신고된 내용은 검토 후 적절한 조치가 취해집니다.',
    },
    {
      id: 9,
      question: '개인정보는 어떻게 보호되나요?',
      answer:
        '달토끼는 사용자의 개인정보를 철저히 보호합니다. 개인정보처리방침에 따라 수집, 이용, 보관, 폐기하는 모든 과정에서 관련 법률을 준수하며, 사용자의 동의 없이는 개인정보를 제3자에게 제공하지 않습니다.',
    },
    {
      id: 10,
      question: '계정을 삭제하고 싶어요',
      answer:
        "마이페이지의 '로그아웃' 버튼을 통해 로그아웃할 수 있으며, 계정 삭제를 원하실 경우 고객센터로 문의해주시면 도움을 드리겠습니다.",
    },
    {
      id: 11,
      question: '서비스 이용 중 문제가 생겼어요',
      answer:
        '서비스 이용 중 문제가 발생하신 경우, 고객센터로 문의해주시거나 FAQ에서 관련 내용을 찾아보실 수 있습니다. 빠른 시일 내에 답변드리도록 하겠습니다.',
    },
    {
      id: 12,
      question: '모바일에서도 사용할 수 있나요?',
      answer:
        '네, 달토끼는 반응형 웹으로 제작되어 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 환경으로 이용하실 수 있습니다.',
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <div className="min-h-screen bg-lightBackground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PageHeader showSubtitle={false} />

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mt-6 sm:mt-8">
          <h1 className="text-2xl sm:text-3xl font-mainFont text-darkWalnut mb-6 sm:mb-8 text-center">
            자주 묻는 질문
          </h1>

          <div className="space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-mainFont text-darkWalnut text-base sm:text-lg leading-relaxed pr-2">
                    Q. {item.question}
                  </span>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-mainColor flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-mainColor flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(item.id) && (
                  <div className="px-4 sm:px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-gothicFont text-darkWalnut leading-relaxed text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-lightBeige rounded-lg">
            <h3 className="font-mainFont text-darkWalnut text-lg sm:text-xl mb-3 sm:mb-4 text-center">
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="font-gothicFont text-darkWalnut text-center leading-relaxed text-sm sm:text-base">
              위에서 찾지 못한 답변이 있으시다면 언제든지 문의해주세요.
              <br />
              빠른 시일 내에 답변드리도록 하겠습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
