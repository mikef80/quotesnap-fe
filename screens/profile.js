import { Text, View, Image, StyleSheet, Button } from "react-native";
import Categories from "./categories";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import Login from "./login";

export default function Profile() {
  const navigation = useNavigation();

  const { user, setUserValue } = useUserContext();

  const handlePressLogout = () => {
    navigation.navigate("Login");
    setUserValue(null);
  };

  if (!user) {
    return (
      <View>
        <Login />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.user}>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <Text style={styles.username}>{user ? user.username : null}</Text>
      </View>
      <Button title="Logout" onPress={handlePressLogout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    margin: 15,
    alignItems: "center",
  },
  username: {
    marginTop: 15,
    fontSize: 30,
  },
  avatar: {
    borderRadius: 25,
  },
});
