import { useEffect, useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Alert } from "react-native";
import { postNewUser } from "../api/api";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [userObject, setuserObject] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const { user, setUserValue } = useUserContext();

  const navigation = useNavigation();

  const handleFirstnameChange = (e) => {
    setFirstname(e);
  };
  const handleLastnameChange = (e) => {
    setLastname(e);
  };
  const handleUsernameChange = (e) => {
    setUsername(e);
  };
  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e);
  };

  const handleSubmit = () => {
    if (password !== passwordConfirmation) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      setIsloading(true);
      postNewUser(userObject)
        .then((res) => {
          setUserValue(res);
        })
        .then(() => {
          setIsloading(false);
          setFirstname("");
          setLastname("");
          setUsername("");
          setPassword("");
          navigation.navigate("Homepage");
        })
        .catch(({ response }) => {
          /* console.log(response);
          console.log(response.data.msg);
          console.log(response.status); */
          setIsloading(false);
          setPassword("");
          if (response.data.msg === "User already exists!") {
            Alert.alert("Error", response.data.msg);
            setUsername("");
          } else {
            Alert.alert("Error", "An error occured. Please try again later.");
          }
        });
    }
  };

  useEffect(() => {
    setuserObject({
      firstname,
      lastname,
      username,
      password,
      avatar: "../assets/avatar.png",
    });
  }, [firstname, lastname, username, password]);

  useEffect(() => {
    setPasswordLength(password.length);
  }, [password]);

  return (
    <View>
      <View>
        <Text style={styles.header}>Sign Up</Text>

        {isLoading && (
          <View>
            <LoadingSpinner />
          </View>
        )}
        {!isLoading && (
          <View style={styles.signup_input}>
            <View style={styles.contents}>
              <TextInput
                onChangeText={handleFirstnameChange}
                value={firstname}
                style={styles.textbox}
                placeholder='firstname'
              />
              <TextInput
                onChangeText={handleLastnameChange}
                value={lastname}
                style={styles.textbox}
                placeholder='lastname'
              />
              <TextInput
                onChangeText={handleUsernameChange}
                value={username}
                style={styles.textbox}
                placeholder='Username'
              />
              <TextInput
                onChangeText={handlePasswordChange}
                value={password}
                style={styles.textbox}
                secureTextEntry={true}
                placeholder='Password'
              />
              {passwordLength < 8 && (
                <Text style={styles.PasswordHint}>
                  Password characters remaining: {8 - passwordLength}
                </Text>
              )}
              <TextInput
                onChangeText={handlePasswordConfirmationChange}
                value={passwordConfirmation}
                style={styles.textbox}
                secureTextEntry={true}
                placeholder='Confirm password'
              />
              {password !== passwordConfirmation && (
                <Text style={styles.PasswordHint}>Passwords do not match</Text>
              )}
              <Button
                onPress={handleSubmit}
                title='Sign Up'
                disabled={
                  passwordLength < 8 ||
                  lastname.length <= 0 ||
                  firstname.length <= 0 ||
                  username.length <= 0
                }
              />
            </View>
          </View>
        )}
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
  PasswordHint: {
    fontSize: 12,
    margin: 5,
  },
});
