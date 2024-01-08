import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import Navigation from "../components/Navigation";
import * as ImagePicker from "expo-image-picker";
import MlkitOcr from "react-native-mlkit-ocr";
import { useEffect, useState } from "react";
import { postNewQuote } from "../api/api";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const openCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    permission.granted = true;

    if (!permission.granted) {
      alert("You have denied permission to the camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    const uri = result.assets[0].uri;

    setImage(uri);

    const resultFromUri = await MlkitOcr.detectFromUri(uri);

    if (resultFromUri?.length > 0) {
      let ocrText = resultFromUri.map((line) => line.text);

      ocrText = JSON.stringify(ocrText.join(" "));
      ocrText = ocrText.replaceAll("\\", " ");
      setText(ocrText);
    }
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
      quoteAuthor: "LinkedIn", // freetext
      quoteOrigin: "fiction book", // freetext
      quoteLocation: "[10, 10]",
      quoteImage: image,
      quoteIsPrivate: false, // boolean
      quoteCategory: "Billboard", // freetext
      quoteUser: "Hello",
    };
    postNewQuote(quoteToSave).then((returnedQuote) => {
      console.log("Quote save");
      setText(null);
      setImage(null);
    });
  };

  return (
    <View style={styles.Main}>
      <ScrollView>
        {text && image && (
          <View>
            <Image source={{ uri: image }} style={styles.Image} />
            <Text style={styles.Text}>{text}</Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <View>
            <Button
              style={styles.Button}
              title='Pick Image'
              onPress={pickImage}
            />
          </View>
          <View>
            <Button
              style={styles.Button}
              title='Scan quote'
              onPress={openCamera}
            />
          </View>
          {text && image && (
            <View>
              <Button
                style={styles.Button}
                title='Save Scan'
                onPress={saveScan}
              />
            </View>
          )}
        </View>
      </ScrollView>
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
  Main: {
    flexDirection: "column",
    alignItems: "center",
  },
});
