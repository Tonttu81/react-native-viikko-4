import { useEffect, useState } from 'react';
import { Button, FlatList, Text, StyleSheet, TextInput, View, Pressable } from 'react-native';
import Item, { TodoItem } from './item';

const STORAGE_KEY = 'TODO_LIST_ITEMS';

export default function List() {
    const [title, onChangeTitle] = useState<string>('');
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

    /*
    useEffect(() => {
        (async () => {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) setTodoItems(JSON.parse(json));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
    }, [todoItems]);
    */

    const addItem = () => {
        if (!title) return

        const newItem = {
            id: Date.now().toString(),
            title: title,
            done: false
        }

        setTodoItems(prev => [...prev, newItem])
        onChangeTitle('')
    }

    const toggleDone = (id: string) => {
        // map makes a new list, if list id matches given id, update done state
        setTodoItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, done: !item.done }
                    : item
            )
        )
        console.log(id, todoItems)
    }

    return (
        <View style={styles.listContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter task'
                    onChangeText={onChangeTitle}
                    value={title}
                />
                <Pressable
                    onPress={addItem} 
                >
                    <Text style={styles.button}>Save</Text>
                </Pressable>
            </View>
            
            <FlatList
                removeClippedSubviews={false}
                data={todoItems}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    <Item id={item.id} title={item.title} done={item.done} onClick={toggleDone} />
                }
            />
        </View>
    )
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
        fontSize: 20
    },
    button: {
        fontSize: 20,
        color: 'blue'
    }
});
