import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HeadWrapper = ({
  children,
  bgColor = 'fade-green',
  barColor = 'light-green'
}) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      className={`flex-1 bg-${bgColor}`}
      style={{
        paddingTop: insets.top,
      }}
    >
      {children}
    </View>
  )
}

export default HeadWrapper
