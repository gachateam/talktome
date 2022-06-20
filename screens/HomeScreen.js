import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import faker from 'faker';

const DATA = [...Array(100).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 6;

const HomeScreen = ({navigation}) => {
  const {colors, barStyle} = useTheme();

  const AVATAR_SIZE = 70;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle={barStyle} />
      <FlatList
        data={DATA}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.listItem} onPress={() => {}}>
              <>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: AVATAR_SIZE,
                    width: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: '700',
                      fontSize: 24,
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{color: colors.text}}>{item.jobTitle}</Text>
                  <Text style={{color: colors.text}}>{item.email}</Text>
                </View>
              </>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    padding: SPACING,
  },
});
