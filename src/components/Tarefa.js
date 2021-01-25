import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import firebase from '../firebaseConnection';

const Tarefa = ({data, update}) => {
  
  async function remove(){
    await firebase.database().ref(`tarefas/${data.key}`).remove();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={remove}>
        <Icon name="trash" size={30} color='#000' />
      </TouchableOpacity>
      <TouchableOpacity onPress={update} >
        <Text 
          numberOfLines={1} 
          ellipsizeMode='tail' 
          style={styles.text}
        >{data.desc}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#AAA',
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
    
  }
})
export default Tarefa;