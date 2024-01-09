import { Text, View, Image, StyleSheet, Button } from "react-native";
import Categories from "./categories";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import Login from "./login";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.profile}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Profile</Text>
        </View>
        <View style={styles.user}>
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
        </View>
      </View>
      <View style={styles.username}>
        <View style={styles.username_container}>
          <Text style={styles.username_text}>
            {user ? user.username : null}
          </Text>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity title="Logout" onPress={handlePressLogout}>
            <Text style={styles.logout_btn}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "column",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#5DB075",
    padding: 30,
  },

  header: {
    margin: 30,
  },
  header_text: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  user: {
    alignItems: "center",
  },
  username: {
    flex: 2,
    margin: 80,
    fontSize: 30,
    flexDirection: "column",
  },
  username_container: {
    flex: 1,
  },
  username_text: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  avatar: {
    borderRadius: 120,
    width: 120,
    height: 120,
    borderWidth: 5,
    borderColor: "white",
  },
  logout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  logout_btn: {
    width: 200,
    backgroundColor: "#5DB075",
    padding: 10,
    borderRadius: 30,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
