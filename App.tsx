import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "./components/ListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type Task = {
  title: string;
  index: number;
};

const TITLES = [
  "watch the dismissible tutorial 👀",
  "Code example and improve the code 🧠",
  "Create a git repository to save code 🐙",
  "Write the readme whit screenshot 📋",
  "Push de the code 📤",
];

const TaskList = TITLES.map((title, index) => ({ title, index })) satisfies Task[];

export default function App() {
  const [tasks, setTasks] = useState(TaskList);

  function deleteItem(index: number) {
    const newItens = tasks.filter((t) => t.index !== index);

    setTasks(newItens);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Tasks</Text>
        <ScrollView>
          {tasks.map((task) => (
            <ListItem key={task.index} task={task} onDismiss={() => deleteItem(task.index)} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbff",
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    padding: "5%",
  },
});
