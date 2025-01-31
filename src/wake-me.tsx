import { useEffect, useRef } from "react";

export interface WakeMeProps {
  onSnap?: () => void;
  onNoise?: (matchScore: number) => void;
  /** TensorFlow.js 스크립트 URL (기본값: https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js) */
  tfScriptUrl?: string;
  /** Speech Commands 스크립트 URL (기본값: https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js) */
  speechCommandsScriptUrl?: string;
  /** 모델 파일들이 위치한 기본 URL */
  modelBaseUrl?: string;
}

/**
 * 텐서플로우 기반 손뼉 또는 핑거스냅 인식 React 컴포넌트
 */
export const WakeMe = ({
  onSnap,
  onNoise,
  tfScriptUrl = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js",
  speechCommandsScriptUrl = "https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js",
  modelBaseUrl = "/snap/",
}: WakeMeProps) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  const detectSnap = async () => {
    const url = modelBaseUrl.endsWith("/") ? modelBaseUrl : modelBaseUrl + "/";

    async function createModel() {
      const checkpointURL = url + "model.json";
      const metadataURL = url + "metadata.json";

      const recognizer = (window as any).speechCommands.create(
        "BROWSER_FFT",
        undefined,
        checkpointURL,
        metadataURL
      );

      await recognizer.ensureModelLoaded();
      return recognizer;
    }

    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels();
    const snapLabelIndex = classLabels.indexOf("Snap");
    const fingerSnapLabelIndex = classLabels.indexOf("FingerSnap");

    recognizer.listen(
      (result: any) => {
        const scores = result.scores;
        const snapScore = scores[snapLabelIndex];
        const fingerSnapScore = scores[fingerSnapLabelIndex];
        if (snapScore >= 0.9 || fingerSnapScore >= 0.9) onSnap?.();
        else onNoise?.(snapScore);
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.5,
      }
    );

    return () => recognizer.stopListening();
  };

  useEffect(() => {
    const init = async () => {
      try {
        await loadScript(tfScriptUrl);
        await loadScript(speechCommandsScriptUrl);
        const cleanup = await detectSnap();
        cleanupRef.current = cleanup;
      } catch (error) {
        console.error("Failed to initialize WakeSnap:", error);
      }
    };

    init();

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [tfScriptUrl, speechCommandsScriptUrl, modelBaseUrl]);

  return null;
};

export default WakeMe;
