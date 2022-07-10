import { Tiptap } from "./tiptap";

import "./App.css";

function App() {
  return (
    <div className="App container mx-auto px-16 flex flex-col gap-4 max-w-[80ch]">
      <header className="py-4 border-b border-slate-400">Something</header>
      <main className="flex justify-center">
        <Tiptap />
      </main>
    </div>
  );
}

export default App;
