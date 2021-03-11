import UserAws from "./components/user";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="titulo">
        <h1>Membros AWS</h1>
      </div>
      <UserAws />
    </div>
  );
}