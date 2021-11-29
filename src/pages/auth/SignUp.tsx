import { useEffect, useState } from "react";

import { FirebaseError } from "@firebase/util";
import { Path } from "../../routes";
import { logEvent } from "firebase/analytics";
import { useAsync } from "../../hooks/useAsync";
import { useAuth } from "../../hooks/useAuth";
import { useFirebase } from "../../features/firebase/FirebaseProvider";
import { useLocation, useNavigate } from "react-router";
import { UnregisteredEntry } from "../../hooks/useUnregistered";

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const location = useLocation();
  const { uid, username } = location.state as UnregisteredEntry;

  const { addUser } = useAuth();
  const { callback, loading, error } = useAsync(addUser);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    callback(name, phone, email, consent, uid, username).then(() =>
      navigate(Path.USER, { replace: true })
    );
  }

  return (
    <>
      <h1>Registration {username}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="name"
          id="name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          required
        />
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          placeholder="11111111"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(event) => setConsent(event.currentTarget.checked)}
        />
        <label htmlFor="consent">
          Jeg tillater Itera å kontakte meg senere
        </label>
        <button type="submit" disabled={loading}>
          Register
        </button>
        {error !== null && <p>{(error as FirebaseError).code}</p>}
      </form>
    </>
  );
}
