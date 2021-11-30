import { useState } from "react";
import {
  Explanation,
  UserNickname,
} from "../../features/game-screen/explanation";

export function UserRegistration() {
  const [username, setUsername] = useState("");

  return (
    <div
      className="row fill-screen equal-width"
      style={{ padding: "4rem 8rem" }}
    >
      <Explanation username={username} />
      <UserNickname
        username={username}
        onChange={(value) => setUsername(() => value)}
      />
    </div>
  );
}
