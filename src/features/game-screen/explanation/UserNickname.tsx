import { Keyboard } from "./Keyboard";
import { Cube } from "./Cube";

import cubeOne from "../../../statics/images/cube_yellow.png";
import cubeTwo from "../../../statics/images/cube_purple.png";
import cubeThree from "../../../statics/images/cube_red.png";

interface Props {
  readonly username: string;
  readonly onChange: (value: string) => void;
}

export function UserNickname(props: Props) {
  const { username, onChange } = props;

  return (
    <div className="column center-content" style={{ padding: "4rem 2rem" }}>
      <h2>Your nickname:</h2>
      <div className="row" style={{ marginBottom: "8rem" }}>
        <Cube src={cubeOne} letter={username.slice(0, 1)} />
        <Cube src={cubeTwo} letter={username.slice(1, 2)} />
        <Cube src={cubeThree} letter={username.slice(2, 3)} />
      </div>
      <Keyboard onChange={(value) => onChange(value)} />
    </div>
  );
}
