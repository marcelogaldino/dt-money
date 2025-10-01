import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyBoardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });

    const keyboardCloseListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardCloseListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
