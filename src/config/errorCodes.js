export default {
  // 4xx
  ROUTE_NOT_FOUND: {
    status: 404,
    message: 'Route not found',
    code: 'ROUTE_NOT_FOUND',
  },

  NOT_FOUND: {
    status: 404,
    message: 'Empty response, not found',
    code: 'NOT_FOUND',
  },
  // ------------------------------------

  // 5xx
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
  },

  UNKNOWN_ERROR: {
    status: 520,
    message: 'Unknown Error',
    code: 'UNKNOWN_ERROR',
  },
};
