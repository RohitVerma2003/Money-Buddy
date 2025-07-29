import { createContext, useContext, useState } from "react";
import { Text, View } from "react-native";
import Animated, { BounceInUp, FadeOutUp } from 'react-native-reanimated';

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
    const [text, setText] = useState('')
    const [successText, setSuccessText] = useState('')
    const [dangerText, setDangerText] = useState('')

    const showAlert = (message, duration = 3000) => {
        setText(message)
        setTimeout(() => {
            setText('')
        }, duration)
    }

    const showSuccessAlert = (message, duration = 3000) => {
        setSuccessText(message)
        setTimeout(() => {
            setSuccessText('')
        }, duration)
    }

    const showDangerAlert = (message, duration = 3000) => {
        setDangerText(message)
        setTimeout(() => {
            setDangerText('')
        }, duration)
    }

    return (
        <AlertContext.Provider value={{ showAlert, showDangerAlert, showSuccessAlert }}>
            {children}
            <View className="w-full absolute top-3 z-50">
                {text && (
                    <Animated.View className="w-full mb-2 flex justify-center items-center" entering={BounceInUp.duration(800)} exiting={FadeOutUp.duration(500)}>
                        <View className="w-11/12 p-2 bg-white border-2 h-16 flex justify-center items-start rounded-md">
                            <Text className="font-doodle text-md text-black ">{text}</Text>
                        </View>
                    </Animated.View>
                )}
                {successText && (
                    <Animated.View className="w-full mb-2 flex justify-center items-center" entering={BounceInUp.duration(800)} exiting={FadeOutUp.duration(500)}>
                        <View className="w-11/12 p-2 bg-light-green border-2 h-16 flex justify-center items-start rounded-md">
                            <Text className="font-doodle text-md text-white ">{successText}</Text>
                        </View>
                    </Animated.View>
                )}
                {dangerText && (
                    <Animated.View className="w-full mb-2 flex justify-center items-center" entering={BounceInUp.duration(800)} exiting={FadeOutUp.duration(500)}>
                        <View className="w-11/12 p-2 bg-red-600 border-2 h-16 flex justify-center items-start rounded-md">
                            <Text className="font-doodle text-md text-white ">{dangerText}</Text>
                        </View>
                    </Animated.View>
                )}
            </View>
        </AlertContext.Provider>
    );
}

const useAlert = () => {
    const context = useContext(AlertContext)
    return context
}

export default useAlert