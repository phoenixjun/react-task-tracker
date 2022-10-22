import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask';
import formElement from './formElement.json'
import Element from './components/forms/Element'


console.log(formElement)

function App() {

  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task)=>task.id !== id));
  };

  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])

    const res = await fetch(`http://localhost:5000/tasks`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

      const data = await res.json()
      // console.log(data)
      setTasks([...tasks, data])
  }
  

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? 
      {...task, reminder:data.reminder} : 
      task))
    console.log('toggle', id);
  }

  useEffect(()=> {
    const getTasks = async() => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])


  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }

  const [showAddTask, setShowAddTask] = useState(false);

  // array of destructuring
  const [tasks, setTasks] = useState([])
  return (
    <Router>
      <Element />
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <select defaultValue={0} className="form-select" aria-label="Default select example">
            <option value={0}>Open this select menu</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <Header title={'Task Tracker'} 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask}/>
            <Routes>
                <Route path='/' exact element={<>
                  {showAddTask ? <AddTask onAdd={addTask} /> : <></>}
                  {
                    tasks.length > 0 ? 
                      <Tasks tasks= {tasks} onDelete={deleteTask} onToggle={toggleReminder} /> :
                      (
                        <h2 style={{color:'blue'}}>No tasks to show</h2>
                      )
                  }
                  </>
                  }
                 />
                <Route path='about' element={ <About />}></Route>
            </Routes>
        <Footer />
      </div>
      </Router>
  );
}

export default App;
