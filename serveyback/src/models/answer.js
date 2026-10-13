import mongoose from "mongoose";

const { Schema } = mongoose

const AnswerSchema = new Schema({
    body: mongoose.Schema.Types.Mixed,
    date: {
        type: Date,
        default: Date.now
    }
})

const Answer = mongoose.model('Answer', AnswerSchema)
export default Answer