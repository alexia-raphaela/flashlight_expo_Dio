import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from "react-native";
import Torch from "react-native-torch";
import { Platform } from "react-native";
import RNShake from "react-native-shake";

const App = () => {
  const [toogle, setToogle] = useState(false); // useState retorna o valor e uma função

  const handleChangeToogle = () => setToogle((oldToogle) => !oldToogle);

  useEffect(() => {
    async function setTorch() {
      if (Platform.OS === "ios") {
        Torch.switchState(toogle);
      } else {
        try {
          const cameraAllowed = Torch.requestCameraPermission(
            "Camera Permissions", // dialog title
            "We require camera permissions to use the torch on the back of your phone." // dialog body
          );

          if (cameraAllowed) {
            Torch.switchState(toogle);
          }
        } catch (e) {
          ToastAndroid.show(
            "We seem to have an issue accessing your torch",
            ToastAndroid.SHORT
          );
        }
      }
    }
    setTorch();
  }, [toogle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToogle(oldToogle => !oldToogle)
    })
    return() => subscription.remove()
  }, [])

  return (
    <View style={toogle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToogle}>
        <Image
          style={toogle ? style.lightingOn : style.lightingOff}
          source={
            toogle
              ? require("./assets/icons/eco-light.png")
              : require("./assets/icons/eco-light-off.png")
          }
        ></Image>

        <Image
          style={style.dioLogo}
          source={
            toogle
              ? require("./assets/icons/logo-dio.png")
              : require("./assets/icons/logo-dio-white.png")
          }
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250,
  },
});
