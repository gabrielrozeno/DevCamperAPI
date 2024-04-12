const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("express-async-handler");

// @desc    Busca Todos os Bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copia req.query
  const reqQuery = { ...req.query };

  // Campos para excluir
  const removeFields = ["select", "sort"];

  // Loop na array removeFields e deleta os campos indesejados da reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Cria a query string
  let queryStr = JSON.stringify(reqQuery);

  // Cria os operadores ($gt, $gte e etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Buscando o Recurso
  query = Bootcamp.find(JSON.parse(queryStr));

  // Se tiver select na req.query, então traga os campos descritos
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Filtrando por condição que vem no sort da req.query
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // Padrão: em ordem descendente pelo createdAt
    query = query.sort("-createdAt");
  }

  // Executando a query
  const bootcamps = await query;
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

// @desc    Buscar Bootcamps por Distância
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  PRIVATE
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Buscar Lat e Long no geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calcular distância usando radiano
  // Dividir Distância usando raio da terra
  // Raio da Terra: 6,378 km | 3,963 mi
  // Preferi o uso de milhas para explicar melhor para um gringo ¯\_(ツ)_/¯
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
