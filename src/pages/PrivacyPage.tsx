import React from 'react'
import PageHeader from '../common/components/PageHeader'

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightBackground">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader showSubtitle={false} />
        
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-3xl font-mainFont text-darkWalnut mb-8 text-center">
            개인정보 처리방침
          </h1>
          
          <div className="space-y-8 text-darkWalnut font-gothicFont">
            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제1조 (개인정보의 처리목적)</h2>
              <p className="leading-relaxed mb-4">
                달토끼(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <div className="space-y-2">
                <p><strong>1. 홈페이지 회원가입 및 관리</strong></p>
                <p className="ml-4">회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.</p>
                
                <p><strong>2. 재화 또는 서비스 제공</strong></p>
                <p className="ml-4">서비스 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산을 목적으로 개인정보를 처리합니다.</p>
                
                <p><strong>3. 고충처리</strong></p>
                <p className="ml-4">민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보의 목적으로 개인정보를 처리합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <div className="space-y-2">
                  <p><strong>1. 홈페이지 회원가입 및 관리</strong></p>
                  <p className="ml-4">보존기간: 회원탈퇴시까지</p>
                  
                  <p><strong>2. 재화 또는 서비스 제공</strong></p>
                  <p className="ml-4">보존기간: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</p>
                  <p className="ml-4 ml-4">단, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지</p>
                  <p className="ml-4 ml-4">• 계약 또는 청약철회 등에 관한 기록: 5년</p>
                  <p className="ml-4 ml-4">• 대금결제 및 재화 등의 공급에 관한 기록: 5년</p>
                  <p className="ml-4 ml-4">• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</p>
                  
                  <p><strong>3. 고충처리</strong></p>
                  <p className="ml-4">보존기간: 3년</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제3조 (처리하는 개인정보 항목)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 다음의 개인정보 항목을 처리하고 있습니다.
                </p>
                <div className="space-y-2">
                  <p><strong>1. 홈페이지 회원가입 및 관리</strong></p>
                  <p className="ml-4">필수항목: 이메일, 비밀번호, 닉네임</p>
                  <p className="ml-4">선택항목: 생년월일, 성별</p>
                  <p className="ml-4">자동수집항목: IP주소, 접속기록, 서비스 이용기록</p>
                  
                  <p><strong>2. 재화 또는 서비스 제공</strong></p>
                  <p className="ml-4">필수항목: 이메일, 닉네임</p>
                  <p className="ml-4">자동수집항목: IP주소, 접속기록, 서비스 이용기록</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제4조 (개인정보의 제3자 제공)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
                <p className="leading-relaxed">
                  회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>제공받는 자:</strong> 현재 제공하지 않음</p>
                  <p><strong>제공목적:</strong> -</p>
                  <p><strong>제공항목:</strong> -</p>
                  <p><strong>보유·이용기간:</strong> -</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제5조 (개인정보처리의 위탁)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>위탁받는 자:</strong> 현재 위탁하지 않음</p>
                  <p><strong>위탁하는 업무의 내용:</strong> -</p>
                </div>
                <p className="leading-relaxed">
                  회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                </p>
                <div className="space-y-2">
                  <p>1. 개인정보 처리현황 통지요구</p>
                  <p>2. 개인정보 열람요구</p>
                  <p>3. 개인정보 정정·삭제요구</p>
                  <p>4. 개인정보 처리정지 요구</p>
                </div>
                <p className="leading-relaxed">
                  제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
                </p>
                <p className="leading-relaxed">
                  정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제7조 (개인정보의 파기)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <div className="space-y-2">
                  <p><strong>1. 파기절차</strong></p>
                  <p className="ml-4">회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                  
                  <p><strong>2. 파기방법</strong></p>
                  <p className="ml-4">회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 로우레벨포맷(Low Level Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄하거나 소각하여 파기합니다.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제8조 (개인정보의 안전성 확보조치)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                </p>
                <div className="space-y-2">
                  <p><strong>1. 관리적 조치</strong></p>
                  <p className="ml-4">내부관리계획 수립·시행, 정기적 직원 교육 등</p>
                  
                  <p><strong>2. 기술적 조치</strong></p>
                  <p className="ml-4">개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</p>
                  
                  <p><strong>3. 물리적 조치</strong></p>
                  <p className="ml-4">전산실, 자료보관실 등의 접근통제</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제9조 (개인정보보호책임자)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>개인정보보호책임자</strong></p>
                  <p>성명: 달토끼 관리자</p>
                  <p>연락처: admin@moonrabbit.co.kr</p>
                  <p>직책: 관리자</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제10조 (권익침해 구제방법)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  정보주체는 아래의 기관에 대해 개인정보 침해신고를 할 수 있습니다.
                </p>
                <div className="space-y-2">
                  <p><strong>1. 개인정보보호위원회</strong></p>
                  <p className="ml-4">개인정보보호 신고센터: privacy.go.kr / 국번없이 182</p>
                  <p className="ml-4">개인정보 분쟁조정위원회: privacy.go.kr / 국번없이 183</p>
                  
                  <p><strong>2. 대검찰청 사이버범죄수사단</strong></p>
                  <p className="ml-4">www.spo.go.kr / 02-3480-3571</p>
                  
                  <p><strong>3. 경찰청 사이버테러대응센터</strong></p>
                  <p className="ml-4">www.netan.go.kr / 국번없이 182</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-mainFont text-mainColor mb-4">제11조 (개인정보 처리방침 변경)</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                </p>
              </div>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-500 text-center">
                본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
