export const ErrorHandler = (errorMessage: string) => {
  return Response.json({
    statusCode: 1,
    error: errorMessage,
  });
};
