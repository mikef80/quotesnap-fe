import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
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
  const [selectedAvatar, setSelectedAvatar] = useState(
    "../assets/avatar1.jpeg"
  );
  const [isDisabled, setIsDisabled] = useState(true);

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
          setPasswordConfirmation("");
          setSelectedAvatar("../assets/avatar1.jpeg");
          navigation.navigate("Homepage");
        })
        .catch(({ response }) => {
          setIsloading(false);
          setPassword("");
          setPasswordConfirmation("");
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
      avatar: selectedAvatar,
    });
  }, [firstname, lastname, username, password, selectedAvatar]);

  useEffect(() => {
    setPasswordLength(password.length);
  }, [password]);

  useEffect(() => {
    if (
      passwordLength < 8 ||
      lastname.length <= 0 ||
      firstname.length <= 0 ||
      username.length <= 0
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [passwordLength, lastname, firstname, username]);

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
              <Text style={styles.Label}>Select your avatar:</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableHighlight
                  onPress={() => setSelectedAvatar("../assets/avatar1.jpeg")}>
                  <Image
                    style={[
                      styles.avatar,
                      selectedAvatar === "../assets/avatar1.jpeg" &&
                        styles.selected,
                    ]}
                    source={require("../assets/avatar1.jpeg")}
                    blurRadius={
                      selectedAvatar !== "../assets/avatar1.jpeg" ? 5 : 0
                    }
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => setSelectedAvatar("../assets/avatar2.jpeg")}>
                  <Image
                    style={[
                      styles.avatar,
                      selectedAvatar === "../assets/avatar2.jpeg" &&
                        styles.selected,
                    ]}
                    source={require("../assets/avatar2.jpeg")}
                    blurRadius={
                      selectedAvatar !== "../assets/avatar2.jpeg" ? 5 : 0
                    }
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => setSelectedAvatar("../assets/avatar3.png")}>
                  <Image
                    style={[
                      styles.avatar,
                      selectedAvatar === "../assets/avatar3.png" &&
                        styles.selected,
                    ]}
                    source={require("../assets/avatar3.png")}
                    blurRadius={
                      selectedAvatar !== "../assets/avatar3.png" ? 5 : 0
                    }
                  />
                </TouchableHighlight>
              </View>
              <Text style={styles.Label}>Enter Firstname:</Text>
              <TextInput
                onChangeText={handleFirstnameChange}
                value={firstname}
                style={styles.textbox}
                placeholder='Firstname'
                label={"name"}
              />
              <Text style={styles.Label}>Enter Surname:</Text>
              <TextInput
                onChangeText={handleLastnameChange}
                value={lastname}
                style={styles.textbox}
                placeholder='Surname'
              />
              <Text style={styles.Label}>Enter Username:</Text>
              <TextInput
                onChangeText={handleUsernameChange}
                value={username}
                style={styles.textbox}
                placeholder='Username'
              />
              <Text style={styles.Label}>Enter Password:</Text>
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
              <Text style={styles.Label}>Confirm Password:</Text>
              <TextInput
                onChangeText={handlePasswordConfirmationChange}
                value={passwordConfirmation}
                style={styles.textbox}
                secureTextEntry={true}
                placeholder='Password'
              />
              <View style={styles.signupView}>
                <TouchableOpacity
                  style={
                    isDisabled
                      ? styles.signupBtnDisabled
                      : styles.signupBtnEnabled
                  }
                  onPress={handleSubmit}
                  title='Sign Up'
                  disabled={isDisabled}>
                  <Text
                    style={
                      isDisabled
                        ? styles.signupTextDisabled
                        : styles.signupTextEnabled
                    }>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
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
    marginHorizontal: 50,
    padding: 20,
  },

  PasswordHint: {
    fontSize: 12,
    margin: 5,
  },
  avatar: {
    borderRadius: 120,
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "white",
  },
  selected: {
    width: 100,
    height: 100,
  },
  Label: {
    marginLeft: 5,
    fontSize: 13,
    marginBottom: 4,
    marginTop: 9,
  },
  textbox: {
    backgroundColor: "#E8E8E8",
    borderColor: "#E8E8E8",
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 16,
    width: 275,
    padding: 5,
  },
  signupBtnEnabled: {
    width: 200,
    backgroundColor: "#5DB075",
    padding: 20,
    borderRadius: 30,
  },
  signupBtnDisabled: {
    width: 200,
    backgroundColor: "#cdcdcd",
    padding: 20,
    borderRadius: 30,
  },
  signupTextEnabled: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  signupTextDisabled: {
    color: "#efefef",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  contents: {
    flexDirection: "column",
  },
  signupView: {
    alignItems: "center",
    marginTop: 15,
  },
});
