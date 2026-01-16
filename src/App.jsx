import Tasks from "./components/Tasks"; // primeiro componente
import AddTask from "./components/AddTask"; // segundo componente
import { useEffect, useState } from "react";
import {v4} from "uuid";

function App(){ // Nosso componente
  const[tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [] );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      //chamar a API
      const response = await fetch (`https://jsonplaceholder.typicode.com/todos?_limit=10`, {
        method: 'GET'
      });
      
      // pegar os dados que ela retorna
      const data = await response.json(); // convertendo response para json

      // armazenar esses dados no state
      setTasks(data)
    };
    fetchTasks();
  }, []);

  function onTaskClick(taskId){
    const newTasks = tasks.map((task) => {
      if (task.id == taskId){
        return{...task, isCompleted: !task.isCompleted}
      } 
        return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId){
    const newTasks = tasks.filter(task => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit (title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    }
    setTasks([...tasks,newTask]); // a nova lista vai ter tudo que estava anteriormente mais a nova que a gente criou agora "newTask"
  }

  return ( // só podemos retornar 1 coisa dentro do return
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4"> 
        <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  ) 
}

export default App; // Exportando o componente