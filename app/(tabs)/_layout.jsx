import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import '../../global.css'

export default function RootLayout () {
  const inset = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#143D60',
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-10 h-10 flex justify-center items-center mt-2 ${
                focused ? 'rounded-full bg-vintage-orange' : ''
              }`}
            >
              <Ionicons name='home' color={'white'} size={20} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='Statistics'
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-10 h-10 flex justify-center items-center mt-2 ${
                focused ? 'rounded-full bg-vintage-orange' : ''
              }`}
            >
              <Ionicons name='bar-chart' color={'white'} size={20} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='ExpenseGroup'
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-10 h-10 flex justify-center items-center mt-2 ${
                focused ? 'rounded-full bg-vintage-orange' : ''
              }`}
            >
              <Ionicons name='grid' color={'white'} size={20} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={`w-10 h-10 flex justify-center items-center mt-2 ${
                focused ? 'rounded-full bg-vintage-orange' : ''
              }`}
            >
              <Ionicons name='person' color={'white'} size={20} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
