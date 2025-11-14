import mongoose from "mongoose";

//1 - create a schema
//2 - create a model based on the schema

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{ timestamps: true } //createdAt and updatedAt
    );

//2 - create a model based on the schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
