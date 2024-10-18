import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todocheck=localStorage.getItem("todos")
     if(todocheck){
     let todos=JSON.parse(localStorage.getItem("todos"))
     settodos(todos)
     }
  }, [])
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const saveTodos=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd=()=>{
      
    settodos([...todos ,{id:uuidv4(),todo, isCompleted: false}])
    settodo("")
    saveTodos()

    
  }
  const handleedit=(e,id)=>{
    let t = todos.filter(i=>i.id === id) 
     settodo(t[0].todo)
    let newTodos =todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    saveTodos()
  }
   const handledelete=(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos) 
    saveTodos()
  }
  const handleChange=(e)=>{
     settodo(e.target.value)
  }
  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveTodos()
  }
  
  return (
    <>
     <Navbar/> 
    <div>
     <div className='  bg-[#a3b18a] mx-64 rounded-xl m-8 h-[80vh] flex flex-col gap-8 pl-3'>
      
        <div>
          <div >
            <h1 className=' text-center font-bold'>Yours To-Do</h1>
            </div>
        <input onChange={handleChange}  value={todo} type='text' className='w-[75%] mr-3 rounded-full pl-3 mt-3 ' />
        <button  onClick={handleAdd} className='bg-[#344e41] text-white px-1 py-1 font-bold rounded-lg'>Save</button>
        </div>
        {todos.map(item=>{
         return <div key={item.id} className="todo flex">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
          <h2  className={item.isCompleted?"line-through":""}>{item.todo}</h2>
          <div className='flex '>
          <button onClick={(e)=>handleedit(e,item.id)} className='bg-[#344e41] text-white px-1 py-1 font-bold rounded-lg text-xl'><MdEdit /></button>
          <button onClick={(e)=>handledelete(e,item.id)}  className='bg-[#344e41] text-white px-1 py-1 font-bold rounded-lg text-2xl'><MdDeleteOutline /></button>
          </div>
        </div>
        })}

              
        
     </div>
    </div>
    
    </>
  )
}

export default App
