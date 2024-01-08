import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getQoutesByUsername, getUserByUsername } from "../api/api";
import { useUserContext } from "../Contexts/UserContext";

export default function Login() {
  const navigation = useNavigation();

  const { user, setUserValue } = useUserContext();

  const [username, setUsername] = useState("");

  const handlePressSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleTextChange = (newUser) => {
    setUsername(newUser);
  };

  const handlePressLogin = async () => {
    if (!username.length) {
      Alert.alert("Error", "Please enter a username");
    } else {
      try {
        const quotes = (await getQoutesByUsername(username)) || [];
        await setUserValue(await getUserByUsername(username));
        navigation.navigate("Homepage", { quotes });
      } catch (error) {
        Alert.alert("Error", "User not found.");
      } finally {
        setUsername("");
      }
    }
  };

  // const handlePressCategory = () => {
  //   navigation.navigate("Categories");
  // };

  // const handlePressProfile = () => {
  //   navigation.navigate("Profile");
  // };

  // const handlePressScanScreen = () => {
  //   navigation.navigate("Scan");
  // };

  // const handlePressNavigation = () => {
  //   navigation.navigate("Navigation");
  // };

  return (
    <View>
      <View style={styles.login_container}>
        <Text style={styles.header}>QuoteSnap</Text>
        <Text style={styles.dailyQuote}>Quote of the Day</Text>
        <View style={styles.login_input}>
          <TextInput
            style={styles.textUsername}
            placeholder="Username"
            onChangeText={handleTextChange}
            value={username}
          />
          <TextInput
            style={styles.textUsername}
            secureTextEntry={true}
            placeholder="Password"
          />
          <View style={styles.login_button}>
            <Button
              color="#5DB075"
              height="100"
              title="Log in"
              onPress={handlePressLogin}
            />
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
