const Bootcamp = require("../models/Bootcamp");

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
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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
