import mongoose from "mongoose";

const HoursSchema = mongoose.Schema({
    // RDVID: {
    //     type: String,
    //     required: true
    // },
    heure: { 
        type: String,
        // enum: ['08:00', '08:20', '08:40', '09:10', '09:30', '09:50', '10:10', '10:30', '10:50', '11:10', '11:30', '11:50', '12:10', '12:40'], 
        required: true
    },
    disponible: { 
        type: Boolean, 
        default: true 
    },
});

const Hours = mongoose.model("Hours", HoursSchema);
export default Hours;