import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'; // Import axios library
// import { useRecoilValue } from 'recoil';
// import { Userdata } from '../Recoil/Atom';
import { useNavigation } from '@react-navigation/native';

function FilePicker() {
  // const userData = useRecoilValue(Userdata);
  // console.log(userData[0]?._id);
  const [pickedFile, setPickedFile] = useState(null);
  const navigation=useNavigation()
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images], // You can specify allowed file types here
      });

      console.log(`Picked File: ${result.name} (${result.size} bytes)`);
      setPickedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    }
  };

  const uploadToCloudinary = async () => {
    navigation.navigate("tabbord")
    // try {
    //   if (!pickedFile) {
    //     console.error('No file selected.');
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append('image', {
    //     uri: pickedFile.uri,
    //     type: pickedFile.type,
    //     name: pickedFile.name,
    //   });

    //   // Make a POST request to your backend endpoint
    //   const response = await axios.post(
    //     `https://medidek-backend-wz4l.onrender.com/v2/uploadMedicalRecord/${userData[0]._id}`,
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data', // Important for file uploads
    //       },
    //     }
    //   );
    //   if(response){
    //     navigation.navigate("Records")
    //   }
    //   console.log('Upload Response:', response.data);
    //   // Handle the response from your backend as needed
    // } catch (error) {
    //   console.log('Upload Error:', error);
    // }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Button title="Pick a File" onPress={pickDocument} />
      {pickedFile && (
        <Text style={{ color: 'black' }}>
          Picked File: {pickedFile.name} ({pickedFile.size} bytes)
        </Text>
      )}
      <Button title="Upload" onPress={uploadToCloudinary} />
    </View>
  );
}

export default FilePicker;
