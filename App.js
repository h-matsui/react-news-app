import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ListItem from './components/ListItem'
import dummyArticles from './dummies/articles'
import Constants from 'expo-constants'
import axios from 'axios'

const URL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor:'gray',
    borderWidth: 1,
    flexDirection: 'row'
  },
  leftContainer:{
    width: 100,
  },
  rightContainer:{
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
      console.log(response);
    }catch (error) {
      console.error(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data = {articles}
        renderItem = {({item}) => (
        <ListItem
          imageUrl = {{uri: item.urlToImage}}
          title = {item.title}
          author = {item.author}
        />
        )}
        keyExtractor = {(item, index) =>  index.toString()}
      />
    </SafeAreaView>
  );
}