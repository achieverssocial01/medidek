import { Text, TouchableOpacity, View, TextInput, } from "react-native"

const LoginWithNumber = (props) => {
  
  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
      <View style={{ backgroundColor: "#1F51C6", alignItems: "center", width: "100%", padding:14, borderRadius: 9,gap:30 }}>
        <View style={{width:"100%",alignItems:"center",gap:5}}>
        <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold",marginVertical: 16  }}>Welcome Back !</Text>
        <View style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "white", justifyContent: "space-between", gap: 4, flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "#15B912", alignItems: "center", paddingVertical: 10, borderRadius: 20 }} >
            <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>Login With Number</Text>
          </TouchableOpacity  >
          <TouchableOpacity style={{ flex: 1, alignItems: "center", paddingVertical: 8, }} onPress={() => props.navigation.navigate("loginWithEmail")}>
            <Text style={{ color: "#383838", fontWeight: "500" }}>Login With Email</Text>
          </TouchableOpacity>
        </View>
        </View>


        <View style={{ width: '100%' }}>
          <TextInput style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", }} placeholder="+91" placeholderTextColor="#FFFFFF"></TextInput>
        </View>

        <View style={{ width: "100%" }}>
          <TouchableOpacity style={{ width: "100%", backgroundColor: "#FFFFFF", paddingVertical: 10, borderRadius: 25, alignItems: "center" }} onPress={() => props.navigation.navigate("Otpverification")}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("createAccountpage")}>
            <View style={{ width: "100%", alignItems: "center",marginTop:5 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "400" }}>Do not have Account ? Click here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    {/* </ImageBackground> */}
  </View>
}

export default LoginWithNumber