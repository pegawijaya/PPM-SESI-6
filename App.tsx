import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Data {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

const App = () => {
  const [datas, setDatas] = useState<Data[]>([]);
  const [editingData, setEditingData] = useState<Data | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const baseURL = "https://671a5c8aacf9aa94f6aa583f.mockapi.io/products";

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setDatas(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const postData = async () => {
    try {
      const newData = {
        image:"https://imgcdn.oto.com/large/git init gallery/exterior/21/2968/lamborghini-revuelto-front-angle-low-view-649283.jpghttps://encrypted-tbn0.gc:\Users\abibb\OneDrive\Gambar\lamborghini-revuelto-front-angle-low-view-649283.webpsatic.co/images?q=tbn:ANd9GcQEcrDRdlrLZZnoTUeONt1HjYZaxNu34r25qs8GAgnPJQZyLGSYV_3JgafPqjEAFr8COls&usqp=CAU",
        title: "Red Velvet",
        price: 120000,
        description: "bebeledagan",
      };
      const response = await axios.post(baseURL, newData);
      fetchData(); 
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };

  const deleteData = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/${id}`);

      fetchData(); 
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const editData = async (id: string) => {
    try {
      const updatedData = {
        image,
        title,
        price,
        description,
      };
      await axios.put(`${baseURL}/${id}`, updatedData);

      fetchData(); 
      setEditingData(null); 
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <ScrollView style={{backgroundColor:"#cadbed"}}>
        {editingData ? (
          <View>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput placeholder="Price" value={String(price)} onChangeText={(text) => setPrice(Number(text))} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput placeholder="Image URL" value={image} onChangeText={setImage} />
            <TouchableOpacity onPress={() => editData(editingData.id)} style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}>
              <Text style={{ color: "white" }}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.container}>
          {datas.map((data) => (
            <View key={data.id} style={styles.productContainer}>
              <Image source={{ uri: data.image }} style={styles.image} />
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.descripsi}>{data.description}</Text>
              <Text style={styles.price}>Rp {data.price}</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between",marginTop:20}}>
              <TouchableOpacity
                onPress={() => {
                  setEditingData(data);
                  setTitle(data.title);
                  setPrice(data.price);
                  setDescription(data.description);
                  setImage(data.image);
                }}
                style={styles.buttonEdit}
                >
                <Ionicons name="create-outline" size={30} color="#7e9bbf" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteData(data.id)}
                style={styles.buttonEdit}
                >
                <Ionicons name="trash-outline" size={30} color="#9c4441" />
              </TouchableOpacity>
              </View>
            </View>
          ))}
          
        </View>
      </ScrollView>
      <TouchableOpacity
          onPress={postData}
          style={{ backgroundColor: "#cadbed",
            padding: 10,
            borderRadius: 30,
            position: "absolute",
            bottom: 20,
            right: 25, 
            opacity:0.8
          }}
        >
        <Ionicons name="add-outline" size={40} color="#3b5670" />
      </TouchableOpacity>
  </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  productContainer: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "green",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color:"#cadbed"
  },
  price: {
    fontSize: 20,
    color: "#cadbed",
    marginBottom: 5,
  },
  buttonEdit: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 5,
    marginBottom: 5,
    alignItems:"center"
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    alignItems:"center"

  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  descripsi: {
    fontSize: 15,
    color: "#cadbed",
    marginBottom: 5,
  },
});