import { Image } from "expo-image";
import { View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-fade-green w-full h-full">
      <Image
        source={require('../assets/Icons/wallet_gif.gif')}
        style={{
          width: "50%",
          height: "50%",
        }}
        contentFit="contain"
      />
    </View>
  );
}
