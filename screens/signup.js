import { Button, TextInput, View, Text, StyleSheet } from "react-native";

export default function Signup() {
  return (
    <View>
      <View>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.signup_input}>
          <View style={styles.contents}>
            <TextInput style={styles.textbox} placeholder="Name" />
            <TextInput style={styles.textbox} placeholder="Email" />
            <TextInput style={styles.textbox} placeholder="Avatar" />
            <Button title="Sign Up" />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    margin: 20,
    textAlign: "center",
    fontSize: 25,
  },

  signup_input: {
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
    margin: 50,
    padding: 20,
  },
  textbox: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: "auto",
    margin: 5,
    padding: 3,
    fontSize: 12,
  },
});
