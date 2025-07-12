import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Authform from "./Pages/Authform";
import Layout from "./Layout/Layout";
import Account from "./Pages/Account";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
