import './App.scss';
import TaskList from "./component/TaskList";

function App() {
  return(
  <div className="mainContainer">
    <div className="header">
      <h1>TASK LIST</h1>
    </div>
    <div className="slide">
      <TaskList/>
    </div>
    <div className="center">
      <div className="addList">
        NEW LIST
      </div>
    </div>
  </div>
  ) 
}

export default App;
