const { model } = require("mongoose");
const { MeetingSchema } = require("../schemas/MeetingSchema");

const MeetingModel = new model("meeting", MeetingSchema);

module.exports = { MeetingModel };
