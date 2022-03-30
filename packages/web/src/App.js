import { API } from "@aws-amplify/api";
import { useEffect } from "react";
import "./configureAmplify";

const todosQuery = `
  query todos {
    todos {
      id
      title
    }
}`;

function App() {
  /**
   * Query all Todos
   */
  async function fetchTodos() {
    const response = await API.graphql({
      query: todosQuery,
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center">
      <pre>{JSON.stringify(todos)}</pre>
    </div>
  );
}

export default App;
