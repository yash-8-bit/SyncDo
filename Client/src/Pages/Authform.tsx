import { useState, type FormEvent, type JSX } from "react";
import Input from "../components/Input";
import type { UserAuthType } from "../types/user.type";
import Button from "../components/Button";
import { login, register } from "../apis/userauth.api";
import ls from "../utils/ls";
import { Link, useNavigate } from "react-router";
import type { authtype } from "../types/user.type";
import Alert from "../components/Alert";
import type { AlertType } from "../types/alert.type";
import Loading from "../components/Loading";

// login and register combined page
function Authform({ type }: { type: authtype }):JSX.Element {
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
    cname: "",
  });
  const [formdata, setFormdata] = useState<UserAuthType>({
    name: "",
    username: "",
    password: "",
  });

  // function to log in a user through the API
  const handlelogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const data = await login(formdata);
      ls.set(data.token);
      setloading(false);
      setalert({ text: data.message, cname: "success" });
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data) {
        setalert({ text: error.response.data.message, cname: "info" });
        return;
      }
      setalert({ text: error.message, cname: "error" });
    }
  };

  // function to register a user through the API
  const handleregitser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const data = await register(formdata);
      ls.set(data.token);
      setloading(false);
      setalert({ text: data.message, cname: "success" });
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data) {
        setalert({ text: error.response.data.message, cname: "info" });
        return;
      }
      setalert({ text: error.message, cname: "error" });
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="center">
        <div className="box">
          <h1 className="heading">{type}</h1>
          {alert.text && <Alert text={alert.text} cname={alert.cname} />}
          <form onSubmit={type == "login" ? handlelogin : handleregitser}>
            {type == "register" && (
              <Input
                placeholder="Name"
                heading="Enter name"
                value={formdata.name!}
                onchange={(e) =>
                  setFormdata((old) => ({ ...old, name: e.target.value }))
                }
              />
            )}
            <Input
              heading="Enter username"
              placeholder="Username"
              value={formdata.username}
              onchange={(e) => {
                setFormdata((old) => ({ ...old, username: e.target.value }));
              }}
            />
            <Input
              type="password"
              heading="Enter password"
              placeholder="Password"
              value={formdata.password}
              onchange={(e) => {
                setFormdata((old) => ({ ...old, password: e.target.value }));
              }}
            />
            {/* login or register button */}
            <Button text="Submit" type="submit" />
            {type == "login" ? (
              <p className="auth">
                No account?
                <Link to={"/account-register"}>register</Link>
              </p>
            ) : (
              <p className="auth">
                have an account?
                <Link to={"/account-login"}>login</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Authform;
