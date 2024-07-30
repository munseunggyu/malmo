## [말모말모 배포](https://malmo.vercel.app/)

# 당신의 아이디어를 더욱 빛나게! <br />말하는 모자, 말모말모

[말모말모.pdf](https://github.com/user-attachments/files/16404618/default.pdf)

<img width="1136" alt="malmo_thumbnail" src="https://github.com/user-attachments/assets/80dff216-a9fe-4153-af61-b6305c992b39">

## AI와 당신의 아이디어를 브레인스토밍으로 발전시켜주는 서비스, "말모말모"

업무중일 때, SNS 글을 쓸 때, 일상 생활을 할 때... 우리는 하루에도 몇 번씩 아이디어가 필요합니다.<br />
**아이디어가 정말 좋은지 확신이 들지 않거나**🧐 혹은 **체계적으로 발전시키고 싶은데 방법을 몰라 고민스러웠던**😣 경험이 있지 않나요?<br /><br />
**6 Thinking Hats 기법**을 기반으로 학습된 말모말모가<br />
아이디어를 다양한 관점으로 분석하여 병목상태를 해소시키고<br />
체계적인 발전을 가능하게 합니다!<br /><br />

⚪️하양이 - “전 오직 수치화된 데이터로만 말해드려요.” 통계 기반 아나운서<br />
⚫️까망이 - “KPI, BM 다 고려해서 develop 한거 맞아?” 판교어 뼈개발자<br />
🟢초록이 - “이건어때???저건어때???” 물음표살인마 8세<br />
🔵파랑이 - “회의의 시작과 끝, 인사이트는 제게만 맡기시죠.갑시다 모자제군들” 중후한 노인 사회자<br />
🟡노랑이 - “어머 이런 생각을 하다니 멋져요~너무 좋네요~” 금쪽이 칭찬전문 선생님<br />
🔴빨강이 - “😆ㅇㅣ렇게 많은 사람 앞에서 소개하다니 너무 떨리쟈나🍀🍀” 감성적인 사춘기 MZ 소녀

## 🏃 팀원

기획자 1명, 디자이너 1명, FE 1명, BE 1명, AI 1명

## 사용 기술

<div><img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react&logoColor=white">
  </div>
  <img src="https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white">
  </div>

<br>

## 구현 기능 🛠

### 홈

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://s7.ezgif.com/tmp/ezgif-7-62bd5eb48c.gif"
                  width="430px"  alt=""></td>
            <td>메인 홈<ul>
                    <li>비 로그인 상태에서 웹 페이지의 간단한 설명과 모자와 회의 하러가기 버튼 버튼 노출</li>
                    <li>모자와 회의 하러가기 버튼 클릭 시 네이버 로그인 버튼 노출</li>
                    <li>
                    로그인 완료 이후 Navbar와 Guide 버튼가 모자 설명 링크가 있는 Carousel UI 노출
                    </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><img src="https://s7.ezgif.com/tmp/ezgif-7-8a4d402da0.gif"
                  width="430px"  alt=""></td>
            <td>회의 방 생성 모달
              <ul>
                <li>유저는 회의 방 생성 시 카테고리와 회의하고 싶은 아이디어 입력</li>
                <li>카테고리와 아이디어 모두 입력 시 모자와 회의하기 버튼 활성화</li>
                <li>언어모델 HyperCLOVA X, GTP-4o mini 중 선택 가능</li>
              </ul>
            </td>
        </tr>
    </tbody>
</table>

<br />

### 회의 방

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://s4.ezgif.com/tmp/ezgif-4-d917ad8b60.gif"
                  width="430px"  alt=""></td>
            <td>회의 방<ul>
                    <li>회의 방에 대한 제목 요약</li>
                    <li>유저가 작성한 내용을 토대로 6개의 모자가 브레인 스토밍 시작</li>
                    <li>모자들의 발언이 모두 종료되면 해당 회차 회의에 대한 요약 정리</li>
                    <li>
                      AI 토큰 부족 등 에러 발생 시 발언 재생성 버튼 활성화
                    </li>
                    <li>
                     다음 회차를 생성할 수 있는 버튼 활성화
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<br />

### 내역 페이지

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://s2.ezgif.com/tmp/ezgif-2-715d2796ca.gif"
                  width="430px"  alt=""></td>
              <td>내역<ul>
                    <li>이전 회의에 대한 내역 리스트</li>
                    <li>회차 버튼 클릭 시 해당 회차에 해당하는 회의 방으로 이동</li>
                    <li>케밥 메뉴 클릭 시 삭제 버튼 노출</li>
                    <li>
                      삭제 버튼 클릭 시 해당 내역 삭제
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### 북마크 페이지

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://s2.ezgif.com/tmp/ezgif-2-f93c87d1d1.gif"
                  width="430px"  alt=""></td>
              <td>북마크<ul>
                    <li>회의 방에서 Ai 발언들을 각각 북마크 가능</li>
                    <li>북마크 시 북마크 페이지에 노출</li>
                    <li>회차 버튼 클릭 시 해당 회차에 해당하는 회의 방으로 이동</li>
                    <li>케밥 메뉴 클릭 시 삭제 버튼 노출</li>
                    <li>
                      삭제 버튼 클릭 시 해당 내역 삭제
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
