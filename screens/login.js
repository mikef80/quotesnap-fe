import { useNavigation } from "@react-navigation/native";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login() {
  const navigation = useNavigation();

  const handlePressSignUp = () => {
    navigation.navigate("Signup");
  };
  const handlePressLogin = () => {
    navigation.navigate("Homepage");
  };

  return (
    <View>
      <View style={styles.login_container}>
        <Text style={styles.header}>QuoteSnap</Text>
        <Text style={styles.dailyQuote}>Quote of the Day</Text>
        <View style={styles.login_input}>
          <View style={styles.login_button}>
            <TextInput style={styles.textUsername} placeholder="username" />
            <TouchableOpacity onPress={handlePressLogin}>
              <Button title="Login" />
            </TouchableOpacity>
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
