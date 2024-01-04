import { useNavigation } from "@react-navigation/core";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Navigation() {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate("Homepage");
  };

  const handleScan = () => {
    navigation.navigate("Scan");
  };

  const handleAddQuote = () => {
    navigation.navigate("");
  };

  const handleCategories = () => {
    navigation.navigate("Categories");
  };
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Home" onPress={handleHome} />
        </View>
        <View style={styles.button}>
          <Button title="Scan" onPress={handleScan} />
        </View>
        <View style={styles.button}>
          <Button title="Add Quote" onPress={handleAddQuote} />
        </View>
        <View style={styles.button}>
          <Button title="Categories" onPress={handleCategories} />
        </View>
        <View style={styles.button}>
          <Button title="Profile" onPress={handleProfile} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    marginHorizontal: 20,
  },
});
