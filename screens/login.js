import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getQoutesByUsername, getUserByUsername } from "../api/api";
import { useUserContext } from "../Contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Logo from "../assets/QuoteSnap-logos_transparent.png";

export default function Login() {
  const navigation = useNavigation();

  const { user, setUserValue } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePressSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleUsernameTextChange = (inputUsername) => {
    setUsername(inputUsername);
  };

  const handlePasswordTextChange = (inputPassword) => {
    setPassword(inputPassword);
  };

  const handlePressLogin = async () => {
    setIsLoading(true);
    if (!username.length) {
      Alert.alert("Error", "Please enter a username");
    } else if (!password.length) {
      Alert.alert("Error", "Please enter a password");
    } else {
      try {
        const quotes = (await getQoutesByUsername(username)) || [];
        await setUserValue(await getUserByUsername(username, password));

        navigation.navigate("Homepage");
      } catch ({ response }) {
        Alert.alert("Error", response.data.msg);
      } finally {
        setUsername("");
        setPassword("");
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <View style={styles.login_container}>
        <Image source={Logo} style={{height:200, width:200, alignSelf:'center'}} />
        <Text style={styles.dailyQuote}>
          "Beware of bugs..." - "The CodeFathers"
        </Text>
        <View style={styles.login_input}>
          <TextInput
            style={styles.textUsername}
            placeholder='Username'
            onChangeText={handleUsernameTextChange}
            value={username}
          />
          <TextInput
            style={styles.textUsername}
            secureTextEntry={true}
            onChangeText={handlePasswordTextChange}
            placeholder='Password'
            value={password}
          />
          <View style={styles.login_button}>
            <TouchableOpacity
              color='#5DB075'
              height='100'
              title='Log in'
              onPress={handlePressLogin}>
              <Text style={styles.btn_text}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signup}>
          <Text style={styles.signup_text}> Not registered?</Text>
          <TouchableOpacity onPress={handlePressSignUp}>
            <Text style={styles.signup_text}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  login_container: {},
  header: {
    margin: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },

  dailyQuote: {
    margin: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
  },
  login_input: {
    borderRadius: 10,
    margin: 50,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  textUsername: {
    backgroundColor: "#E8E8E8",
    borderColor: "#E8E8E8",
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    width: 150,
    width: 300,
    padding: 5,
  },
  login_button: {
    width: 300,
    marginTop: 100,
    backgroundColor: "#5DB075",
    padding: 20,
    borderRadius: 30,
  },
  btn_text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  signup: {
    width: 200,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  signup_text: {
    color: "#5DB075",
    fontSize: 14,
  },
});
