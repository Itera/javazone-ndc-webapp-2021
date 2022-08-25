import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Path } from '../routes';
import PriceImage from '../statics/images/Sonos.png';

export function Profile() {
  return (
    <div
      style={{
        padding: '2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Logo />
      <h1
        style={{
          fontSize: '5.25rem',
          lineHeight: '5rem',
          color: 'rgb(0, 41, 255)',
        }}
      >
        Your score is registered!
      </h1>
      <p
        style={{
          fontSize: '1.75rem',
          lineHeight: '3rem',
        }}
      >
        We will contact the winner after the conference.
      </p>
      <img
        src={PriceImage}
        style={{ width: '100%', maxWidth: '1000px' }}
        alt=""
      />
      <Link
        to={Path.UNREGISTERED}
        className="button"
        style={{ width: 'fit-content' }}
      >
        Back to the list
      </Link>
    </div>
  );
}
