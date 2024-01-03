import { StyleSheet, Text, View } from "react-native";
import Navigation from "../components/Navigation";

export default function Scan() {
  return (
    <View>
      <Text>Scan Page</Text>
      <View style={styles.NavigationContainer}>
        <Text>Scan Page</Text>
        <Navigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  NavigationContainer: {
    backgroundColor: "yellow",
  },
});
