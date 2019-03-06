import moment from 'moment';
import format from '@/config/date_format';

export default (req, res, next) => {
  console.log(`${moment().format(format.DATE_FULL)}: (${req.method}) ${req.originalUrl }`);

  next();
};
