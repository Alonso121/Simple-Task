import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ name, onAdd, showAdd, logState }) => {
  const location = useLocation();

  return (
    <header className="header">
      {logState && <h1 className="title">Welcome {name}!</h1>}
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "rgba(255, 0, 0, 0.9)" : "rgba(0,181,0,1)"}
          text={showAdd ? "Close" : "Add Task"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

export default Header;
