import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import { Camera } from "expo-camera";
import getDimensions from "../../../config/getDimension";
import { create } from "apisauce";
import { useIsFocused } from "@react-navigation/native";

const QRCodeScanner = ({ route, navigation }) => {
  const { currentIP, mode } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(true);
  const isFocused = useIsFocused();

  const api = create({
    baseURL: `${currentIP}`,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const fetchImage = async (itemId) => {
    if (!itemId) return null;
    const result = await api.get(`/images/url/${itemId}`);
    if (!result.ok) return null;
    return result?.data;
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanning(false);
    if (mode === "scan") {
      try {
        const response1 = await api.get(`/borrow/get/one/${data}`);
        if (response1.ok && response1.data) {
          const fetchedData = response1.data;
          const imageId = fetchedData?.image?._id;
          const image = await fetchImage(imageId);
          fetchedData.image = { ...fetchedData.image, imageUrl: image };
          navigation.navigate("Success", { fetchedData });
        } else {
          const response2 = await api.get(`/inventory/get/one/${data}`);
          if (response2.ok && response2.data) {
            const fetchedData = response2.data;
            const imageId = fetchedData?.image?._id;
            const image = await fetchImage(imageId);
            fetchedData.image = { ...fetchedData.image, imageUrl: image };
            navigation.navigate("Success", { fetchedData });
          } else {
            console.log("Error: No response data");
          }
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    } else {
      try {
        const returned = await api.put(`/borrow/returned/${data}`);
        if (returned.ok && returned.data) {
          const fetchedData = returned.data;
          const imageId = fetchedData?.image?._id;
          const image = await fetchImage(imageId);
          fetchedData.image = { ...fetchedData.image, imageUrl: image };
          navigation.navigate("Success", { fetchedData });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <View className="bg-black flex-1">
          <View
            style={{
              flex: 2,
            }}
          >
            <Camera
              className="flex-1"
              type={Camera.Constants.Type.back}
              onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
            />
          </View>
          {!scanning && (
            <View
              className="self-center items-center justify-center w-full"
              style={{
                flex: 0.5,
              }}
            >
              <TouchableNativeFeedback onPress={() => setScanning(true)}>
                <View className="w-[80%] bg-[#0035a9] items-center py-3 rounded-xl">
                  <Text className="font-semibold text-white">
                    Tap to Scan Again
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default QRCodeScanner;
