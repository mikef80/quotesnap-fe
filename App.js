import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Login from "./screens/login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./screens/signup";
import Homepage from "./screens/Homepage";
import QuoteItem from "./screens/quoteItem";
import Categories from "./screens/categories";
import Profile from "./screens/profile";
import Scan from "./screens/scan";
import Navigation from "./components/Navigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="QuoteItem" component={QuoteItem} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Navigation" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
