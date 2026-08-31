const {model} = require("mongoose");
const {HoldingsSchema} = require("../schemas/HoldingsSchems");

const HoldingsModel = model("Holdings", HoldingsSchema);

module.exports = {HoldingsModel};