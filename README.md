# WakeSnap

손뼉 소리나 핑거스냅을 감지하는 React 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install wake-me
# or
yarn add wake-me
```

## 사용법

```tsx
import { WakeSnap } from "wake-me";

function App() {
  return (
    <WakeSnap
      onSnap={() => console.log("스냅이 감지되었습니다!")}
      onNoise={(score) => console.log("노이즈 점수:", score)}
      // 선택적: 커스텀 모델 URL 설정
      modelBaseUrl="/your-model-path/"
    />
  );
}
```

## Props

| Prop                    | 타입                    | 필수 여부 | 설명                                           |
| ----------------------- | ----------------------- | --------- | ---------------------------------------------- |
| onSnap                  | () => void              | 선택      | 스냅이 감지되었을 때 호출되는 콜백             |
| onNoise                 | (score: number) => void | 선택      | 노이즈가 감지되었을 때 호출되는 콜백           |
| modelBaseUrl            | string                  | 선택      | 모델 파일이 위치한 기본 URL (기본값: '/snap/') |
| tfScriptUrl             | string                  | 선택      | TensorFlow.js 스크립트 URL                     |
| speechCommandsScriptUrl | string                  | 선택      | Speech Commands 스크립트 URL                   |

## 모델 파일 설정

컴포넌트가 정상적으로 동작하기 위해서는 다음 파일들이 `modelBaseUrl`에 위치해야 합니다:

- model.json
- metadata.json
- \*.bin 파일들

## 라이선스

MIT
