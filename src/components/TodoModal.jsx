import React, {useEffect, useState} from 'react'
import styles from '../styles/modules/modal.module.scss'
import {MdOutlineClose} from 'react-icons/md'
import Button from './Button';
import toast from 'react-hot-toast';
import {addTodo, updateTodo} from '../app/todoSlice'
import { useDispatch } from 'react-redux';
import{v4 as uuid} from 'uuid'

//если модель открыта показать содержиое если нет то нет 
function TodoModal({type, modalOpen, setModalOpen, todo}) {
    const [title,setTitle]=useState('');
    const [priority,setPriority]=useState('low');
    const [marks,setMarks]=useState('research');
    const [description,setDescription]=useState('');
    //используем диспетхук
    const dispatch=useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
          setTitle(todo.title);
          setPriority(todo.priority);
          setMarks(todo.marks);
          setDescription(todo.description);
        } else {
          setTitle('');
          setPriority('low');
          setMarks('research');
          setDescription('');
        }
      }, [type, todo, modalOpen]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
          toast.error('Введите название задачи.');
          return;
        }
        if (title && priority && marks && description) {
          if (type === 'add') {
            dispatch(
              addTodo({
                id: uuid(),
                title,
                priority,
                marks,
                description,
                time: new Date().toLocaleString(),
              })
            );
            toast.success('Задача успешно добавлена.');
          }
          if (type === 'update') {
            if (todo.title !== title || todo.priority !== priority ||
                todo.marks !== marks || todo.description !== description) {
              dispatch(updateTodo({ ...todo, title, priority, marks, description}));
              
            }
          }
          setModalOpen(false);
        }
      };


  return (
    modalOpen &&(
        <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.closeButton}
            //при нажатии на кнопку модель изменяет состояние на false
            onClick={()=>setModalOpen(false)}
            onKeyDown={()=>setModalOpen(false)}
            tabIndex={0}
            role="button"
            >
            <MdOutlineClose/>
            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h1 className={styles.formTitle}>
                    {type === 'add' ? 'Добавить ' : 'Обновить '}
                      задачу</h1>
                <label htmlFor="title">
                    Название задачи 
                    <input 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                </label>
                <label htmlFor="priority">
                    Приоритет
                    <select 
                    name="priority" 
                    id="priority" 
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
                    >
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                        <option value="high">high</option>
                    </select>
                </label>
                <label htmlFor="marks">
                    Отметки
                    <select 
                    name="marks"
                    id="marks"
                    value={marks}
                    onChange={(e)=>setMarks(e.target.value)}
                    >
                        <option value="research">research</option>
                        <option value="design">design</option>
                        <option value="development">development</option>
                    </select>
                </label>
                <label htmlFor="description">
                    Описание
                    <input 
                    type="text" 
                    id="description"
                    value={description}
                    //при изменении поля сохранить изменяемое значение
                    onChange={(e) => setDescription(e.target.value)}    
                    />
                </label>
                <div className={styles.buttonContainer}>
                    <Button type="submit" variant="primary">
                        {type === 'add' ? 'Добавить задачу' : 'Обновить задачу'}
                
                    </Button>
                    <Button 
                    type="button"
                    variant='secondary'
                    onClick={()=>setModalOpen(false)}
                    onKeyDown={()=>setModalOpen(false)}
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </div>
     </div>
      )
  )
}

export default TodoModal