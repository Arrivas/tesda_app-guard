import { Text } from "react-native";
import React from "react";
import Dialog from "react-native-dialog";

const DialogComponent = ({
  dialogVisible,
  handleInputChange,
  inputValue,
  handleSave,
}) => {
  return (
    <Dialog.Container className="text-black" visible={dialogVisible}>
      <Dialog.Title className="text-black">
        Enter the IP Address and Port
        <Text className="text-black">example: 192.168.1.1:5000</Text>
      </Dialog.Title>

      <Dialog.Input
        className="text-black"
        placeholder="Type here..."
        onChangeText={handleInputChange}
        value={inputValue}
      />
      <Dialog.Button className="text-black" label="Save" onPress={handleSave} />
    </Dialog.Container>
  );
};

export default DialogComponent;
