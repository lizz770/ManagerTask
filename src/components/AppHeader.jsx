import React, {useState} from 'react'
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterPriority } from '../app/todoSlice';
function AppHeader() {
  //модель открыта изменит статус открыто
  const [modalOpen, setModalOpen] = useState(false)
  //фильтр
  const filterPriority=useSelector((state)=>state.todo.filterPriority);
  
  const [filterMarks, setFilterMarks]= useState(false);
  const dispatch=useDispatch();
   
  const updateFilter = (e) =>{
    dispatch(updateFilterPriority(e.target.value));
  };


  return (
    //изменение стиля кнопочки на primary или secondary
    <div className={styles.appHeader}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Добавить задачу
        </Button>
        
        <SelectButton id="priority" value={filterPriority} onChange={updateFilter}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
        </SelectButton>
        
        <SelectButton id="marks" value={filterMarks} onChange={updateFilter}>
            <option value="research">Research</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
        </SelectButton>
        <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader