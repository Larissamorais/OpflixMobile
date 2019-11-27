import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './pages/Login/login';
import CategoriaScreen from './pages/Home/Categoria';
import LancamentoScreen from './pages/Home/Lancamento';


// const AuthStack = createStackNavigator({
//   Login: {screen:LoginScreen},
// });


const MainNavigator = createBottomTabNavigator(
  {
    Login: {screen: LoginScreen,},
  },
  
);
const CategNavigator = createStackNavigator(
  {
    Categoria: {screen: CategoriaScreen},
  },
  
);
const LancNavigator = createBottomTabNavigator(
  {
    Lancamento: {screen: LancamentoScreen},
  },
  
);


export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      CategNavigator,
      LancNavigator,
    },
    {
      initialRouteName: 'MainNavigator',
    },
  ),
);