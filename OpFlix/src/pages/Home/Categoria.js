import React, {Component} from 'react';
import {Text, View ,AsyncStorage, StyleSheet ,TouchableOpacity} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';

class Categoria extends Component {
  

  constructor() {
    super();
    this.state = {
      categoria: [],
    };
  }

  componentDidMount() {
    this._listarCategorias();
  }
  _irLancamento = () => {
    this.props.navigation.navigate('LancNavigator');
  }
  _voltarLogin = () => {
    this.props.navigation.navigate('MainNavigator');
  }


  _listarCategorias = async () => {
    let token = await AsyncStorage.getItem('@OpFlix:token')
    await fetch('http://192.168.6.106:5000/api/Categoria'
    ,{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }}
    )
      .then(resposta => resposta.json())
      .then(data => this.setState({categoria: data}))
      .catch(erro => console.warn(erro));
  };

  _cadastarcategoria = async() => {
    await fetch(('http://192.168.6.106:5000/api/Categoria'),{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  await AsyncStorage.getItem('@Opflix:token')

      },
      body:JSON.stringify({
        nome:this.state.nome
      })
    })
    .then(resposta => this.setState({nome: resposta}))
    .then(this._listarCategorias())

  }

  render() {
    return (
      <View>
        <Text>Casdastrar Categoria</Text>

        <TextInput onChangeText = {nome=>this.setState({nome})}
        value = {this.state.nome}
        />
        <TouchableOpacity onPress = { this._cadastarcategoria}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = { this._irLancamento}>
          <Text>Seguir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = { this._voltarLogin}>
          <Text>Voltar</Text>
        </TouchableOpacity>

      <FlatList
        data={this.state.categoria}
        keyExtractor={item => item.IdCategoria}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text> 
          </View>
        )}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarEstilizacao:
  {width: 25, height: 25, tintColor: 'white'}
})

export default Categoria;