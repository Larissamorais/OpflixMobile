import React, {Component} from 'react';

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  
} from 'react-native';

class Login extends Component {
 

  constructor() {
    super();
    this.state = {
      email: 'Natan@.com',
      senha: '222',
    };
  }

  _realizarLogin = async () => {
   
    await fetch('http://192.168.6.106:5000/api/Usuario/Login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
     
      .then(data => this._irParaHome(data.token))
      .catch(erro => console.warn(erro));
  };

  _irParaHome = async tokenAReceber => {
    if (tokenAReceber != null) {
      try {
        await AsyncStorage.setItem('@OpFlix:token', tokenAReceber);
        
        this.props.navigation.navigate('CategNavigator');
      } catch (error) {}
    }
  };

  render() {
    return (
      <View style={styles.tela}>
        
        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          placeholder="senha"
          onChangeText={senha => this.setState({senha})}
          value={this.state.senha}
        />
        <TouchableOpacity onPress={this._realizarLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  
  tela:{
    backgroundColor:'#CC1319',
    height:'100%' 
  },
})