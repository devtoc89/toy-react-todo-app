# To-Do List Application

React와 TypeScript를 기반으로 한 할 일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할 일 추가/수정/삭제 기능
  - 내용과 기한(날짜) 입력 가능
  - 개별 항목 수정 가능
  - 다중 선택 삭제 지원
- 기한 3일 이내 항목 강조 표시
- 무한 스크롤 방식의 리스트 표시
- 검색 기능 (이력 브라우저 세션 저장)

## 기술 스택

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- React Query (TanStack Query)
- Zustand (상태 관리)
- React Hook Form
- dayjs (날짜 처리)

### 개발 도구
- Vite
- ESLint
- Prettier
- MSW (API Mocking)

## 주요 구현 사항

### 1. 최적화된 성능
- React.memo를 통한 불필요한 리렌더링 방지
- Infinite Scroll 구현으로 대량 데이터 효율적 처리
- 디바운스/쓰로틀 적용으로 API 호출 최적화

### 2. 상태 관리
- Zustand를 활용한 전역 상태 관리
- React Query를 통한 서버 상태 관리
- Context API를 활용한 컴포넌트 간 상태 공유

### 3. 사용자 경험(UX)
- 반응형 디자인 적용
- 토스트 메시지를 통한 작업 결과 피드백
- 검색 기록 저장 및 자동 완성 기능

### 4. 코드 품질
- TypeScript를 통한 정적 타입 체크
- ESLint/Prettier를 통한 일관된 코드 스타일
- 컴포넌트 단위의 모듈화된 구조

## 프로젝트 구조
```markdown
  src/
  ├── components/ # 재사용 가능한 UI 컴포넌트
  ├── constans/ # 상수 정의
  ├── contexts/ # React Context 정의
  ├── hooks/ # React hook 관련 로직(공통 hook이 없어 비어있음)
  ├── mocks/ # MSW 설정 및 핸들러
  ├── pages/ # 페이지 컴포넌트
  ├── queries/ # React Query 관련 로직
  ├── stores/ # Zustand 스토어
  ├── types/ # TypeScript 타입 정의
  └── utils/ # 유틸리티 함수
```


## convention
1. react 컴포넌트로 인정되는 부품은 파스칼 케이스로 파일 명명
2. react component의 명칭으로 index.jsx를 대표할 경우가 아니면, 폴더명은 케밥 케이스로 작성
3. 그 외의 파일은 도트 표기법으로 명명
4. FOIT, FOUT 등의 주요 UX를 위한 스타일은 public/ 폴더의 critical.css 사용
5. 한줄 간단 주석으로 작성


## 설치 및 실행
```bash
### 패키지 설치
npm install
### 개발 서버 실행
npm run dev
### 빌드
npm run build
### 빌드 프리뷰
npm run preview
```

