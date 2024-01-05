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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { UserProvider } from "./Contexts/UserContext";
import { useUserContext } from "./Contexts/UserContext";

// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  console.log(loggedIn);
  const loggedIn = false;
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={loggedIn ? null : Login} options={{ tabBarButton: () => null }} />
            <Tab.Screen
              name="Signup"
              component={Signup}
              options={{
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Homepage"
              component={Homepage}
              options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
              }}
            />
            <Tab.Screen
              name="QuoteItem"
              component={QuoteItem}
              options={{
                // tabBarIcon: ({ color, size }) => (
                //   <MaterialCommunityIcons name="book-open-outline" color={color} size={size} />
                // ),
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Categories"
              component={Categories}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="book-open-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
              }}
            />
            <Tab.Screen
              name="Scan"
              component={Scan}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="credit-card-scan-outline" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}
