import { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, TextInput, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item, { TodoItem } from './item';

const STORAGE_KEY = 'TODO_LIST_ITEMS';

export default function List() {
  const [title, setTitle] = useState<string>('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTodoItems(JSON.parse(json));
      } catch (e) {
        console.error(e)
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  }, [todoItems]);

  const addItem = () => {
    if (!title) return;

    const newItem = {
      id: Date.now().toString(),
      title: title,
      done: false
    };

    setTodoItems(prev => [...prev, newItem]);
    setTitle('');
  };

  const toggleDone = (id: string) => {
    setTodoItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter task'
          onChangeText={setTitle}
          value={title}
        />
        <Pressable onPress={addItem}>
          <Text style={styles.button}>Save</Text>
        </Pressable>
      </View>

      <FlatList
        data={todoItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Item id={item.id} title={item.title} done={item.done} onClick={toggleDone} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    gap: 10
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: 25
  },
  button: {
    fontSize: 25,
    color: 'blue'
  }
});