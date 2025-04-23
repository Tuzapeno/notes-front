import Greetings from "@/components/Greetings";
import NoteGrid from "@/components/NoteGrid/NoteGrid";
import { selectUser } from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/Button/Button";
import { logout } from "../auth/authSlice";
import { ApiDoLogoff } from "../api/api";

function Notes() {
  const username = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoff = async () => {
    const response = await ApiDoLogoff();

    if (response?.status !== 200) {
      console.error("Error logging off");
      return;
    }

    localStorage.removeItem("userCredentials");
    dispatch(logout());
  };

  return (
    <div>
      <div className="flex flex-col">
        <Greetings text={"Bem vindo " + username} />
        <center>
          <Button label="Sair" onAction={logoff} />
        </center>
        <NoteGrid />
      </div>
    </div>
  );
}

export default Notes;
