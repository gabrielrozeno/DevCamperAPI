// @desc    Busca Todos os Bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = (req, res, next) => {
  res.json({ success: true, msg: "Busca todos os bootcamps" });
};

// @desc    Busca os Bootcamps Por ID
// @route   GET /api/v1/bootcamps/:id
// @access  PUBLIC
exports.getBootcampById = (req, res, next) => {
  res.json({ success: true, msg: `Busca bootcamp por ID: ${req.params.id}` });
};

// @desc    Cria um Bootcamp
// @route   POST /api/v1/bootcamps
// @access  PRIVATE
exports.createBootcamp = (req, res, next) => {
  res.json({ success: true, msg: "Cria um bootcamp" });
};

// @desc    Atualiza um Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE
exports.updateBootcamp = (req, res, next) => {
  res.json({
    success: true,
    msg: `Atualiza bootcamp pelo ID: ${req.params.id}`,
  });
};

// @desc    Deleta um Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE
exports.deleteBootcamp = (req, res, next) => {
  res.json({ success: true, msg: `Deleta bootcamp pelo ID ${req.params.id}` });
};
