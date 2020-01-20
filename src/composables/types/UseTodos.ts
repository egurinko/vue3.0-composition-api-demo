export type Todo = {
  name: string;
  completed: boolean;
};

export enum FilterByEnum {
  ALL = "All",
  WORKING = "Working",
  DONE = "Done"
}

export type FilterBy =
  | FilterByEnum.ALL
  | FilterByEnum.WORKING
  | FilterByEnum.DONE;

export type Data = {
  todos: Todo[];
  newTodo: string;
  filterBy: FilterBy;
};
