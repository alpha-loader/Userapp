import Image from "next/image";
import styles from "./page.module.css";
import UserList from "./client_components/UserList";
// import SignIn from "./client_components/SignIn";
export default function Home() {
  return (
   <UserList/>
  );
}
