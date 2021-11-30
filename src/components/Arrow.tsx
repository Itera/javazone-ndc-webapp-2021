import { ReactComponent } from "../statics/svgs/Arrow.svg";

interface Props {
  readonly color?: string;
}

export function Arrow(props: Props) {
  const { color = "#fff" } = props;
  return (
    <ReactComponent
      stroke={color}
      fill={color}
      width="80px"
      style={{ marginRight: "2rem" }}
    />
  );
}
