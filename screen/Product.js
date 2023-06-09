import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config/constants";
import axios from "axios";
//import dayjs from "dayjs";
//import { color } from "react-native-reanimated";

const Product = (props) => {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!product) {
    return <ActivityIndicator />; //경로가 틀렸을때 스피너가 돈다.
  }
  const onPressButton = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("결제가 완료 되었습니다");
        getProduct();
      })
      .catch((error) => {
        console.log(error);
      });
    if (product.soldout !== 1) {
      Alert.alert("구매가 완료되었습니다.");
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
        </View>
        <View style={styles.productSection}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.divider}></View>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <View style={styles.productSeller}>
            <Image style={styles.avatarImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2163/2163350.png" }} />
            <Text style={styles.sellerText}>4NITURE</Text>
          </View>
          <Text style={styles.productDesc}>상품설명:{product.desc}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onPressButton}>
        <View style={product.soldout === 1 ? styles.purchaseDisabled : styles.purchaseButton}>
          <Text style={styles.purchaseText}>{product.soldout === 1 ? "품절" : "구매하기"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  productSection: {
    padding: 16,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  divider: {
    backgroundColor: "#aaa",
    height: 1,
    marginVertical: 8,
  },
  sellerText: {
    color: "#333",
  },
  productName: {
    fontSize: 24,
    fontWeight: 400,
  },
  productPrice: { fontSize: 16, fontWeight: 700, marginBottom: 8 },
  productDesc: { fontSize: 12, marginTop: 10, color: "#666", marginBottom: 60 },
  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgb(255,90,88)",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseText: {
    color: "white",
    fontSize: 24,
  },
  purchaseDisabled: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Product;
