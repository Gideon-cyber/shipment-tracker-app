import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types";
import InputField from "@/components/InputField";
import Shipments from "@/components/shipments/Shipments";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const [user, setUser] = useState<UserType | null>(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // handlers
  const handlePresentPress = () => bottomSheetModalRef?.current?.present();
  const handleDismissPress = () => bottomSheetModalRef?.current?.close();

  console.log("user", user);
  const [selectedStatus, setSelectedStatus] = useState<null | string>(null);
  const [search, setSearch] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../../assets/images/profilePic.png")}
            style={styles.profilePic}
          />

          <Image
            source={require("../../assets/images/LogoBlue.png")}
            style={styles.logo}
          />

          <View style={styles.notification}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.blue.background}
            />
          </View>
        </View>
        <View style={styles.greetingsContainer}>
          <Text style={styles.helloText}>Hello,</Text>
          <Text style={styles.nameText}>{user?.full_name}</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={16}
            color={Colors.grey.labelText}
            style={{
              position: "absolute",
              top: 33,
              left: 23,
              zIndex: 1,
              transform: [{ translateY: -1 / 2 }],
            }}
          />
          <InputField
            placeholder="Search"
            style={{
              backgroundColor: "#F4F2F8",
              borderRadius: 8,
              padding: 16,
              paddingLeft: 30,
            }}
            value={search}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePresentPress}>
            <Ionicons
              name="filter"
              size={24}
              color={Colors.blue.inactiveText}
            />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.blue.background,
              },
            ]}
          >
            <Ionicons name="scan" size={24} color={"#fff"} />
            <Text style={styles.scanText}>Add Scan</Text>
          </TouchableOpacity>
        </View>

        <Shipments search={search} />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          enablePanDownToClose={false}
          snapPoints={["35%"]}
          containerStyle={{
            flex: 1,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignItems: "center",
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={handleDismissPress}>
              <Text
                style={{
                  color: Colors.blue.background,
                  fontSize: 16,
                  lineHeight: 26,
                  fontWeight: 500,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                lineHeight: 26,
                fontWeight: 600,
              }}
            >
              Filters
            </Text>
            <TouchableOpacity onPress={handleDismissPress}>
              <Text
                style={{
                  color: Colors.blue.background,
                  fontSize: 16,
                  lineHeight: 26,
                  fontWeight: 500,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                color: "#58536E",
                fontSize: 13,
                lineHeight: 26,
                fontWeight: 500,
              }}
            >
              SHIPMENT STATUS
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
                marginTop: 12,
              }}
            >
              {[
                "Received",
                "Putaway",
                "Delivered",
                "Cancelled",
                "Rejected",
                "Lost",
                "On Hold",
              ].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    minWidth: 80,
                    borderRadius: 10,
                    backgroundColor: "#F4F2F8",
                    alignItems: "center",
                    justifyContent: "center",

                    // Step 4: Apply conditional border styles
                    borderWidth: selectedStatus === status ? 2 : 0,
                    borderColor:
                      selectedStatus === status
                        ? Colors.blue.background
                        : "transparent",
                  }}
                  // Step 3: Update state on press
                  onPress={() => setSelectedStatus(status)}
                >
                  <Text
                    style={{
                      color:
                        selectedStatus === status
                          ? Colors.blue.background
                          : "#3F395C",
                      fontSize: 16,
                    }}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 16,
  },
  notification: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#F4F2F8",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    height: 40,
    width: 40,
  },
  logo: {
    height: 16,
    width: 92,
  },
  greetingsContainer: {
    padding: 16,
    gap: 8,
  },
  helloText: {
    fontSize: 14,
    color: "black",
    opacity: 0.6,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 16,
  },
  buttonContainer: {
    padding: 16,
    flexDirection: "row",
    gap: 14,
    width: "100%",
  },
  button: {
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
    height: 44,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  filterText: {
    color: Colors.blue.inactiveText,
  },
  scanText: {
    color: "white",
  },
});
