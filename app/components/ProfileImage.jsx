import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import useAuth from '../../context/authContext'
import useTheme from '../../context/themeContext'

const ProfileImage = () => {
  const { user } = useAuth()
  const {isDark} = useTheme()
  return (
    <View className={`w-40 h-40 border-4 rounded-full overflow-hidden ${isDark ? 'border-grey-white' : 'border-navy-blue'}`}>
      <Image
        source={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${
          user?.name || 'random'
        }`}
        style={styles.imageStyles}
      />
    </View>
  )
}

export default ProfileImage

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%',
    contentFit : 'cover'
  }
})
