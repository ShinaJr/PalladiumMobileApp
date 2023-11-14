import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native";

//infinite scrolling using flatlist
const UserScreen1 = () => {
  const [users, setUsers] = useState([]);
  //creating a current page state
  const [currentPage, setCurrentPage] = useState(1);
  //now showing the loader when an api is called by creating a loading state and setting the initial state to false
  const [isLoading, setIsLoading] = useState(false);


// change the page number to be dynamic
  const url1 = `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc`;

  useEffect(() => {
    setIsLoading(true); //set is loading to true before when calling the api
    //using the axios api method to call the api
    axios
      .get(url1)
    //   .then((response) => setUsers(response.data.results)) //handling success response
      //now adding the new users from our different current page fetched user data  to our existing user by using the spread operator.
        .then((response) => setUsers([...users, ...response.data.results]))
      .catch((error) => console.log(error)) //handling error response
      .finally(() => setIsLoading(false)); //setisLoading to false after getting a response 

      //now adding currentPage to our useEffect hook dependency array, so that when we change the current page number, our api will be called again
  }, [currentPage]);

  //renderItem function
  const renderItem = ({item}) => {
    return (
        <View style={styles.itemWrapperStyle}>
            <Image style={styles.itemImageStyle}source ={{uri: item.picture.large }} alt={item.name.title}/>
            <View style={styles.contentWrapperStyle}>
            <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
            <Text style={styles.txtEmailStyle}>{item.email}</Text>
            </View>
        </View>
    )
  }
  //rendering the loader
  const renderLoader = () => {
    return (
        //now show the loader if the loading state is true
        isLoading &&
        <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa"/>
        </View>
    )
  } 
  //load more Item Function
  const loadMoreItem =() => {
    //  increasing the current page number by 1
    setCurrentPage(currentPage + 1)
  } 

  return (
    <View>

      <View>      
      <FlatList data={users} renderItem={renderItem} keyExtractor={item => item.email}
        ListFooterComponent={renderLoader} onEndReached={loadMoreItem} onEndReachedThreshold={0}
      />
      </View>

    </View>
    
  );
};

export default UserScreen1;

const styles = StyleSheet.create({
    itemWrapperStyle: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor:"#ddd"
    },
    itemImageStyle: {
        width:50,
        height:50,
        marginRight:16
    },
    contentWrapperStyle: {
        justifyContent:"space-around"
    },
    txtNameStyle:{
        fontSize:16,
    },
    txtEmailStyle:{
        color:"#777"
    },
    loaderStyle:{
        marginVertical:16,
        alignItems: "center",

    }
});
