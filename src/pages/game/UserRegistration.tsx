import { useState } from "react";
import {
  Explanation,
  UserNickname,
} from "../../features/game-screen/explanation";

export function UserRegistration() {
  const [username, setUsername] = useState("");

  return (
    <div className="row fill-screen equal-width">
      <Explanation username={username} />
      <UserNickname
        username={username}
        onChange={(value) => setUsername(() => value)}
      />
    </div>
  );
}
