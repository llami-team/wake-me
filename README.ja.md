# WakeSnap

<p align="center">
  <img src="https://static.llami.net/image/llami-logo.webp" width="128" alt="LLAMI ロゴ">
</p>

手拍子やフィンガースナップを検出する AI ベースの React コンポーネントライブラリです。TensorFlow.js ベースの機械学習モデルを使用して、リアルタイムで正確に音を分析します。

> このプロジェクトは[LLAMI Team](https://llami.net)が提供しています。

_他の言語で読む: [English](README.md), [한국어](README.ko.md)_

## ユースケース

- 🎙️ **音声認識 AI システム**: 手拍子やスナップで AI を起動するウェイクワードの代替として
- 🎮 **ゲームコントロール**: ハンズフリーゲームシナリオでの音声インタラクション
- 🎭 **インタラクティブプレゼンテーション**: プレゼンテーション中のスライド遷移やアニメーションのトリガー
- 🖥️ **ビデオ会議アシスタント**: 発言順番や注目を集めるための合図
- 🎨 **デジタルアートインスタレーション**: 観客とアート作品のインタラクションインターフェース
- 👥 **アクセシビリティ向上**: 身体的制限のあるユーザーのための代替入力方法
- 🤖 **スマートホームコントロール**: IoT デバイス制御のためのシンプルなトリガー方法
- 📱 **モバイルアプリコントロール**: 手が使えない状況でのアプリ制御

## 主な機能

- 🤖 TensorFlow.js を活用した高性能 AI モデル
- ⚡ リアルタイムの音声検出と分析
- 🎯 高精度な手拍子/スナップ認識
- 🪶 軽量で使いやすい

## インストール

```bash
npm install wake-me
# または
yarn add wake-me
```

## 使用方法

```tsx
import { WakeMe } from "wake-me";

function App() {
  return <WakeMe onSnap={() => console.log("スナップを検出しました！")} />;
}
```

## Next.js での使用

Next.js プロジェクトで WakeSnap を使用する場合、必要なスクリプトとモデルファイルを直接組み込む必要があります：

1. `public`ディレクトリにモデルファイルをコピーします。
2. スクリプト URL を CDN から指定します：

```tsx
import { WakeSnap } from "wake-me";

function App() {
  return (
    <WakeSnap
      tfScriptUrl="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"
      speechCommandsScriptUrl="https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js"
      modelBaseUrl="/snap/"
      onSnap={() => console.log("スナップを検出しました！")}
    />
  );
}
```

## プロパティ

| プロパティ名            | 型                        | 必須   | 説明                                                                                    |
| ----------------------- | ------------------------- | ------ | --------------------------------------------------------------------------------------- |
| onSnap                  | `() => void`              | はい   | スナップ音が検出された時に呼び出されるコールバック関数                                  |
| onNoise                 | `(score: number) => void` | いいえ | ノイズが検出された時に呼び出されるコールバック関数                                      |
| tfScriptUrl             | `string`                  | いいえ | TensorFlow.js スクリプトの URL                                                          |
| speechCommandsScriptUrl | `string`                  | いいえ | Speech Commands スクリプトの URL                                                        |
| modelBaseUrl            | `string`                  | いいえ | カスタムモデルのベース URL                                                              |
| snapThreshold           | `number`                  | いいえ | 検出感度のしきい値（デフォルト: 0.95）。検出が不十分な場合は 0.9 に下げることができます |

## ライセンス

MIT ライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。
