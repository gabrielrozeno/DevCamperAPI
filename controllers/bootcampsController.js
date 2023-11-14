const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("express-async-handler");

// @desc    Busca Todos os Bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Busca os Bootcamps Por ID
// @route   GET /api/v1/bootcamps/:id
// @access  PUBLIC
exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Nenhum Bootcamp Encontrado com o ID ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Cria um Bootcamp
// @route   POST /api/v1/bootcamps
// @access  PRIVATE
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Atualiza um Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Não Foi Possível Encontrar e Atualizar o Bootcamp ID ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Deleta um Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Não Foi Possível Encontrar e Deletar o Bootcamp ID ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});
