import { Link } from 'react-router-dom';
import { useUnregistered } from '../../hooks/useUnregistered';
import { Path } from '../../routes';

export function Unregistered() {
    const [unregisteredList] = useUnregistered();
    console.log("unregisteredList: ",unregisteredList);

    return (
        <table>
          <tbody>
            {unregisteredList.map((entry) => (
              <tr key={entry.start}>
                <td><Link to={`${Path.REGISTRATION}=${entry.uid}`} state={{uid:entry.uid, elapsed:entry.elapsed}}>{entry.username}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}