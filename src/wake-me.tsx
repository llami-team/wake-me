import { useEffect, useRef } from "react";

export interface WakeMeProps {
  /** Callback function triggered when a snap or clap is detected */
  onSnap?: () => void;
  /** Callback function triggered when noise is detected, provides a match score */
  onNoise?: (matchScore: number) => void;
  /** TensorFlow.js script URL (default: https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js) */
  tfScriptUrl?: string | null;
  /** Speech Commands script URL (default: https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js) */
  speechCommandsScriptUrl?: string | null;
  /** Base URL where model files are located (default: https://cdn.jsdelivr.net/npm/wake-me@latest/public/snap/) */
  modelBaseUrl?: string;
  /** Threshold for snap detection (default: 1) */
  snapThreshold?: number;
}

/**
 * A React component for TensorFlow-based clap or finger snap detection
 *
 * This component loads TensorFlow.js and a pre-trained audio recognition model
 * to detect claps and finger snaps in real-time using the device's microphone.
 */
export const WakeMe = ({
  onSnap,
  onNoise,
  tfScriptUrl = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js",
  speechCommandsScriptUrl = "https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js",
  modelBaseUrl = "https://cdn.jsdelivr.net/npm/wake-me@latest/public/snap/",
  snapThreshold = 0.95,
}: WakeMeProps) => {
  // Reference to store cleanup function for the audio recognition
  const cleanupRef = useRef<(() => void) | null>(null);

  /**
   * Dynamically loads a JavaScript script into the document
   * @param src - URL of the script to load
   * @returns Promise that resolves when the script is loaded
   */
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

  /**
   * Initializes and configures the audio recognition model
   * Sets up continuous listening for claps and finger snaps
   * @returns Cleanup function to stop listening
   */
  const detectSnap = async () => {
    const url = modelBaseUrl.endsWith("/") ? modelBaseUrl : modelBaseUrl + "/";

    /**
     * Creates and loads the audio recognition model
     * @returns Initialized recognizer instance
     */
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
    // Get indices for snap and finger snap labels in the model's output
    const snapLabelIndex = classLabels.indexOf("Snap");
    const fingerSnapLabelIndex = classLabels.indexOf("FingerSnap");

    // Start continuous audio recognition with specified parameters
    recognizer.listen(
      (result: any) => {
        const scores = result.scores;
        const snapScore = scores[snapLabelIndex];
        const fingerSnapScore = scores[fingerSnapLabelIndex];
        // Trigger callbacks based on detection confidence
        if (snapScore >= snapThreshold || fingerSnapScore >= snapThreshold)
          onSnap?.();
        else onNoise?.(snapScore);
      },
      {
        includeSpectrogram: true, // Include audio spectrogram in analysis
        probabilityThreshold: 0.75, // Minimum confidence threshold
        invokeCallbackOnNoiseAndUnknown: true, // Trigger callback for non-matching sounds
        overlapFactor: 0.5, // Overlap between audio analysis windows
      }
    );

    return () => recognizer.stopListening();
  };

  /**
   * Effect hook to initialize the component
   * Loads required scripts and sets up audio recognition
   */
  useEffect(() => {
    const init = async () => {
      try {
        if (tfScriptUrl) await loadScript(tfScriptUrl);
        if (speechCommandsScriptUrl) await loadScript(speechCommandsScriptUrl);
        const cleanup = await detectSnap();
        cleanupRef.current = cleanup;
      } catch (error) {
        console.error("Failed to initialize WakeMe:", error);
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
