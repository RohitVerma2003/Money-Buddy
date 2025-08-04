import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useTheme from '../../context/themeContext'

const ScreenWrapper = ({
  children,
  bgColor = 'fade-green',
  barColor = 'light-green'
}) => {
  const insets = useSafeAreaInsets()
  const { isDark } = useTheme()
  return (
    <View
      className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-' + bgColor}`}
      style={{
        paddingLeft: insets.left + 16,
        paddingRight: insets.right + 16,
        paddingTop: 5
      }}
    >
      <StatusBar barStyle={'default'} className={`${isDark ? 'bg-light-dark' : 'bg-' + bgColor}`} />
      {children}
    </View>
  )
}

export default ScreenWrapper
