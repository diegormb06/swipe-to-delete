import { View, Text, StyleSheet } from "react-native";
import { Task } from "../App";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";

type ListItemProps = {
  task: Task;
  onDismiss: () => void;
};

const TASK_ITEM_HEIGHT = 70;

export function ListItem({ task, onDismiss }: ListItemProps) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(TASK_ITEM_HEIGHT);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -50) {
        translateX.value = withTiming(-400, {}, () => {
          runOnJS(onDismiss)();
        });
        itemHeight.value = withTiming(0);
      } else {
        translateX.value = withSpring(0, { damping: 15, velocity: 10 });
      }
    });

  const animationTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animationHeight = useAnimatedStyle(() => ({
    height: itemHeight.value,
  }));

  return (
    <Animated.View style={[styles.taskContainer, animationHeight]}>
      <Animated.View style={styles.iconContainer}>
        <FontAwesome6 name="trash-alt" color="red" size={24} />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.task, animationTranslate]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  task: {
    width: "90%",
    height: TASK_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    width: "100%",
    height: TASK_ITEM_HEIGHT,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: "11%",
  },
});
