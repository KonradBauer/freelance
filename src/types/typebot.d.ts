declare module "@typebot.io/react" {
  import { FC } from "react";

  interface BubbleThemeButton {
    backgroundColor?: string;
    iconColor?: string;
    customIconSrc?: string;
    size?: "medium" | "large";
  }

  interface BubbleThemeChatWindow {
    backgroundColor?: string;
    maxWidth?: string;
    maxHeight?: string;
  }

  interface BubbleTheme {
    button?: BubbleThemeButton;
    chatWindow?: BubbleThemeChatWindow;
  }

  interface BubbleProps {
    typebot: string;
    theme?: BubbleTheme;
    prefilledVariables?: Record<string, string>;
    onOpen?: () => void;
    onClose?: () => void;
    onEnd?: () => void;
    onNewMessage?: () => void;
  }

  export const Bubble: FC<BubbleProps>;
}

declare module "@typebot.io/js" {
  export function open(): void;
  export function close(): void;
  export function toggle(): void;
}
