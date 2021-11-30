import { Keyboard } from "./Keyboard";
import { Cube } from "./Cube";

import cubeOne from "../../../statics/svgs/Kube1.svg";
import cubeTwo from "../../../statics/svgs/Kube2.svg";
import cubeThree from "../../../statics/svgs/Kube3.svg";

interface Props {
  readonly username: string;
  readonly onChange: (value: string) => void;
}

export function UserNickname(props: Props) {
  const { username, onChange } = props;

  return (
    <div className="column center-content" style={{ padding: "0 0 0 2rem" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Your nickname:</h2>
      <div className="row" style={{ marginBottom: "8rem" }}>
        <Cube src={cubeOne} letter={username.slice(0, 1)} />
        <Cube src={cubeTwo} letter={username.slice(1, 2)} />
        <Cube src={cubeThree} letter={username.slice(2, 3)} />
      </div>
      <Keyboard onChange={(value) => onChange(value)} />
    </div>
  );
}
