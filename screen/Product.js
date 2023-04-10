import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";

const Product = (props) => {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        console.log("♈", result);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!product) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Text style={styles.sellerText}>{product.seller}</Text>
            <Image style={styles.avatarImage} source={{ uri: "https://cdn-icons-png.flaticon.com/128/10296/10296308.png" }} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <Text style={styles.productDate}>{dayjs(product.createAt).format('YYYY년MM월DD일')}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
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
  divider: {
    backgroundColor: "#ddd",
    height: 1,
    marginVertical: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  sellerText:{
    color:"#333",
  },
  productName:{
    fontSize:24,
    fontWeight:400,
  },
  productPrice:{
    fontSize:18,
    fontWeight:700,
    marginTop:8,
  },
  productDate:{
    fontSize:14,
    marginTop:4,
    color:"#aaa",
  },
  productDesc:{
    fontSize:16,
    fontWeight:4,
    color:"#333",
  },
});
export default Product;
