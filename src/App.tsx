import "./App.css";
import { Tabuleiro } from "./components/Tabuleiro";

function App() {
  return (
    <div className="flex">
      <Tabuleiro />
      <Tabuleiro />
    </div>
  );
}

export default App;
