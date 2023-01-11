import {View, Image, Text} from "react-native";
import {cardItemStyles} from "./CartItem.styles";
import {Post} from "../../models/Post";
import {Avatar} from "react-native-paper";
import React from "react";

export type CartItemProps = {
  post: Post
}
export const CardItem = ({post}: CartItemProps) => {
  const {containerStyles, imageStyles, titleStyles, detailSectionStyles, captionStyles} = cardItemStyles
  return (
    <View style={containerStyles}>
      <Image style={imageStyles} source={{uri: post.imageUrls[0]}}/>
      <View style={detailSectionStyles}>
        <View style={{flex: 2, flexDirection: "row"}}>
          <Text style={titleStyles}>{post.title}</Text>
          <Avatar.Text style={{marginLeft: 5}} label={post.username.charAt(0)} size={35}/>
        </View>
        <View style={{flex: 2, flexDirection: "row"}}>
          <Text style={captionStyles}>{post.price} Rupees</Text>
          <Text style={captionStyles}>Availability: {post.quantity}</Text>
        </View>
      </View>
    </View>
  )
}
