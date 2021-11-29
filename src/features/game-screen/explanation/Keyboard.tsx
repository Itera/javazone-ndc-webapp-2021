import { useState } from "react";
import SimpleKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface Props {
  onChange?: (value: string) => void;
}

export function Keyboard(props: Props) {
  const [value, setValue] = useState("");

  function onKeyPress(input: any) {
    let newValue = value;

    if (input === "{bksp}") {
      newValue = newValue.slice(0, -1);
    } else {
      newValue = value + input;
    }

    newValue = newValue.slice(0, 3);

    if (props.onChange) {
      props.onChange(newValue);
    }

    setValue(() => newValue);
  }

  return (
    <>
      <SimpleKeyboard
        onKeyPress={onKeyPress}
        layout={{
          default: [
            "Q W E R T Y U I O P Å",
            "A S D F G H J K L Ø Æ",
            "Z X C V B N M {bksp}",
          ],
        }}
        display={{
          "{bksp}": "←",
        }}
      />
    </>
  );
}
