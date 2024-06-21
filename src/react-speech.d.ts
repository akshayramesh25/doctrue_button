declare module "react-speech" {
  import * as React from "react";

  interface SpeechProps {
    text: string;
    textAsButton?: boolean;
    displayText?: string;
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
    onEnd?: () => void;
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
  }

  class Speech extends React.Component<SpeechProps> {}

  export default Speech;
}
