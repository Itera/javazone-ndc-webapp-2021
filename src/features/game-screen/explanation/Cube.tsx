interface Props {
  readonly src: string;
  readonly letter: string;
}

export function Cube(props: Props) {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={props.src}
        alt=""
        style={{
          height: 300,
          width: 300,
        }}
      />
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "0.25rem",
          fontSize: "15rem",
          marginTop: "-9rem",
          marginBottom: "4rem",
          marginLeft: "-3.25rem",
          zIndex: 2,
        }}
      >
        {props.letter ? props.letter : <span style={{ color: "#fff" }}>H</span>}
      </span>
    </div>
  );
}
