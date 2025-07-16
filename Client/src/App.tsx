import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Authform from "./Pages/Authform";
import Layout from "./Layout/Layout";
import Account from "./Pages/Account";
import Addtask from "./Pages/Addtask";
import Updatetask from "./Pages/Updatetask";

// Routing part
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account-login" element={<Authform type="login" />} />
        <Route
          path="/account-register"
          element={<Authform type="register" />}
        />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add-task" element={<Addtask />} />
          <Route path="/update-task/:id" element={<Updatetask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
