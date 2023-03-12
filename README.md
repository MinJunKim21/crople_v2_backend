# croXple [크로플]

### 크로플 배포 : [https://www.croxple.com](https://www.croxple.com/)

# ✨ 서비스 소개

- 관심 운동과 지역을 등록하여 관심이 겹치는 친구를 찾는 **운동인 메이팅 플랫폼**
- 상대방의 프로필카드를 구경하여 매칭 신청을 하고, **매칭이 되면 실시간 챗**
- 친구를 찾으면 함께 운동할 **시설을 추천**

# 👨‍👨‍👦‍👦 팀원 구성

- **FE, BE 개발자 1명 (본인)** : FE, BE 모든 부분 담당
- **기획자 1명** : 서비스 기획, 마케팅 담당
- **디자이너 1명** : 서비스 모든 디자인 파트 담당

# 🔑 핵심 기능

<span><img width = "20%" alt="로그인" src="https://user-images.githubusercontent.com/101058125/224064591-f8c884d0-e7a0-4fdb-a4a3-bb9fb0874e67.png"></span>
<span><img width = "20%" alt="kakaologin" src="https://user-images.githubusercontent.com/101058125/224065113-10dd0154-94e2-40d0-9287-74917ea856c2.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224065462-f5f95f69-e742-4bb7-9591-01646ac3d57f.png"></span>
1. **SNS 로그인 : Node.js passport Oauth 2.0을 이용**
    - 카카오, 네이버, 구글 소셜 로그인을 통하여 서비스 사용
    - passport library Oauth2.0을 사용, 세션을 통하여 로그인 유저를 식별
    - 처음 방문하는 유저는 인사 문구 슬프래시를 접한 뒤 정보입력 플로우로 이동
    - FE에서 Context API 를 통하여 로그인한 유저의 정보와 로그인 상태를 관리
<br />
<br />
<br />
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224068558-c61305e1-0166-4314-a039-36c500408588.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224068783-c7a384f5-7c06-4435-82b7-416457e20392.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224068808-b1a87d91-ed7b-4859-ad40-23dccafbc791.png"></span>

2. **관심 운동 / 지역 선택**
    - 최대, 최소 선택 개수를 만족하면 다음 문항 버튼 활성화
    - 이전 문항으로 돌아가도 선택한 사항이 그대로 체크 유지
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224069620-8c0e4501-8e0a-4d1f-8f8f-aee8048914f7.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224069646-a32521d5-22fc-4284-b214-edd5a34a83a3.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224069825-e5d7fb20-f108-4207-94d9-e4b47d2870fd.png"></span>

3. **프로필 사진 / 닉네임 / 자기 소개 등록 - 이미지 데이터 관리 : Cloudinary 이용**
    - 필수 입력 사항을 모두 기입해야 확인 버튼 활성화
    - 닉네임과 자기소개는 byte를 계산하여 초과하여 작성 안되도록 제한
    - 이미지 등록시 cloudinary에 등록되며, 해당 url이 해당 유저의 db에 저장됨
    - cloudinary에 이미지가 등록되는 중에는 버튼 비활성화, 등록 완료 후 버튼 활성화
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart"   src="https://user-images.githubusercontent.com/101058125/224070365-a02c77ec-e3c2-4b29-a480-6f2d793d0344.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224070400-cb9d8576-6105-4964-b794-e8d6554a95e8.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224070424-b5a22d13-e2d1-4158-974e-81963cab2b29.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224070445-130c0348-a2e6-4abb-a662-ff7969d47c77.png"></span>

4. **프리뷰 카드로 입력사항을 확인 후 유저 정보 db에 업데이트**
    - 다수의 이미지 등록시 개수에 맞는 이미지 슬라이드로 시각화
    - 등록 절차를 완료하면 스플래시로 서비스 사용 방법 튜토리얼을 제공
    - 본인의 프사를 클릭하여 정보 수정 가능, 자신에게 매칭 신청한 타유저들은 스마일 이모티콘으로 표시
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224071985-e507257d-62ed-4dfa-b951-d8aa33138d51.png"></span>

5. **홈화면 - 함께 운동할 타유저들 추천**
    - 본인에게 매칭 신청을 한 유저가 있는 경우 스마일 이모티콘으로 표시
    - 9명의 유저는 전체 가입자들 중에서 랜덤하게 추천
    - 홈화면에 유저들 배치를 불규칙적이게 하여 다른 디자인들과 차별화
    - 중앙의 본인 프로필과 가까울수록 공통 관심분야가 많은 유저들을 추천(개발 진행중)
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224071030-907e9252-922f-429f-9c38-f52a581c8ead.png"></span>
<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224071402-797d2616-6dbd-4964-bf2a-ebe77d90fbc4.png"></span>
<span><img width = "19%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224072837-22b66e89-5eee-457d-886f-b34d42ca8f1a.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224071454-b7203f82-f080-474f-839b-8fe6c6bacade.png"></span>

