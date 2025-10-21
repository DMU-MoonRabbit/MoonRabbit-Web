import React from 'react'
import PageHeader from '../common/components/PageHeader'

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightBackground">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader showSubtitle={false} />
        
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-3xl font-mainFont text-darkWalnut mb-8 text-center">
            서비스 이용약관
          </h1>
          
          <div className="space-y-8 text-darkWalnut font-gothicFont">
            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제1조 (목적)</h2>
              <p className="leading-relaxed">
                본 약관은 달토끼(이하 "회사")가 제공하는 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제2조 (정의)</h2>
              <div className="space-y-2">
                <p>1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.</p>
                <p>2. "이용자"라 함은 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.</p>
                <p>3. "회원"이라 함은 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제3조 (약관의 효력 및 변경)</h2>
              <div className="space-y-2">
                <p>1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.</p>
                <p>2. 회사는 합리적인 사유가 발생할 경우에는 본 약관을 변경할 수 있으며, 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스의 초기화면에 그 적용일자 7일 이전부터 공지합니다.</p>
                <p>3. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며, 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제4조 (서비스의 제공 및 변경)</h2>
              <div className="space-y-2">
                <p>1. 회사는 다음과 같은 업무를 수행합니다:</p>
                <div className="ml-4 space-y-1">
                  <p>• 고민 상담 및 음악 추천 서비스</p>
                  <p>• 커뮤니티 및 게시판 서비스</p>
                  <p>• 기타 회사가 정하는 업무</p>
                </div>
                <p>2. 회사는 서비스의 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 서비스의 내용을 변경할 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제5조 (서비스의 중단)</h2>
              <div className="space-y-2">
                <p>1. 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</p>
                <p>2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제6조 (회원가입)</h2>
              <div className="space-y-2">
                <p>1. 회원가입은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.</p>
                <p>2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:</p>
                <div className="ml-4 space-y-1">
                  <p>• 가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</p>
                  <p>• 등록 내용에 허위, 기재누락, 오기가 있는 경우</p>
                  <p>• 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제7조 (개인정보보호)</h2>
              <p className="leading-relaxed">
                회사는 관련법령이 정하는 바에 따라서 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위하여 노력합니다. 이용자의 개인정보보호에 관해서는 관련법령 및 회사가 정하는 개인정보처리방침에 정한 바에 의합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제8조 (회원의 ID 및 비밀번호에 대한 의무)</h2>
              <div className="space-y-2">
                <p>1. 회원은 자신의 ID 및 비밀번호에 대한 관리책임이 있습니다.</p>
                <p>2. 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</p>
                <p>3. 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제9조 (이용자의 의무)</h2>
              <div className="space-y-2">
                <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                <div className="ml-4 space-y-1">
                  <p>• 신청 또는 변경시 허위 내용의 등록</p>
                  <p>• 타인의 정보 도용</p>
                  <p>• 회사가 게시한 정보의 변경</p>
                  <p>• 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</p>
                  <p>• 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</p>
                  <p>• 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</p>
                  <p>• 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제10조 (저작권의 귀속 및 이용제한)</h2>
              <div className="space-y-2">
                <p>1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
                <p>2. 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제11조 (손해배상)</h2>
              <p className="leading-relaxed">
                회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 고의 또는 중과실에 의한 경우를 제외하고는 이에 대하여 책임을 부담하지 아니합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제12조 (면책조항)</h2>
              <div className="space-y-2">
                <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                <p>3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여는 책임을 지지 않습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제13조 (준거법 및 관할법원)</h2>
              <div className="space-y-2">
                <p>1. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.</p>
                <p>2. 본 약관은 대한민국 법에 따라 규율되고 해석됩니다.</p>
              </div>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-500 text-center">
                본 약관은 2025년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
