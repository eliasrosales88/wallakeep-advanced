import Register from './Register';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';

export default compose(withSession)(Register);
