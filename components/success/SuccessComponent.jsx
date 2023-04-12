import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/solid";
import getDimension from "../../config/getDimension";
import ImageModal from "./ImageModal";

const SuccessComponent = ({ route, navigation }) => {
  const { res } = route.params;
  const { width, height } = getDimension();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-[#f3f5f9]">
      <View className="bg-white mx-5 mt-16 rounded-lg">
        <View className="bg-[#0035a9] self-center p-5 rounded-full relative -top-10">
          <CheckIcon size={40} fill="white" />
        </View>
        <View className="self-center relative -top-6">
          <Text className="font-bold text-2xl">Scanned Successfully</Text>
          <Text className="text-gray-600 self-center">{res._id}</Text>
        </View>
        {/* items */}
        <ScrollView style={{ height: height - 280 }}>
          <View className="px-5 py-5">
            {res?.image?.imageUrl ? (
              <ImageModal
                source={res?.image.imageUrl}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            ) : (
              <Text className="self-center my-5 text-gray-300">
                Image Unavailable
              </Text>
            )}

            {/* equipment */}
            <Text className="px-2 text-lg my-2 font-light">
              Equipment Information
            </Text>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Property Number</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.propertyNo}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Equipment</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.equipment}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Qty</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.qty}
                </Text>
              </View>
            </View>
            {res?.condition && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Condition</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {res.condition}
                  </Text>
                </View>
              </View>
            )}
            {res?.location && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Location</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {res.location}
                  </Text>
                </View>
              </View>
            )}
            {res?.specificLocation && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Specific Location</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {res.specificLocation}
                  </Text>
                </View>
              </View>
            )}
            {/* borrower */}
            {res?.fullName && (
              <>
                <Text className="px-2 text-lg my-2 font-light">
                  Borrower Information
                </Text>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Borrower Name</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {res.fullName}
                    </Text>
                  </View>
                </View>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Role</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {res.role}
                    </Text>
                  </View>
                </View>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Purpose</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {res.purpose}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
        <View
          className=" bg-[#0035a9] items-center py-3 rounded-xl self-center my-5"
          style={{
            width: width - 40,
          }}
        >
          <Text className="font-semibold text-white text-lg">Done</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SuccessComponent;
