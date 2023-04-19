import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert,ActivityIndicator } from "react-native";
import { API_URL } from "../config/constants";
import axios from "axios";
const Review = (props) => {
    const [reviews, setReview] = useState(null);
    useEffect(() => {
		axios
			.get(`${API_URL}/reviews`)
			.then((result) => {
				setReview(result.data.reviews);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
    if (!reviews){
        return <ActivityIndicator/>
    }

    return(
        <View Style={styles.container}>
        <ScrollView>
        {reviews &&reviews.map((review, index) => { console.log(review)
							return (
								<TouchableOpacity  key={review.id} >
									<View style={styles.reviewCard}>
										<View>
											<Image source={{ uri: `${API_URL}/${review.imageUrl}` }} style={styles.reviewImage} resizeMode={"contain"} />
										</View>
										<View style={styles.reviewContent}>
										    <Text style={styles.reviewName}>{review.name}</Text>
											<Text>{review.productname}</Text>
											<Text style={styles.reviewDesc}>{review.desc}</Text>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
        </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:"#ffffff",
    },
    reviewImage:{
        width:"100%",
        height:300,
        resizeMode:"contain"
    },
    reviewName:{
        fontSize:24,
        fontWeight:400
    },
    reviewDesc:{
        fontSize:16,
        marginTop:4,
        color:"#666"
    },
    reviewContent:{
        textAlign:"center"
    }
})



export default Review;