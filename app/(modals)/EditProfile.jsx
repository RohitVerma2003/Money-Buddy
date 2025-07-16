import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import * as Yup from 'yup'
import useAuth from '../../context/authContext'
import Header from '../components/Header'
import updateUserProfile from '../services/userService'
import ScreenWrapper from '../utilities/ScreenWrapper'

const EditProfile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    name: Yup.string()
      .min(5, 'Too Short')
      .max(20, 'Too Long')
      .required('Required')
  })

  const handleSubmit = async values => {
    if(loading) return;
    if(!values.name || !values.email) return;
    setLoading(true)
    const uid = user?.uid
    const result = await updateUserProfile(uid, values)

    if (result.success) {
      await updateUser(uid)
      router.back()
    } else {
      Alert.alert('Error', result?.message)
    }
    setLoading(true)
  }

  return (
    <ScreenWrapper>
      <Header/>
      <View className='flex-1 mt-2'>
        <Text className='text-3xl font-flap-stick'>Edit Profile</Text>
        <View className='mt-10'>
          <Formik
            initialValues={{ name: user?.name || '', email: user?.email || '' }}
            validationSchema={signupSchema}
            onSubmit={values => {
              const trimmedValues = {
                name: values.name.trim(),
                email: values.email.trim()
              }
              handleSubmit(trimmedValues)
            }}
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
                  <Ionicons name='person' size={25} />
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

                <View className='flex flex-row items-center gap-1 mt-5'>
                  <Ionicons name='lock-closed' size={25} />
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

                <View className='w-full flex justify-center items-center mt-10 relative'>
                  <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-8 top-1' />
                  <TouchableOpacity
                    className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
                    onPress={handleSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator color={'black'} />
                    ) : (
                      <Text className='font-flap-stick text-xl'>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile
