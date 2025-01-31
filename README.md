# WakeSnap

<p align="center">
  <img src="https://static.llami.net/image/llami-logo.webp" width="128" alt="LLAMI Logo">
</p>

AI-based React component library that detects clapping sounds or finger snaps. Using a TensorFlow.js-based machine learning model, it accurately analyzes sounds in real-time.

> This project is provided by [LLAMI Team](https://llami.net)

_Read this in other languages: [한국어](README.ko.md), [日本語](README.ja.md)_

## Online Demo

Try out WakeSnap in your browser: [Online Demo](https://stackblitz.com/edit/wake-me)

⚠️ **Audio Setup Recommendation**:

- For best results, please use external speakers and microphone
- The detection may not work properly with earphones/earbuds

## Use Cases

- 🎙️ **Voice Recognition AI Systems**: As a wake word alternative to activate AI using claps or snaps
- 🎮 **Game Control**: Sound-based interaction for hands-free gaming scenarios
- 🎭 **Interactive Presentations**: Trigger slide transitions or animations during presentations
- 🖥️ **Video Conference Assistant**: Signal for speaking turns or attention
- 🎨 **Digital Art Installations**: Interface for audience-artwork interaction
- 👥 **Accessibility Enhancement**: Alternative input method for users with physical limitations
- 🤖 **Smart Home Control**: Simple trigger method for IoT device control
- 📱 **Mobile App Control**: App control in hands-busy situations

## Key Features

- 🤖 High-performance AI model powered by TensorFlow.js
- ⚡ Real-time sound detection and analysis
- 🎯 High-accuracy clap/snap recognition
- 🪶 Lightweight and easy to use

## Framework Support

WakeMe is designed to be framework-agnostic! While it's primarily a React component, you can use it with:

- React
- Vanilla JavaScript
- Angular
- Vue.js
- Any other JavaScript framework

### React Usage

```tsx
import { WakeMe } from "wake-me";

function App() {
  return <WakeMe onSnap={() => console.log("Snap detected!")} />;
}
```

### Vanilla JavaScript Usage

```html
<script src="https://cdn.jsdelivr.net/npm/wake-me@latest/dist/vanilla/vanilla.global.js"></script>
<script>
  const wakeMe = new WakeMe({
    onSnap: () => {
      // Handle snap event
      console.log("Snap!");
    },
    onNoise: (score) => {
      // Handle noise level
      console.log("Noise level:", score);
    },
  });

  // Start listening
  wakeMe.init();

  // Clean up when done
  // wakeMe.destroy();
</script>
```

## Installation

```bash
npm install wake-me
# or
yarn add wake-me
```

## Usage

```tsx
import { WakeMe } from "wake-me";

function App() {
  return <WakeMe onSnap={() => console.log("Snap detected!")} />;
}
```

## Props

| Prop                    | Type                    | Required | Description                                                                                                 |
| ----------------------- | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| onSnap                  | () => void              | Optional | Callback when snap is detected                                                                              |
| onNoise                 | (score: number) => void | Optional | Callback when noise is detected                                                                             |
| modelBaseUrl            | string                  | Optional | Base URL for model files (default: '/snap/')                                                                |
| tfScriptUrl             | string                  | Optional | TensorFlow.js script URL                                                                                    |
| speechCommandsScriptUrl | string                  | Optional | Speech Commands script URL                                                                                  |
| snapThreshold           | number                  | Optional | Detection sensitivity threshold (default: 0.95). Can be lowered to 0.9 if detection is not sensitive enough |

## Model File Setup

The following files must be present in the `modelBaseUrl` for the component to work properly:

- model.json
- metadata.json
- \*.bin files

## Embedding Scripts and Model Files (Next.js Example)

You can embed the required scripts and model files directly in your project. Here's an example using Next.js:

### 1. Download Required Files

Download the following files:

- TensorFlow.js: https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js
- Speech Commands: https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js
- Model files:
  - model.json
  - metadata.json
  - \*.bin files

### 2. File Placement

In a Next.js project, place static files in the `public` directory:

```
your-nextjs-project/
├── public/
│   ├── scripts/
│   │   ├── tf.min.js
│   │   └── speech-commands.min.js
│   └── models/
│       ├── model.json
│       ├── metadata.json
│       └── *.bin files
```

### 3. Using in Component

```tsx
import { WakeMe } from "wake-me";

function App() {
  return (
    <WakeMe
      onSnap={() => console.log("Snap detected!")}
      // Set script URLs
      tfScriptUrl="/scripts/tf.min.js"
      speechCommandsScriptUrl="/scripts/speech-commands.min.js"
      // Set model files path
      modelBaseUrl="/models/"
    />
  );
}
```

In Next.js, files in the `public` directory are accessible from the root URL ('/').

## License

MIT
