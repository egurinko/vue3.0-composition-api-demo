import todos from "../utils/todos";
import { FilterByEnum, Data, FilterBy } from "./types/UseTodos";
import {
  reactive,
  onMounted,
  computed,
  toRefs,
  InjectionKey
} from "@vue/composition-api";

export const useTodos = () => {
  const todoState = reactive<Data>({
    todos: [],
    newTodo: "",
    filterBy: FilterByEnum.ALL
  });

  const filteredTodos = computed(function() {
    return todoState.todos.filter(todo => {
      if (todoState.filterBy === FilterByEnum.WORKING) {
        return !todo.completed;
      }
      if (todoState.filterBy === FilterByEnum.DONE) {
        return todo.completed;
      }
      return todo;
    });
  });

  const numOfTodos = computed(function(): number {
    return todoState.todos.filter(todo => !todo.completed).length;
  });

  onMounted(() => {
    init();
  });

  const init = function(): void {
    getTodos();
  };
  const getTodos = function(): void {
    setTimeout(() => {
      todoState.todos = [...todos];
    }, 1000);
  };
  const addTodo = function(): void {
    const newTodo = { name: todoState.newTodo, completed: false };
    todoState.todos = [...todoState.todos, newTodo];
    todoState.newTodo = "";
  };
  const deleteTodo = function(index: number): void {
    todoState.todos = todoState.todos.filter((todo, i) => i !== index);
  };
  const completeTodo = function(index: number): void {
    todoState.todos[index].completed = true;
  };
  const handleClickFilterBy = function(filterBy: FilterBy): void {
    todoState.filterBy = filterBy;
  };

  return {
    ...toRefs(todoState),
    filteredTodos,
    numOfTodos,
    addTodo,
    handleClickFilterBy,
    completeTodo,
    deleteTodo
  };
};

export type UseTodos = ReturnType<typeof useTodos>;
export const TodosKey: InjectionKey<UseTodos> = Symbol("UseTodos");
