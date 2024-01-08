import { ActivityIndicator } from "react-native-paper";
import { View, Dimensions } from "react-native";

const LoadingSpinner = () => {
  const height = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: height - 150,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator
        size={100}
        theme={{ colors: { primary: "#5DB075" } }}
      />
    </View>
  );
};

export default LoadingSpinner;
