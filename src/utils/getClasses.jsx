//функция будет принимать массив классов
//а возвращать отфильтрованный массив непустых классов
export const getClasses=(classes)=>
    classes
      .filter((item)=>item!=='')
      .join(' ')
      //trim-обрежет и уберет пробелы
      .trim();