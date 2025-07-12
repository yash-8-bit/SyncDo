import React, { useEffect, useState } from "react";
import accountsvg from "../assets/account.svg";
import type { User } from "../types/user.type";
import ls from "../utils/ls";
import Button from "../components/Button";
import { accountDetails } from "../apis/user";

function Account() {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
  });

  const logout = () => {
    ls.reset();
    location.reload();
  };
  useEffect(() => {
    const get = async () => {
      try {
        const data = await accountDetails();
        setData(data.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    get();
  }, []);
  return (
    <div className="container" style={{ alignItems: "center" }}>
      <img className="imguser" src={accountsvg} alt="" />
      <div className="griduser">
        <label htmlFor="name">Name -</label>
        <h3 id="name">{data.name}</h3>
        <label htmlFor="email">Username -</label>
        <h3 id="email">{data.username}</h3>
      </div>
      <Button func={logout} text="Log Out" cname="secondary" />
    </div>
  );
}

export default Account;
