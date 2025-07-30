import { Text, TouchableOpacity, View } from "react-native";

const { createContext, useContext, useState, useRef } = require("react");

const ConfirmContext = createContext()

export const ConfirmProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState(null)

    const resolveRef = useRef(null);

    const returnTrue = () => {
        resolveRef.current(true);
        cleanup();
    };

    const returnFalse = () => {
        resolveRef.current(false);
        cleanup();
    };

    const cleanup = () => {
        setShowModal(false);
        setMessage(null);
        resolveRef.current = null;
    };

    const confirmBox = (message) => {
        return new Promise((resolve) => {
            setMessage(message);
            setShowModal(true);
            resolveRef.current = resolve;
        });
    };

    return (
        <ConfirmContext.Provider value={{ confirmBox }}>
            {children}
            {showModal && <View className="absolute w-full h-full flex-1 justify-center items-center backdrop-blur-xl z-10">
                <View className="w-11/12 h-1/2 bg-light-green border-2 rounded-md p-2">
                    <Text className="font-doodle text-xl my-2 mx-2 text-center">{message}</Text>
                    <View className="w-full flex flex-row items-center justify-around">
                        <TouchableOpacity className="border-2 p-2 bg-fade-green rounded-md" onPress={returnTrue}>
                            <Text className="font-doodle text-md">Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="border-2 p-2 bg-red-500 rounded-md" onPress={returnFalse}>
                            <Text className="font-doodle text-md">No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
        </ConfirmContext.Provider>
    )
}

const useConfirm = () => {
    const context = useContext(ConfirmContext)
    return context
}

export default useConfirm