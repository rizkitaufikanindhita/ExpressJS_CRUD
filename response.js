const response = (statusCode, data, pesan, res) => {
  res.status(statusCode).json({
    payload: data,
    status: statusCode,
    message: pesan,
    metadata: {
      prev: "",
      next: "",
      current: "",
    },
  });
};

module.exports = response;
