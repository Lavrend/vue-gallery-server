import moment from 'moment';
import format from '@/config/dateFormat';

export default (req, res, next) => {
  console.log(`${moment().format(format.DATE_FULL)}: (${req.method}) ${req.originalUrl }`);

  next();
};
