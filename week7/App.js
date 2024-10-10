import * as React from 'react';
import * as Asset from 'expo-asset';
import { useState } from 'react';
import { Button, Image, Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Tạo Stack Navigator
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      {/* Bức ảnh */}
      <Image source={require('./assets/notebut.png') } style={styles.image} />
      
      
      {/* Dòng chữ MANAGE YOUR TASK */}
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      
      {/* Ô nhập Name */}
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
      {/* Nút Get Started */}
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Screen1', { userName: name })} 
      />
    </View>
  );
}

function Screen1({ route, navigation }) {
  const { userName } = route.params;

  const [tasks, setTasks] = useState([
    { id: 1, title: 'To check email', completed: false },
    { id: 2, title: 'To finish the report', completed: true },
    { id: 3, title: 'To prepare for meeting', completed: false },
    { id: 4, title: 'To call John', completed: true },
    { id: 5, title: 'To buy groceries', completed: false },
  ]);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Avatar và lời chào */}
      <View style={styles.header}>
        <Image source={require('./assets/avatar1.jpeg')} style={styles.avatar} />
        <Text style={styles.greeting}>Hi {userName}</Text>
      </View>
      <Text style={styles.subText}>Have a great day ahead</Text>

      {/* Thanh tìm kiếm */}
      <TextInput style={styles.searchInput} placeholder="Search tasks..." />
      {/* Danh sách */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Icon
                name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity>
              <Icon name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Nút tròn với dấu cộng */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      <Button title="Continue" onPress={() => navigation.navigate('Screen2', { userName})} />
    </View>
  );
}

function Screen2({route, navigation }) {
  const { userName } = route.params;
  const [jobInput, setJobInput] = useState('');
  
  return (
    <View style={styles.container}>
      {/* Avatar và lời chào */}
      <View style={styles.header}>
        <Image source={require('./assets/avatar1.jpeg')} style={styles.avatar} />
        <Text style={styles.greeting}>Hi {userName}</Text>
      </View>
      <Text style={styles.subText}>Have a great day ahead</Text>

      {/* Ô nhập công việc */}
      <TextInput
        style={styles.input}
        placeholder="input your job"
        value={jobInput}
        onChangeText={setJobInput}
      />
      <Image source={require('./assets/notebut.png') } style={styles.image} />
      <Button title="FINISH" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color : "rgba(131, 83, 226, 1)",
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  taskTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}