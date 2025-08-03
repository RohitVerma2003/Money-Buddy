import React, { createContext, useContext, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [dangerText, setDangerText] = useState('');
  const insets = useSafeAreaInsets();

  const slideAnim = useRef(new Animated.Value(-100)).current; 

  const triggerSlide = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showAlert = (message, duration = 3000) => {
    setText(message);
    triggerSlide();
    setTimeout(() => {
      setText('');
    }, duration);
  };

  const showSuccessAlert = (message, duration = 3000) => {
    setSuccessText(message);
    triggerSlide();
    setTimeout(() => {
      setSuccessText('');
    }, duration);
  };

  const showDangerAlert = (message, duration = 3000) => {
    setDangerText(message);
    triggerSlide();
    setTimeout(() => {
      setDangerText('');
    }, duration);
  };

  const alertContent = (msg, bgColor, textColor) => (
    <Animated.View
      className="w-full mb-2 flex justify-center items-center absolute z-50"
      style={{
        top: insets.top,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className={`w-11/12 p-2 ${bgColor} border-2 h-16 flex justify-center items-start rounded-md`}>
        <Text className={`font-doodle text-md ${textColor}`}>{msg}</Text>
      </View>
    </Animated.View>
  );

  return (
    <AlertContext.Provider value={{ showAlert, showDangerAlert, showSuccessAlert }}>
      {children}
      {text && alertContent(text, "bg-white", "text-black")}
      {successText && alertContent(successText, "bg-light-green", "text-white")}
      {dangerText && alertContent(dangerText, "bg-red-600", "text-white")}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
