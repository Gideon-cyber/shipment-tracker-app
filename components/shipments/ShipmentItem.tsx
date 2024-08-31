import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Checkbox from "../CheckBox";
import { Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "@/constants/utils/fx";

const ShipmentItem = ({ item, status }: any) => {
  // console.log("status", status);
  return (
    <View style={styles.shipmentItemContainer}>
      <View style={styles.shipmentDetails}>
        <Checkbox />

        <Image
          source={require("../../assets/images/box.png")}
          style={styles.boxImage}
        />

        <View>
          <Text
            style={{
              fontSize: 13,
              color: "#3F395C",
            }}
          >
            AWB
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#3F395C",
              }}
            >
              {capitalizeFirstLetter(item.origin_city)}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={12}
              color={Colors.blue.background}
            />
            <Text
              style={{
                fontSize: 13,
                color: "#3F395C",
              }}
            >
              {capitalizeFirstLetter(item.destination_city)}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 23,
          width: 72,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: status?.color || "",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            color: status?.color || "",
          }}
        >
          {status?.status}
        </Text>
      </View>
      <View style={styles.shipmentIcon}>
        <Image
          source={require("../../assets/images/arrow.png")}
          style={styles.iconImage}
        />
      </View>
    </View>
  );
};

export default ShipmentItem;

const styles = StyleSheet.create({
  shipmentItemContainer: {
    // width: "100%",
    backgroundColor: "#F4F2F8",
    borderRadius: 10,
    padding: 12,
    height: 67,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 8,
  },
  shipmentDetails: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  shipmentIcon: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  boxImage: {
    height: 40,
    width: 40,
  },
  iconImage: {
    height: 16,
    width: 16,
  },
});
