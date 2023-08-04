import React, { useState } from 'react';

const List = () => {
    const [toDoList, setToDoList] = useState([])
    return (
        <div>
            {toDoList.map(todo =>
                <div style={{padding:30, border:'2px solid black'}}>{todo.title}</div>
            )}
        </div>
    );
};

export default List;