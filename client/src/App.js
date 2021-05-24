import './App.scss';
import TaskList from "./component/TaskList";
import ModalList from "./component/Modal/ModalList"

function App() {
  
  return(
  <div className="mainContainer">
    <div className="header">
      <h1>TASK LIST</h1>
    </div>
    <TaskList/>
    <ModalList/>
  </div>
  ) 
}

export default App;
