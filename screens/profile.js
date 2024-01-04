import { Text, View, Image, StyleSheet } from "react-native";
import Categories from "./categories";

export default function Profile() {
  return (
    <View>
      <View style={styles.user}>
      <Image style={styles.avatar} source={require('../assets/avatar.png')} />
      <Text style={styles.username}>Username</Text>
      </View>
      <Categories></Categories>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    margin: 15,
    alignItems: "center"
  },
  username: {
    marginTop: 15,
    fontSize: 30
  },
  avatar: {
    borderRadius: 25
  }
});
