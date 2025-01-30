import mongoose from "mongoose";

const meterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "error"],
    required: true,
  },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now }, // Custom createdAt field
  updatedAt: { type: Date, default: Date.now }, // Custom updatedAt field
});

const Meter = mongoose.models.Meter || mongoose.model("Meter", meterSchema);

export default Meter;
