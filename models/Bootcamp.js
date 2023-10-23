const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Adicione um nome no Bootcamp"],
    unique: true,
    trim: true,
    maxlength: [50, "Nome não pode ser maior que 50 carcteres"],
  },
  slug: String,
  descripition: {
    type: String,
    required: [true, "Adicione uma descrição no Bootcamp"],
    maxlength: [500, "Descrição não pode ser maior que 500 carcteres"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Por Favor, use uma URL válida com HTTP ou HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Número de telefone não pode ser maior que 20 caracteres"],
  },
  email: {
    type: String,
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Insira um email válido"],
  },
  address: {
    type: String,
    required: [true, "Por Favor, adicione um email"],
  },
  location: {
    // GeoJSON
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array de strings
    type: [String],
    required: true,
    enum: [
      "Desenolvimento Web",
      "Desenvolvimento Mobile",
      "UI/UX",
      "Data Science",
      "Business",
      "Outro",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Nota deve ser pelo menos 1"],
    max: [10, "Nota não pode ser maior que 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpeg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistence: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// A Fazer: adicionar campo de usuário

module.exports = mongoose.model("Bootcamp", BootcampSchema);