5. **홈화면 메뉴 - 로그아웃 / 1:1 문의**
    - 로그아웃 확인 시 로그아웃 완료
    - 1:1 문의는 관리자와의 카톡으로 연결
<br />
<br />
<br />

<span><img width = "17%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224073552-a09ebe5b-278c-4204-ace5-525ea3cc4a70.png"></span>
<span><img width = "17%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224073657-4079c9ea-94b8-4a5b-96d4-aec514e2354c.png"></span>
<span><img width = "17%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224073758-a3405d52-e6af-4b35-96b4-5a936f214548.png"></span>
<span><img width = "17%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224073842-75f17e77-0c2d-474c-b720-53785d228a14.png"></span>
<span><img width = "17%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224073985-3d99e1db-07b5-40ac-9678-5274b30fc41b.png"></span>

6. **유저 정보 수정 (프로필사진, 운동, 지역, 자기소개 변경)**
    - 변경된 선택들의 상태가 보여지며, 최종 수정 확인 버튼 클릭시 정보 업데이트
    - 변경 도중 취소할 경우 이전의 정보로 되돌아감
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224074375-96cb770b-7939-4487-a348-440469f69936.png"></span> 
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224074549-3d907493-7e62-47a1-bedf-4d8bc789ed6c.png"></span> 
<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224074631-ef1afd23-d142-45fc-848a-3a18ffeb80d5.png"></span>

7. **타유저들의 프로필카드 구경과 매칭 신청 / 서로 매칭 성공 시 채팅 리스트에 상대방 프로필카드 생성됨**
    - 매칭 미신청, 신청, 매칭된 유저의 상태에 맞추어 버튼의 아이콘이 시각화
    - user의 데이터에 follower, following 카테고리를 구성하여 매칭 신청시 데이터 업데이트
    - 다른 유저의 프로필카드를 클릭해서 열람한 후 되돌아올때 페이지가 reload되지 않도록 컴포넌트로 구성
    - 본인의 프로필카드 클릭시 route path를 :id로 url을 분기하여 서비스 플로우 의도에 맞추어 다르게 구성
 <br />
<br />
<br />

<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224075363-67bc01fb-56e8-4ead-b6e9-dd43b21ef560.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224075395-d8aee880-0cb1-4b55-aa7b-86e690df4824.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224075427-0bdcab76-7250-4982-ae71-9f7ee00594b8.png"></span>

8. **messenger page : 매칭 성공된 유저들 리스트 / 프로필 클릭 시 대화창으로 연결 / 편집 메뉴로 삭제 가능**
    - 매칭된 리스트 없을 시 프로필들 대신 기본 안내 문구 제공
    - 편집 메뉴로 대화 목록에서 대화 리스트 삭제 가능
    - 안읽은 메세지가 와있는 경우 프로필 좌상단에 주황색 알림 마킹
    - 새로 매칭된 인원 - 최근 메세지 있는 순서로 리스트 정렬
<br />
<br />
<br />

<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224075656-9ca8a21c-a045-427c-8aa8-c56b94114d40.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224075675-67ce7a2d-1b0d-4de9-ba65-0b8e3e66c424.png"></span>

9. **Socket io 를 사용하여 채팅 기능 구현(websocket)**
    - model을 conversation과 message로 나누어, 각 대화에 해당하는 유저들 간의 메세지를 나우어 저장
    - sender, receiver, lastMessage 등등의 정보들을 다루어 마지막 메세지가 얼마나 전인지 시간 표기
    - 상대방이 연속적으로 여러 메세지 보낼 경우 프로필사진 하나만 표시
    - 채팅창에서 같은 시간에 보낸 메세지들은 시간을 하나만 표기
    - 상대방과 본인의 메세지 UI와 레이아웃을 구분, 하루가 넘어가면 날짜와 구분선 표시
    - socket io를 사용하여 유저간의 실시간 채팅 구현
 <br />
<br />
<br />

<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224075894-cec4344f-8ba6-4de4-8bec-9b66eec349cc.png"></span>
<span><img width = "20%" alt="onboardstart" src="https://user-images.githubusercontent.com/101058125/224076109-30c9f42c-9824-4a5b-8dd9-27ff30deaf9c.png"></span>
<span><img width = "20%" alt="onboardstart"  src="https://user-images.githubusercontent.com/101058125/224076132-b13be72d-d618-446a-80f6-1006746b6f0b.png"></span>

10. **운동장 페이지 - 시설 추천 / 시설 정보 제공**
    - 시설들의 썸네일 순서는 랜덤하게 제공
    - 각 콘텐츠에 해당되는 정보와 태그들 구성
    - 시설 이미지들은 슬라이드로 시각화
