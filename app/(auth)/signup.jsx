import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import * as Yup from 'yup'
import useAuth from '../../context/authContext'
import Header from '../components/Header.jsx'
import ScreenWrapper from '../utilities/ScreenWrapper.jsx'

const Signup = () => {
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Too Short')
      .max(20, 'Too Long')
      .required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(6, 'Too Short')
  })

  const router = useRouter()

  const handleSubmit = async values => {
    if (loading) return
    setLoading(true)
    const result = await signUp(values)

    if (result?.success) {
      console.log(result)
    } else {
      Alert.alert('Error', result.error.message)
    }
    setLoading(false)
  }

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Header />
        <View className='w-full h-full bg-fade-green flex-1 mt-5'>
          <View className='w-full max-h-20 flex-1 justify-center items-center flex-row-reverse'>
            <Image
              source={require('../../assets/Icons/wallet.png')}
              style={{ width: '13%', height: '100%' }}
              contentFit='contain'
            />
            <Text className='font-flap-stick text-5xl'>Money Buddy</Text>
          </View>

          <View className='my-5'>
            <Text className='font-flap-stick text-4xl'>Sign Up</Text>
          </View>

          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={signupSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View>
                <View className='flex flex-row items-center gap-1'>
                  <Ionicons name='person-circle' size={30} />
                  <Text className='font-doodle text-lg'>Name</Text>
                </View>
                <TextInput
                  className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-lg'
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />

                {errors.name && touched.name ? (
                  <Text className='text-xs font-doodle text-red-600'>
                    {errors.name}
                  </Text>
                ) : null}

                <View className='flex flex-row items-center gap-1 mt-2'>
                  <Ionicons name='mail' size={25} />
                  <Text className='font-doodle text-lg'>Email</Text>
                </View>
                <TextInput
                  className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-lg'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                {errors.email && touched.email ? (
                  <Text className='text-xs font-doodle text-red-600'>
                    {errors.email}
                  </Text>
                ) : null}

                <View className='flex flex-row items-center gap-1 mt-2'>
                  <Ionicons name='lock-closed' size={25} />
                  <Text className='font-doodle text-lg'>Password</Text>
                </View>
                <TextInput
                  className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-lg'
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {errors.password && touched.password ? (
                  <Text className='text-xs font-doodle text-red-600'>
                    {errors.password}
                  </Text>
                ) : null}

                <View className='w-full flex justify-center items-center mt-10 relative'>
                  <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-8 top-1' />
                  <TouchableOpacity
                    className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
                    onPress={handleSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text className='font-flap-stick text-xl'>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          <Text className='w-full text-center flex justify-center items-center font-doodle mt-5'>
            Already a user?{' '}
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className='font-doodle text-blue-600'>Log In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Signup
