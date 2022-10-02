import { Link } from 'react-router-dom';
import { Paths } from '../Router';

function VideoIdlePage(): JSX.Element {
  return <Link to={Paths.SIGN_UP}>Play Game</Link>;
}

export default VideoIdlePage;
