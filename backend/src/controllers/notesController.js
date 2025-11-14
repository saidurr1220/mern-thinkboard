import Note from "../../models/Note.js";

export async function getAllNotes (_, res){
  try{
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error );
    res.status(500).json({ message: "Internal server error" });  
  }
}

export async function getNoteById (req, res){
  try{
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote (req, res){
  try {
    const {title, content} = req.body;
    const note = new Note({title, content});
    const savedNote = await note.save();
    res.status(201).json({message: "Note created successfully", note: savedNote});
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error" });   
  }
}
export async function updateNote (req, res){
  try{
    const {title, content} = req.body;
    
    if(!updateNote) return res.status(404).json({message: "Note not found"});
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {title, content},
      {new: true}
    );
    res.status(200).json({message: "Note updated successfully", note: updatedNote});
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Note not found with id: " + req.params.id});
  }
}   
export async function deleteNote (req, res){
  try{
    const deletNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletNote) return res.status(404).json({message: "Note not found"});
    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });  
  }
}