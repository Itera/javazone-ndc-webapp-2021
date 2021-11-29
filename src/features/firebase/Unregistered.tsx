import { Link } from 'react-router-dom';
import { useUnregistered } from '../../hooks/useUnregistered';
import { Path } from '../../routes';

export function Unregistered() {
    const [unregisteredList] = useUnregistered();

    return (
      <>
        <h1>Register your score!</h1>
        <p>Select your username to register a chance to win a Sonos One!</p>
        <ul>
          {unregisteredList.map((entry) => (
            <li key={entry.start}>
              <Link to={`${Path.REGISTRATION}=${entry.uid}`} state={{uid:entry.uid, elapsed:entry.elapsed, username:entry.username}}>{entry.username}</Link>
            </li>
          ))}
        </ul>
      </>
      );
}