import { Pressable, StyleSheet, Text } from 'react-native';

export type TodoItem = {
    id: string;
    title: string;
    done: boolean;
}

// props are similar to todoitem reuse it
type TodoItemProps = TodoItem & {
    onClick: (id: string) => void;
}

export default function Item({ id, title, done, onClick }: TodoItemProps) {
    return (
        <Pressable onPress={() => onClick(id)}>
            <Text style={[styles.text, done && styles.done]}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    done: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
});