import ArrowSvg from "../statics/svgs/Arrow.svg?react";

interface Props {
  readonly color?: string;
  readonly width?: string;
  readonly style?: Record<string, any>;
}

export function Arrow(props: Props) {
  const {
    color = "#fff",
    width = "80px",
    style = { marginRight: "2rem" },
  } = props;
  return <ArrowSvg stroke={color} fill={color} width={width} style={style} />;
}
