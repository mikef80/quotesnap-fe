import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getQoutesByUsername } from "../api/api";
import { useUserContext } from "../Contexts/UserContext";
import Homepage from "./Homepage";

export default function Login() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [quotes, setQuotes] = useState(null);
  const { user, setUserValue } = useUserContext();

  useEffect(() => {
    if (user) {
      navigation.navigate("Homepage", { quotes });
    }
  }, []);

  const handlePressSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleTextChange = (newUser) => {
    setInput(newUser);
  };

  const handlePressLogin = async () => {
    if (!input.length) {
      Alert.alert("Error", "Please enter a username");
    } else {
      setUserValue(input);
      try {
        console.log(user);
        const retrievedQuotes = (await getQoutesByUsername(input)) || [];
        // console.log(retrievedQuotes);
        setQuotes(async (currQuotes) => {
          // console.log(currQuotes);
          return await retrievedQuotes;
        });
        console.log(quotes);
        navigation.navigate("Homepage", { quotes });
      } catch (error) {
        Alert.alert("Error", "User not found.");
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

  if (user) {
    return (
      <View>
        <Homepage />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.login_container}>
        <Text style={styles.header}>QuoteSnap</Text>
        <Text style={styles.dailyQuote}>Quote of the Day</Text>
        <View style={styles.login_input}>
          <View style={styles.login_button}>
            <TextInput style={styles.textUsername} placeholder="username" onChangeText={handleTextChange} />

            <Button title="Login" onPress={handlePressLogin} />
          </View>
        </View>
        <View style={styles.signup}>
          <Text> Not registered?</Text>
          <TouchableOpacity onPress={handlePressSignUp}>
            <Text>Sign up here</Text>
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
    fontSize: 25,
  },

  dailyQuote: {
    margin: 20,
    textAlign: "center",
    fontSize: 15,
  },
  login_input: {
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
    margin: 50,
    padding: 20,
  },
  textUsername: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: 150,
  },
  login_button: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  signup: {
    marginTop: 20,
    width: 200,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
