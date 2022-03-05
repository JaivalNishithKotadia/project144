import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import PopularArticles from './screens/Popular';
import RecommendedArticles from './screens/Recommendation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';

let customFonts = {
  "Rubik-Black": require("./assets/fonts/Rubik-Black.ttf"),
  "Rubik-BlackItalic": require("./assets/fonts/Rubik-BlackItalic.ttf"),
  "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  "Rubik-BoldItalic": require("./assets/fonts/Rubik-BoldItalic.ttf"),
  "Rubik-Italic": require("./assets/fonts/Rubik-Italic.ttf"),
  "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
  "Rubik-LightItalic": require("./assets/fonts/Rubik-LightItalic.ttf"),
  "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
  "Rubik-MediumItalic": require("./assets/fonts/Rubik-MediumItalic.ttf"),
  "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
  "Rubik-SemiBoldItalic": require("./assets/fonts/Rubik-SemiBoldItalic.ttf"),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if(!fontsLoaded){
    return null;
  }
  return <AppContainer />;
}

const AppTopNavigation = createMaterialTopTabNavigator(
  {
    PopularArticles:{
      screen: PopularArticles,
      navigationOptions:{
        tabBarLabel: 'Popular Articles',
      }
    },
    RecommendedArticles:{
      screen: RecommendedArticles,
      navigationOptions:{
        tabBarLabel: 'Recommended Articles',
      }
    }
  },
  {
    tabBarOptions:{
      labelStyle:{
        color: '#fff',
        fontFamily: 'Rubik-Regular',
        fontSize: RFValue(12),
      },
      indicatorStyle:{
        backgroundColor: '#9965f4',
        height: 5,
      },
      style:{
        backgroundColor: '#262636',
      }
    }
  }
);

const AppStackNavigator = createStackNavigator(
  {
    Home:{
      screen: HomeScreen,
      navigationOptions:{
        headerShown: false,
      }
    },
    AppTopNav:{
      screen: AppTopNavigation,
      navigationOptions:{
        headerBackTitle: null,
        headerTintColor: '#fff',
        headerTitle:"Popular and Recommended Articles",
        headerStyle:{
          backgroundColor: '#262636',
        },
        headerTitleStyle:{
          color: '#fff',
          fontFamily: 'Rubik-SemiBold',
          fontSize: RFValue(18),
        }
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

