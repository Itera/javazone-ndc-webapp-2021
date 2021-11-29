interface Props {
  readonly src: string;
  readonly letter: string;
}

export function Cube(props: Props) {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={props.src}
        style={{
          height: 300,
          width: 300,
          marginRight: -125,
        }}
      />
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
          marginTop: "-9rem",
          marginRight: "-1rem",
          textDecoration: "underline",
          zIndex: 2,
        }}
      >
        {props.letter ? props.letter : "_"}
      </span>
    </div>
  );
}
