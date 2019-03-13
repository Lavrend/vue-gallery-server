export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

export const routeNotFound = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found...',
  });
};
