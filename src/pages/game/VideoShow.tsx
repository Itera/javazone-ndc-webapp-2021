import { Path } from '../../routes';
import bricks from '../../statics/images/bricks.png';
import standVideo from '../../statics/videos/StandVideo.mp4';
import { toTimeString } from '../../utils/toTimeString';
import { useEffect } from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { useNavigate } from 'react-router-dom';
import { useUnregistered } from '../../hooks/useUnregistered';

export function VideoShow() {
  const navigate = useNavigate();

  const leaderboard = useLeaderboard();
  const topThree = leaderboard.slice(0, 3);

  const { ongoing } = useUnregistered();

  useEffect(() => {
    if (ongoing.length === 0) {
      return;
    }

    navigate(Path.COUNTDOWN, {
      state: ongoing[0],
      replace: true,
    });
  }, [ongoing, navigate]);

  return (
    <div className="fill-screen bg-midnight" style={{ position: 'relative' }}>
      <div
        className="row fill-vw"
        style={{ justifyContent: 'flex-end', paddingTop: '10vh' }}
      >
        <section
          className="bg-ivory"
          style={{
            width: '33vw',
            padding: '2rem',
            clipPath:
              'polygon(0 0, 100% 0, 100% 100%, 35% 100%, 35% 65%, 0 65%)',
            marginTop: '-8vh',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>Build and win a Sonos One</span>
          <h1>Build Itera with us?</h1>
          <img
            src={bricks}
            style={{
              float: 'right',
              filter: 'grayscale(100%)',
              marginTop: '25vh',
              transform: 'scale(1.25)',
              marginRight: '3vw',
            }}
          />
        </section>
        <video
          autoPlay
          loop
          muted
          style={{ position: 'relative', width: '65vw' }}
        >
          <source src={standVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'flex-end',
        }}
      >
        {topThree.length > 0 && (
          <ol
            className="bg-ivory"
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            {topThree.map((entry, index) => (
              <li
                key={entry.start}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'Neue Machina',
                  fontWeight: '600',
                  fontSize: 32,
                }}
              >
                <span>{index + 1}.</span>
                <span>{entry.username}</span>
                <span>-</span>
                <span>{toTimeString(entry.start, entry.finish)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
