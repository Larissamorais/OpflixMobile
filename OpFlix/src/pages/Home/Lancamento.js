import React, { Component } from 'react';
import { Text, View, AsyncStorage, StyleSheet,TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Lancamento extends Component {


  constructor() {
    super();
    this.state = {
      lancamento: [],
    };
  }

  componentDidMount() {
    this._listarLancamento();
  }
  _voltarCategoria = () => {
    this.props.navigation.navigate('CategNavigator');
  }


  _listarLancamento = async () => {
    let token = await AsyncStorage.getItem('@OpFlix:token')
    console.warn(token)
    await fetch('http://192.168.6.106:5000/api/Lancamento'
      , {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamento: data }))
      .catch(erro => console.warn(erro));
  };


  render() {

    console.warn(this.state.lancamento)

    return (
      <View>

        <TouchableOpacity onPress = { this._voltarCategoria}>
          <Text>Voltar</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.lancamento.sort((a,b)=>a.dataDeLancamento<b.dataDeLancamento
            )}
          keyExtractor={item => item.IdLancamento}
          renderItem={({ item }) => (
            <View>
              <Text>{item.titulo}</Text>
              <Text>{item.sinopse}</Text> 
            <Text>{item.tipo}</Text> 
            <Text>{item.tempo}</Text> 
          <Text>{item.dataDeLancamento}</Text> 

            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarEstilizacao:
    { width: 25, height: 25, tintColor: 'white' }
})

export default Lancamento;