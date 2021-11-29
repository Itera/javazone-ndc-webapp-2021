/* import { Link } from 'react-router-dom';
import { Path } from '../routes'; */
import { Timer } from '../features/timer/Timer';/* 
import { useUser } from '../hooks/useUser'; */

export function Profile() {
  //const user = useUser();
  const username = "RAG"

  /* if (user === null) {
    return <Link to={Path.REGISTRATION} replace >blank</Link>;
  } */

  return (
    <>
      <h1>Hello there {username}</h1>
      <Timer username={username} />
    </>
  );
}
