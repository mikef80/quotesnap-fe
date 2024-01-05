import { Button, StyleSheet, Text, View, Image } from "react-native";
import Navigation from "../components/Navigation";
import * as ImagePicker from "expo-image-picker";
import MlkitOcr from "react-native-mlkit-ocr";
import { useEffect, useState } from "react";
import { postNewQuote } from "../api/api";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  /* const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permission);

    if (!permission.granted) {
      alert("You have denied permission to the camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);

    const uri = result.assets[0].uri;

    setImage(uri);

    const resultText = await MlkitOcr.detectFromUri(uri);

    setText(resultText[0]);
    console.log(text);
  }; */

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

    const uri = result.assets[0].uri;

    setImage(uri);

    const resultFromUri = await MlkitOcr.detectFromFile(uri);

    if (resultFromUri?.length > 0) {
      let _ = resultFromUri.map((line) => line.text);
      _ = JSON.stringify(_.join(" ").replaceAll("\n", " "));
      _ = _.replaceAll("\\", " ");
      setText(_);
    }
  };

  const saveScan = () => {
    console.log("saving quote...");
    const quoteToSave = {
      quoteText: text,
      quoteAuthor: "LinkedIn",
      quoteOrigin: "fiction book",
      quoteLocation: "[10, 10]",
      quoteImage: image,
      quoteIsPrivate: false,
      quoteCategory: "Billboard",
      quoteUser: "Hello",
    };
    postNewQuote(quoteToSave).then((returnedQuote) =>
      console.log(returnedQuote)
    );
  };

  return (
    <View style={styles.Main}>
      <View>
        {/* <Button title='Scan quote' onPress={openCamera} /> */}
        {text && image && (
          <View>
            <Image source={{ uri: image }} style={styles.Image} />
            <Text style={styles.Text}>{text}</Text>
          </View>
        )}
        <View style={{ alignSelf: "center" }}>
          <View style={{ width: "50%" }}>
            <Button
              style={styles.Button}
              title='Pick Image'
              onPress={pickImage}
            />
          </View>
          <View>
            <Button
              style={styles.Button}
              title='Save Scan'
              onPress={saveScan}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    margin: 20,
  },
  Image: {
    width: window.width,
    height: 300,
    objectFit: "contain",
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  Button: {
    backgroundColor: "red",
  },
  Main: {
    flexDirection: "column",
    alignItems: "center",
  },
});
