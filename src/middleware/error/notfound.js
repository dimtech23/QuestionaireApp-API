const notFoundHandler = (req, res) => {
    res.status(404).json({
      error: {
        name: 'Not Found',
        message: 'The resource you are looking for is not found.',
        statusCode: 404,
      },
    });
  };
  
  export default notFoundHandler;
  