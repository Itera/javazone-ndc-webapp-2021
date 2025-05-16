import LogoSvg from "../statics/svgs/Logo.svg?react";

export function Logo() {
  return (
    <LogoSvg
      style={{ position: "fixed", top: "2rem", left: "1rem" }}
      width="10rem"
      height="20px"
    />
  );
}
