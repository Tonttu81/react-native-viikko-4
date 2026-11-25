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
  // line-through styling was very inconsistent for some reason, the line was not showing for some items even when done was true
  // so used colors in addition to line-through to indicate when item is done
  return (
    <Pressable onPress={() => onClick(id)}>
      <Text style={done ? styles.done : styles.inProgress}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inProgress: {
    fontSize: 25,
    color: 'red'
  },
  done: {
    fontSize: 25,
    color: 'green',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});