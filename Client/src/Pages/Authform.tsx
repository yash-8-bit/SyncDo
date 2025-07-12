import { useState, type FormEvent } from "react";
import Input from "../components/Input";
import type { UserAuthType } from "../types/user.type";
import Button from "../components/Button";
import { login, register } from "../apis/userauth.api";
import ls from "../utils/ls";
import { Link } from "react-router";
import type { authtype } from "../types/user.type";

function Authform({ type }: { type: authtype }) {
  const [formdata, setFormdata] = useState<UserAuthType>({
    name: "",
    username: "",
    password: "",
  });
  const handlelogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(formdata);
      ls.set(data.token);
    } catch (error: any) {
      console.error(error);
    }
  };
  const handleregitser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await register(formdata);
      ls.set(data.token);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="center">
      <div className="box">
        <h1 className="heading">{type}</h1>
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
  );
}

export default Authform;
