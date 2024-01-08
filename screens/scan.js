import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Navigation from "../components/Navigation";
import * as ImagePicker from "expo-image-picker";
import MlkitOcr from "react-native-mlkit-ocr";
import { useEffect, useState } from "react";
import { postNewQuote } from "../api/api";
import { useUserContext } from "../Contexts/UserContext";
import Login from "./login";
import { TextInput } from "react-native-gesture-handler";
import { Checkbox, RadioButton, ActivityIndicator } from "react-native-paper";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [author, setAuthor] = useState("");
  const [origin, setOrigin] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [category, setCategory] = useState("");
  const { user } = useUserContext();
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);

  const openCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    permission.granted = true;

    if (!permission.granted) {
      alert("You have denied permission to the camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      // quality: 1,
      allowsEditing: true,
    });

    setIsLoading(true);
    const uri = result.assets[0].uri;

    setImage(uri);

    const resultFromUri = await MlkitOcr.detectFromUri(uri);

    if (resultFromUri?.length > 0) {
      let ocrText = resultFromUri.map((line) => line.text);

      ocrText = JSON.stringify(ocrText.join(" "));
      ocrText = ocrText.replaceAll("\\", " ");
      setText(ocrText);
    }
    setIsLoading(false);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("You have denied permission to the camera");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
    });

    setIsLoading(true);
    const uri = result.assets[0].uri;

    setImage(uri);

    const resultFromUri = await MlkitOcr.detectFromFile(uri);

    if (resultFromUri?.length > 0) {
      let _ = resultFromUri.map((line) => line.text);
      _ = JSON.stringify(_.join(" ").replaceAll("\n", " "));
      _ = _.replaceAll("\\", " ");
      setText(_);
    }
    setIsLoading(false);
  };

  const saveScan = () => {
    setIsLoading(true);
    console.log("saving quote...");
    const quoteToSave = {
      quoteText: text,
      quoteAuthor: author || "",
      quoteOrigin: origin || "",
      quoteLocation: "[51, 0]",
      quoteImage: image,
      quoteIsPrivate: !isPrivate,
      quoteCategory: category || "Misc.",
      quoteUser: user?.username || "Hello",
    };
    postNewQuote(quoteToSave).then((returnedQuote) => {
      console.log("Quote save");
      setText(null);
      setImage(null);
      setAuthor("");
      setOrigin("");
      setIsPrivate(false);
      setCategory("");
      setIsLoading(false);
    });
  };

  function handleAuthor(text) {
    setAuthor(text);
  }

  function handleOrigin(text) {
    setOrigin(text);
  }

  function handleCategory(text) {
    setCategory(text);
  }

  /* if (!user) {
    return (
      <View>
        <Login />
      </View>
    );
  } */

  if (isLoading) {
    return <LoadingSpinner  />;
  }

  return (
    <View style={styles.Main}>
      <ScrollView>
        {text && image && (
          <>
            <View>
              <Image source={{ uri: image }} style={styles.Image} />
              <View style={styles.form}>
                <Text>Quote Text</Text>
              </View>
              <TextInput
                multiline
                style={styles.Text}
                value={text}
                onChangeText={(text) => {
                  setText(text);
                }}
              />
            </View>

            <View style={styles.form}>
              <Text>Author</Text>
              <TextInput
                style={styles.InputBox}
                value={author}
                onChangeText={handleAuthor}
              />

              <Text>Origin</Text>
              <TextInput
                style={styles.InputBox}
                value={origin}
                onChangeText={handleOrigin}
              />

              <Text>Private?</Text>
              <Checkbox
                status={!isPrivate ? "checked" : "unchecked"}
                onPress={() => {
                  setIsPrivate((prevVal) => {
                    return !prevVal;
                  });
                }}
              />
              <Text>Category</Text>
              <TextInput
                style={styles.InputBox}
                value={category}
                onChangeText={handleCategory}
              />
            </View>
          </>
        )}

        {!text && !image && (
          <View
            style={{
              height: height - 150,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View>
              <Button
                color={"#5DB075"}
                title='Pick Image'
                onPress={pickImage}
              />
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Button
                color={"#5DB075"}
                title='Scan quote'
                onPress={openCamera}
              />
            </View>
          </View>
        )}
        {text && image && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <View>
              <Button
                color={"#5DB075"}
                title='Pick Image'
                onPress={pickImage}
              />
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Button
                color={"#5DB075"}
                title='Scan quote'
                onPress={openCamera}
              />
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Button color={"#5DB075"} title='Save Scan' onPress={saveScan} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 5,
  },
  Image: {
    // width: window.width,
    height: 300,
    objectFit: "contain",
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  Main: {
    flexDirection: "column",
    alignItems: "center",
  },
  InputBox: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
  },
  form: {
    margin: 5,
  },
});
