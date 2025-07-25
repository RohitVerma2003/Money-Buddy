import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({
  children,
  bgColor = 'fade-green',
  barColor = 'light-green'
}) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      className={`flex-1 bg-${bgColor}`}
      style={{
        paddingLeft: insets.left + 16,
        paddingRight: insets.right + 16,
        paddingTop : 5
      }}
    >
      <StatusBar barStyle={'default'} className={`bg-${barColor}`} />
      {children}
    </View>
  )
}

export default ScreenWrapper
