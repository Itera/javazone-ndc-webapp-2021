import { ReactComponent } from "../statics/svgs/Logo.svg";

export function Logo() {
  return (
    <ReactComponent
      style={{ position: "fixed", top: "2rem", left: "1rem" }}
      width="10rem"
      height="20px"
    />
  );
}
