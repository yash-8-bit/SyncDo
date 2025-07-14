import React, { useEffect, useState } from "react";
import accountsvg from "../assets/account.svg";
import type { User } from "../types/user.type";
import ls from "../utils/ls";
import Button from "../components/Button";
import { accountDetails } from "../apis/user";
import type { AlertType } from "../types/alert.type";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

function Account() {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  const [alert, setalert] = useState<AlertType>({
    text: "",
  });
  const logout = () => {
    ls.reset();
    location.reload();
  };
  useEffect(() => {
    const get = async () => {
      try {
        setloading(true);
        const data = await accountDetails();
        setData(data.data);
        setloading(false);
      } catch (error: any) {
        setloading(false);
        if (error.response && error.response.data) {
          setalert({ text: error.response.data.message });
          return;
        }
        setalert({ text: error.message });
      }
    };
    get();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {alert.text && <Alert text={alert.text} cname="error" />}
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
    </>
  );
}

export default Account;
