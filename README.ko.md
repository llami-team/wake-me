# WakeSnap

<p align="center">
  <img src="https://static.llami.net/image/llami-logo.webp" width="128" alt="LLAMI 로고">
</p>

손뼉 소리나 핑거스냅을 감지하는 AI 기반 React 컴포넌트 라이브러리입니다. TensorFlow.js를 활용한 머신러닝 모델을 통해 정확하고 실시간으로 소리를 감지하고 분석합니다.

> 이 프로젝트는 [LLAMI Team](https://llami.net)에서 제공합니다.

_다른 언어로 읽기: [English](README.md), [日本語](README.ja.md)_

## 온라인 데모

브라우저에서 직접 체험해보세요: [온라인 데모](https://stackblitz.com/edit/wake-me)

⚠️ **오디오 환경 권장사항**:

- 최상의 결과를 위해 외부 스피커와 마이크 사용을 권장합니다
- 이어폰/이어팟 사용 시 정상적으로 동작하지 않을 수 있습니다

## 활용 사례

- 🎙️ **음성 인식 AI 시스템**: 음성 명령을 시작하기 전에 손뼉이나 스냅으로 AI를 깨우는 웨이크 워드 대체 용도
- 🎮 **게임 컨트롤**: 핸즈프리 게임 컨트롤이 필요한 상황에서 소리로 상호작용
- 🎭 **인터랙티브 프레젠테이션**: 발표 중 슬라이드 전환이나 애니메이션 트리거
- 🖥️ **화상 회의 보조**: 발언권 요청이나 주의 집중이 필요할 때 소리로 신호
- 🎨 **디지털 아트 설치**: 관객과 작품 간의 상호작용을 위한 인터페이스
- 👥 **접근성 향상**: 신체적 제약이 있는 사용자를 위한 대체 입력 방식
- 🤖 **스마트홈 제어**: IoT 기기 제어를 위한 간단한 트리거 방식
- 📱 **모바일 앱 제어**: 손이 자유롭지 않은 상황에서의 앱 제어

## 주요 특징

- 🤖 TensorFlow.js 기반의 고성능 AI 모델 사용
- ⚡ 실시간 소리 감지 및 분석
- 🎯 높은 정확도의 손뼉/핑거스냅 인식
- 🪶 가벼운 크기와 쉬운 사용성

## 설치

```bash
npm install wake-me
# 또는
yarn add wake-me
```

## 사용법

```tsx
import { WakeMe } from "wake-me";

function App() {
  return <WakeMe onSnap={() => console.log("스냅이 감지되었습니다!")} />;
}
```

## Props

| Prop                    | 타입                    | 필수 여부 | 설명                                                                           |
| ----------------------- | ----------------------- | --------- | ------------------------------------------------------------------------------ |
| onSnap                  | () => void              | 선택      | 스냅이 감지되었을 때 호출되는 콜백                                             |
| onNoise                 | (score: number) => void | 선택      | 노이즈가 감지되었을 때 호출되는 콜백                                           |
| modelBaseUrl            | string                  | 선택      | 모델 파일이 위치한 기본 URL (기본값: '/snap/')                                 |
| tfScriptUrl             | string                  | 선택      | TensorFlow.js 스크립트 URL                                                     |
| speechCommandsScriptUrl | string                  | 선택      | Speech Commands 스크립트 URL                                                   |
| snapThreshold           | number                  | 선택      | 감지 민감도 임계값 (기본값: 0.95). 감지가 잘 되지 않는 경우 0.9로 낮출 수 있음 |

## 모델 파일 설정

컴포넌트가 정상적으로 동작하기 위해서는 다음 파일들이 `modelBaseUrl`에 위치해야 합니다:

- model.json
- metadata.json
- \*.bin 파일들

## 스크립트와 모델 파일 내장하기 (Next.js 예시)

프로젝트에 필요한 스크립트와 모델 파일을 직접 내장하여 사용할 수 있습니다. Next.js 프로젝트를 예시로 설명하겠습니다.

### 1. 필요한 파일 다운로드

다음 파일들을 다운로드 받아야 합니다:

- TensorFlow.js: https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js
- Speech Commands: https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js
- 모델 파일들:
  - model.json
  - metadata.json
  - \*.bin 파일들

### 2. 파일 위치 설정

Next.js 프로젝트에서는 `public` 디렉토리에 정적 파일들을 위치시킵니다:

```
your-nextjs-project/
├── public/
│   ├── scripts/
│   │   ├── tf.min.js
│   │   └── speech-commands.min.js
│   └── models/
│       ├── model.json
│       ├── metadata.json
│       └── *.bin 파일들
```

### 3. 컴포넌트에서 사용하기

```tsx
import { WakeMe } from "wake-me";

function App() {
  return (
    <WakeMe
      onSnap={() => console.log("스냅이 감지되었습니다!")}
      // 스크립트 URL 설정
      tfScriptUrl="/scripts/tf.min.js"
      speechCommandsScriptUrl="/scripts/speech-commands.min.js"
      // 모델 파일 경로 설정
      modelBaseUrl="/models/"
    />
  );
}
```

Next.js의 경우 `public` 디렉토리의 파일들은 루트 URL('/')에서부터 접근 가능합니다.

## 라이선스

MIT
