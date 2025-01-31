interface WakeMeOptions {
  onSnap?: () => void;
  onNoise?: (matchScore: number) => void;
  tfScriptUrl?: string;
  speechCommandsScriptUrl?: string;
  modelBaseUrl?: string;
  snapThreshold?: number;
}

class WakeMeVanilla {
  private cleanupFn: (() => void) | null = null;
  private options: WakeMeOptions;

  constructor(options: WakeMeOptions = {}) {
    this.options = {
      tfScriptUrl: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js",
      speechCommandsScriptUrl: "https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands/dist/speech-commands.min.js",
      modelBaseUrl: "https://cdn.jsdelivr.net/npm/wake-me@latest/public/snap/",
      snapThreshold: 0.95,
      ...options
    };
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  private async detectSnap(): Promise<() => void> {
    const url = this.options.modelBaseUrl!.endsWith("/") 
      ? this.options.modelBaseUrl 
      : this.options.modelBaseUrl + "/";

    async function createModel(this: WakeMeVanilla) {
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

    const recognizer = await createModel.call(this);
    await recognizer.listen(
      (result: { scores: number[] }) => {
        const score = result.scores[0];
        if (score > (this.options.snapThreshold ?? 0.95)) {
          this.options.onSnap?.();
        }
        this.options.onNoise?.(score);
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        overlapFactor: 0.5,
      }
    );

    return () => {
      recognizer.stopListening();
    };
  }

  async init(): Promise<void> {
    try {
      await this.loadScript(this.options.tfScriptUrl!);
      await this.loadScript(this.options.speechCommandsScriptUrl!);
      this.cleanupFn = await this.detectSnap();
    } catch (error) {
      console.error("Failed to initialize WakeMe:", error);
      throw error;
    }
  }

  destroy(): void {
    if (this.cleanupFn) {
      this.cleanupFn();
      this.cleanupFn = null;
    }
  }
}

// Export for use in vanilla JavaScript
(window as any).WakeMe = WakeMeVanilla;
