import { useState } from "react";
import {
  Explanation,
  UserNickname,
} from "../../features/game-screen/explanation";

export function UserRegistration() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <h1 style={{ fontSize: 94, marginLeft: "4rem" }}>Build Itera with us!</h1>
      <div className="row fill-screen" style={{ padding: "0 8rem 4rem 4rem" }}>
        <Explanation username={username} />
        <UserNickname
          username={username}
          onChange={(value) => setUsername(() => value)}
        />
      </div>
    </div>
  );
}
