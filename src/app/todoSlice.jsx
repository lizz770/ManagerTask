import {createSlice} from "@reduxjs/toolkit"

const getInitialTodo=()=>{
    const localTodoList=window.localStorage.getItem('todoList');
    if(localTodoList){
        //парсим данные
        return JSON.parse(localTodoList)
    }
    window.localStorage.setItem('todoList', JSON.stringify([]))
    return []
}
const initialValue={
    filterPriority:'low',
    //получить иходные данные с локального хранилища 
    //отобразить записи которые были созданы 
    todoList:getInitialTodo()
}
export const todoSlice=createSlice({
    name:'todo',
    initialState:initialValue,
    reducers:{
        addTodo:(state, action)=>{
            state.todoList.push(action.payload);
            const todoList=window.localStorage.getItem('todoList')
            //разбираем его
            if(todoList){
                const todoListArr=JSON.parse(todoList)
                todoListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
            }else{
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify([{ ...action.payload }])
               );
            }
        },
        deleteTodo:(state,action) =>{
            const todoList=window.localStorage.getItem('todoList');
            if (todoList){
                const todoListArr= JSON.parse(todoList);
                todoListArr.forEach((todo,index)=>{
                    if (todo.id === action.payload){
                        todoListArr.splice(index, 1)
                    }
                });
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
                state.todoList= todoListArr;
            }
        },
        updateTodo:(state,action)=>{
            const todoList=window.localStorage.getItem('todoList');
            if (todoList){
                const todoListArr=JSON.parse(todoList);
                todoListArr.forEach((todo, index)=>{
                    if(todo.id === action.payload.id){
                        todo.title = action.payload.title
                        todo.priority = action.payload.priority
                        todo.marks = action.payload.marks
                        todo.description = action.payload.description
                    }
                });
                window.localStorage.setItem('todoList',JSON.stringify (todoListArr));
                state.todoList= todoListArr;
            }
        },
        updateFilterPriority:(state,action)=>{
            state.filterPriority=action.payload;
        }
    }
})

export const{addTodo, deleteTodo, updateTodo, updateFilterPriority} = todoSlice.actions;
export default todoSlice.reducer;