<br />
<br />
<br />

# ⚒️ 기술 스택
| | |
|:--|:--|
|언어 : HTML  CSS  JavaScript|코딩 스타일 : ESlint  Prettier|
|프레임워크 : React|  배포 : Netlify  Render|
|스타일 : Tailwind CSS  Styled-Components|백엔드 :   Node.js  Express |
|상태 관리 : Context API|DB :  MongoDB  Cloudinary|
|VCS : GitHub  |etc : Figma Socket io Hotjar|

1. **Styled-Components와 Tailwind CSS를 상황에 맞추어 섞어 활용**
    - 레이아웃 배치 : Tailwind의 직관적으로 수정을 할 수 있는 장점을 활용
    - 컴포넌트 스타일링 : Styled-Components를 Tailwind 문법으로 사용하여 정돈된 구성과 유틸리티성인 장점을 활용
    - 복잡한 스타일링 : 오리지널 Styled-Component와 Tailwind 문법으로 쓴 Styled-Component를 나누어 코드를 작성, 이 둘을 하나의 태그에 적용하여 하나의 태그를 사용하는 방식으로 작업
2. **배포 환경 / 개발 환경 설정** 
    - 배포 : FE - Netlify / BE - Render 배포
    - .env 를 통하여 환경변수를 개발/ 배포 환경에 나누어 설정한 후, 각 환경에 해당하는 URI 적용
    - Github repo에는 main과 develop 2개의 브랜치로 나누고, 배포와 개발 환경에서 작업을 진행하면서 확인 후 git pull로 업데이트하며 진행
    - main branch push 실행 시 변경사항이 자동 배포되도록 프로덕션 CD를 설정
3. **Responsive View**
    - responsive view extension을 사용하여 다수의 모바일 환경에서 디자인과 레이아웃에 문제가 없는지 확인
    - 모바일 환경에서 사용될 서비스이기에 pc환경은 최소한의 디자인만 반영
4. **사용자 데이터 분석 Hotjar**
    - ver1 의 경험 : croxple ver.1 에서는 웹 링크를 통해서 사람들에게 매칭 조건에 따라 선호도 조사를 하여 운동친구를 찾아주었습니다. 당시에 hotjar을 통해서 실사용자들을 관찰하였습니다.
    - hotjar을 통해서 사용자 경험을 관찰 - 이를 통해 회색 비활성화 버튼이 공지를 슬라이드로 다 보아야 활성화 버튼으로 바뀌는 플로우가 ux면에서 당황스러움을 발견 / 어느 문항에서 가장 고민하는지 비교 / pc(macOS, Window), mobile(ios, android), 태블릿 등등 다양한 환경에서 접속됨 / 어느 경로로 유입이 많이 되는가 / 등등을 알아봄
<br />
<br />
<br />

# 🧑‍💻 협업 파트

### [디자인 파트]

- 피그마를 사용하여 디자이너와 온라인으로 피그마 내부 음성 회의 툴을 사용하여 실시간으로 자주 회의를 나누었으며, add comment 기능으로 세부사항들을 남기고 체크하며 진행하였습니다.
- 디자이너와 디자인과 개발 각각에서 자주 사용되는 디자인 시스템을 서로 공유하고 설명하며 방향성과 효율성을 구축하면서 작업을 진행하였습니다.
- 기본적인 피그마 기능은 사용 가능해서, 필요시 직접 소스를 익스포트 / 그리드 체크 / 스타일링 값들을 추출 등등을 직접하며 협력의 효율성을 높였습니다.

### [기획 파트]

- 최대 입력 byte 설정 후 넘을 경우 타이핑 안되게 하기 / 이미지가 cloudinary에 업로드되는 중에는 페이지 전환 없도록 ux 설정하기 / 어느 부분에 loading page가 노출되는지 / 다양한 모바일에서 레이아웃이 이상한 부분이 있는지 / 등등 빠지거나 개발 지식이 필요한 부분은 구현하면서 꼼꼼하게 체크하여 기획자와 논의하였습니다.
- 최소 인원으로 프로젝트를 진행하다보니 단순히 서비스를 그대로 구현하기 보다, 유의미한 ux와 구현 방법들을 같이 고민하며 진행하였습니다.
- 개발 파트 진행이 가장 오래 걸려서 PM 역할을 병행하여 업무와 시간 조율을 진행하였습니다. 구현 단계에서는 사전에 논의하지 못한 디테일한 사항들이 발견되는 경우가 많았기에, 매주 진행을 하면서 준비 사항을 다시 체크해주며 기획, 디자인, 개발의 진행이 매끄럽게 진행되도록 노력하였습니다.
