
const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsModel");
const PositionsModel = new model("position", PositionsSchema);
module.exports = { PositionsModel }; 

