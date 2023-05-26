import axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const UserScreen = () => {
    const [data1, setData1] = useState([]);
    const [loading1, setLoading1] = useState(true)

    const url = "https://api.slingacademy.com/v1/sample-data/users"

    useEffect(() => {
        //using the axios api method to call the api
        axios.get(url)
        .then((response) => setData1(response.data.users)) //converting the response from the api to json format
        .catch((error) => console.log(error))
        .finally(() => setLoading1(false));
        
     
    }, [])
    
  return (
    <ScrollView>   
     <View style={{marginTop:30, marginLeft:5}}>
    <Text style={{fontSize:20, fontWeight:600, alignItems:"center", justifyContent:"center"}}>LIST OF USERS</Text>
      {loading1? (<Text>Loading</Text>):
      (data1.map((user1) => (
        <View key={user1.id} style={{ marginTop:10}}>
        <Text>Name: <Text>{user1.first_name} {user1.last_name}</Text></Text>
        <Text>Email: <Text>{user1.email}</Text></Text>
        <Text>Phone Number: <Text>{user1.phone}</Text></Text>
        <Text>Date of birth: <Text>{user1.date_of_birth}</Text></Text>
        <Text>Address: <Text>{user1.street}, {user1.state}, {user1.city} {user1.country}</Text></Text>
        <Text>Latitude: <Text>{user1.latitude}</Text></Text>
        <Text>Longitude: <Text>{user1.longitude}</Text></Text>
        <Text>ZipCode: <Text>{user1.zipcode}</Text></Text>
        <Text>Gender: <Text>{user1.gender}</Text></Text>
        <Text>Occupation: <Text>{user1.job}</Text></Text>
        </View>
      )))
     
      }
    </View>
    </ScrollView>

  )
}

export default UserScreen

const styles = StyleSheet.create({})