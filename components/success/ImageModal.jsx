import React from "react";
import { Modal, Image, TouchableOpacity, View, Text } from "react-native";

const ImageModal = ({ source, modalVisible, setModalVisible }) => {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image
        source={{ uri: source }}
        className="w-full h-[150px]"
        alt="preview"
      />
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="absolute top-6 right-6 z-10"
          >
            <Text className="text-white text-2xl">X</Text>
          </TouchableOpacity>
          <Image
            alt="preview"
            source={{ uri: source }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageModal;
