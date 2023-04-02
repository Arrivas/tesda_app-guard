import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRScanner = ({ route, navigation }) => {
  const { currentIP } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fetchedBorrow, setFetchedBorrow] = useState({});

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (!data) return;
    await fetch(`${currentIP}borrow/get/one/${data}`)
      .then((res) => res.json())
      .then((res) => {
        navigation.navigate("Success", { res });
      })
      .catch((err) =>
        ToastAndroid.show("FATAL ERROR: unable to get data", ToastAndroid.SHORT)
      );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 flex-col">
      <View
        style={{
          flex: 4,
        }}
      >
        <BarCodeScanner
          className="flex-1"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <View className=" items-center justify-center w-full flex-1 ">
          <TouchableNativeFeedback onPress={() => setScanned(false)}>
            <View className="w-[80%] bg-[#0035a9] items-center py-3 rounded-xl">
              <Text className="font-semibold text-white">
                Tap to Scan Again
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </View>
  );
};

export default QRScanner;
