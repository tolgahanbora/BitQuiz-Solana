import React from 'react'
import { View,Text,ScrollView } from 'react-native'

import {QuizCard} from '../components'


function Quiz({navigation}) {
  return (
    <>
    <ScrollView>
    <QuizCard navigation={navigation} />
    </ScrollView>
      
    </>
  )
}

export default Quiz