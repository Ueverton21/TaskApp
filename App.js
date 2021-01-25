import React,{useState, useEffect, useRef} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import firebase from './src/firebaseConnection';
import Tarefa from './src/components/Tarefa';

console.disableYellowBox = true

const App = () => {
  
  const [tarefas, setTarefas] = useState([]);
  const [tarefaInput, setTarefaInput] = useState('');
  const [edit, setEdit] = useState(false);
  const [keyEditable, setKeyEditable] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    getTasks();
  },[]);

  async function getTasks(){
    await firebase.database().ref('tarefas').on('value', (snapshot) => {
      setTarefas([]);
      snapshot.forEach((value) => {

        let atualTarefa = {
          key: value.key,
          desc: value.val()
        }

        setTarefas(oldArray => [...oldArray,atualTarefa]);
      })
    })
  }
  async function handleAdd(){

    if(tarefaInput!==''){
      if(edit){
        await firebase.database().ref(`tarefas/${keyEditable}`).set(tarefaInput).catch(error => alert(error));
        setEdit(false);
        setTarefaInput('');
        setKeyEditable('');
      }
      else{
        try{
          await firebase.database().ref('tarefas').push(tarefaInput);
          setTarefaInput('');
        }
        catch(error){
          alert('Erro ao inserir!');
        }
      }
    }
    else{
      alert('Campo tarefa está vazio');
    }
  }

  async function update(key){
    inputRef.current.focus();
    setKeyEditable(key);
    setEdit(true);
    await firebase.database().ref(`tarefas/${key}`).once('value', (snapshot) => {
      setTarefaInput(snapshot.val());
    });
  }

  function cancelUpdate(){
    setEdit(false); 
    setKeyEditable(''); 
    setTarefaInput('');
  }

  return(
    <View style={styles.container}>

      {edit ? 
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}} onPress={cancelUpdate}>
          <Icon name="x-circle" size={24} color='#E55' />  
          <Text 
            style={{
              color: '#E55', 
              fontSize: 16, 
            }}
          >Você está editando uma tarefa!
          </Text>
        </TouchableOpacity>
        :
        null
      }

      <View style={styles.topo}>
        <TextInput 
          style={styles.input}
          placeholder='Digite a tarefa aqui...'
          underlineColorAndroid="transparent"
          onChangeText={(txt) => setTarefaInput(txt)}
          value={tarefaInput}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Icon size={30} color="#fff" name="plus"/>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={tarefas}
          renderItem={({item}) => <Tarefa data={item} update={() => update(item.key)}/>}
          keyExtractor={tarefa => tarefa.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DD5',
    padding: 20,
    flex: 1
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topo: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    fontSize: 20,
    padding: 10,
    flex: 1
  },
  btnAdd: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 50,
    borderRadius: 3
  }
});

export default App;