import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import * as Yup from 'yup'
import useAlert from '../../context/alertContext'
import useAuth from '../../context/authContext'
import useTheme from '../../context/themeContext'
import Header from '../components/Header'
import updateUserProfile from '../services/userService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const EditProfile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { showSuccessAlert, showDangerAlert } = useAlert()
  const { isDark } = useTheme()

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Too Short')
      .max(20, 'Too Long')
      .required('Required')
  })

  const handleSubmit = async values => {
    if (loading) return
    if (!values.name) return
    setLoading(true)
    const uid = user?.uid
    const result = await updateUserProfile(uid, values)

    if (result.success) {
      await updateUser(uid)
      showSuccessAlert('Profile updated successfully...')
      router.back()
    } else {
      showDangerAlert('Error in updating the profile, try again later...')
    }
    setLoading(false)
  }

  return (
    <HeadWrapper>
      <Header heading='Edit Profile' />
      <ScreenWrapper>
        <View className='flex-1 mt-2'>
          <View className=''>
            <Formik
              initialValues={{ name: user?.name || '' }}
              validationSchema={signupSchema}
              onSubmit={values => {
                const trimmedValues = {
                  name: values.name.trim()
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
                    <Ionicons
                      name='person'
                      size={25}
                      color={isDark ? 'white' : 'black'}
                    />
                    <Text
                      className={`font-doodle text-lg ${
                        isDark && 'text-white'
                      }`}
                    >
                      Name
                    </Text>
                  </View>
                  <TextInput
                    className={`w-full h-16 border-2 rounded-md font-doodle text-lg mt-2 ${
                      isDark
                        ? 'bg-light-dark border-grey-white text-white'
                        : 'bg-light-green'
                    }`}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  {errors.name && touched.name ? (
                    <Text className='text-xs font-doodle text-red-600'>
                      {errors.name}
                    </Text>
                  ) : null}

                  <View className='w-full flex justify-center items-center mt-10 relative'>
                    <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-8 top-1' />
                    <TouchableOpacity
                      className={`w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange ${
                        isDark && 'border-grey-white'
                      }`}
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
    </HeadWrapper>
  )
}

export default EditProfile
