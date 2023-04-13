import { MdDelete, MdEdit } from 'react-icons/md';
import React ,{ useState }from 'react'
import { useDispatch } from 'react-redux';
import {deleteTodo} from '../app/todoSlice'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import TodoModal from './TodoModal';


function TodoItem({todo}) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen]=useState(false)

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        //toast.success('Успешно удалена задача.');
      };
      const handleUpdate = () => {
        setUpdateModalOpen(true);
      };
  return (
    <>
       <div className={styles.item}>
        <div className={styles.todoDetails}>
            <div className={styles.todoText}>
                <p className={getClasses([styles.textsheading])}>
                    {todo.title}
                </p>
                <p className={styles.todoText}>
                Создано: {todo.time}
                </p>
                <p className={styles.todoText}>
                Приоритет: {todo.priority}
                </p>
                <p className={styles.todoText}>
                Отметки: {todo.marks}
                </p>
            </div>
        </div>
        <div className={styles.todoActions}>
            <div className={styles.icon}
            onClick={handleDelete}
            onKetDown={handleDelete}
            role="button"
            tabIndex={0}
            >
                <MdDelete/>
            </div>
            <div className={styles.icon}
            onClick={handleUpdate}
            onKetDown={handleUpdate}
            role="button"
            tabIndex={0}
            >
                <MdEdit/>
            </div>
        </div>
    </div>
    <TodoModal
    type="update"
    todo={todo} 
    modalOpen={updateModalOpen} 
    setModalOpen={setUpdateModalOpen}/>
    </>
  )
}

export default TodoItem