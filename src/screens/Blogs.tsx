import {BLOGS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import Loading from '../components/Loading';

const {width, height} = Dimensions.get('window');

const Blogs = ({navigation}) => {
  const [highlightedItem, setHighlightedItem] = React.useState(null);
  const [data, setData] = useState();
  const [message, setMessage] = useState('');
  const base_url = 'https://www.mobilezmarket.com/images/';

  const fetchData = () => {
    axios
      .get(BLOGS)
      .then(response => {
        setData(response.data.blogs);
      })
      .catch(error => {
        // Alert.alert('Failed');
        setMessage('Failed');
        navigation.goBack();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;

  return (
    <SafeAreaView>
      <Header title={'Blogs'} />
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => navigation.navigate('BlogDetails', {data: item})}
              onPressIn={() => setHighlightedItem(item)}
              onPressOut={() => setHighlightedItem(null)}
              underlayColor="transparent" // Prevent the default gray highlight
            >
              <View
                style={
                  item === highlightedItem
                    ? [styles.highlightedItemContainer, styles.itemMargin]
                    : [styles.itemContainer, styles.itemMargin]
                }>
                <Image
                  style={styles.image}
                  source={{uri: base_url + item.image}}
                  resizeMode="contain"
                />
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
      <AlertModale message={message} setMessage={setMessage} />
    </SafeAreaView>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  itemMargin: {
    margin: 10, // Add margin for spacing between items
  },
  container: {
    flex: 1,
    backgroundColor: '#015dcf',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 150,
  },
  itemContainer: {
    width: 180,
    padding: 10,
    margin: 8,
    backgroundColor: '#ffffff', // Background color for the item
    borderRadius: 10, // Add some rounded corners for an attractive look
    elevation: 5, // Add shadow
  },
  highlightedItemContainer: {
    width: 180,
    padding: 10,
    margin: 8,
    backgroundColor: '#ADD8E6', // Highlighted background color
    borderRadius: 10, // Add some rounded corners for an attractive look
    elevation: 5, // Add shadow
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10, // Match the borderRadius of the container
  },
  title: {
    color: '#000000',
    marginTop: 5,
  },
});
