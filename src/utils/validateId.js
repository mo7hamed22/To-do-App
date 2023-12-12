const mongoose = require("mongoose");

function ValidateId(id) {
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
}
module.exports = {
  ValidateId,
};
