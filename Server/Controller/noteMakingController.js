import userSchema from "../Model/userModel.js";
import noteSchema from "../Model/notesModel.js";

/**************************** User Add Notes *************************************/
const userAddNotes = async (req, res) => {
  try {
    const { title, summary, file, content, image, userId } = req.body;

    const user = await userSchema.findById(userId);
    if (user) {
      const newNote = await noteSchema({
        title,
        summary,
        files: file,
        content,
        image,
        author: userId,
      });

      newNote.save();

      if (newNote) {
        res.status(200).json({
          newNote,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User get Notes *************************************/

const userGetNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.find({ author: id });

    if (notesFind) {
      res.status(200).json({ notesFind });
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User get edit Notes *************************************/

const userGetEditNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.find({ _id: id });

    if (notesFind) {
      res.status(200).json({ notesFind });
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Update Notes *************************************/

const userUpdateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content } = req.body;

    const notesFind = await noteSchema.findById(id);

    if (notesFind) {
      await noteSchema.findByIdAndUpdate(id, {
        title,
        summary,

        content,
      });

      const updatedNote = await noteSchema.findById(id);

      res.status(200).json({ updatedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Delete Notes *************************************/
const userDeleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.find({ _id: id });

    if (notesFind) {
      await noteSchema.findByIdAndDelete(id);

      res.status(200).json("note deleted successfully");
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Search  *************************************/

const handleSearch = async (req, res, next) => {
  const { searchItem } = req.body;

  try {
    const results = await noteSchema.find({ $text: { $search: searchItem } });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

/**************************** User tag Notes *************************************/

const usertagNote = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.findById(id);

    if (notesFind) {
      const updatedNote = await noteSchema.findByIdAndUpdate(
        id,
        { tagged: true },
        { new: true }
      );

      res.status(200).json({ updatedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Untag Notes *************************************/

const userUntagNote = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.findById(id);

    if (notesFind) {
      await noteSchema.findByIdAndUpdate(
        id,
        {
          tagged: false,
        },
        {
          new: true,
        }
      );

      const updatedNote = await noteSchema.findById(id);

      res.status(200).json({ updatedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User get Tagged Notes Page *************************************/

const userTaggedNotesPage = async (req, res) => {
  try {
    const { id } = req.params;

    const notesFind = await noteSchema.find({ author: id, tagged: true });
   
    if (notesFind) {
      res.status(200).json({ notesFind });
    } else {
      res.status(500).json({ message: "no notes to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  userAddNotes,
  userGetNotes,
  handleSearch,
  userUpdateNotes,
  userDeleteNotes,
  usertagNote,
  userUntagNote,
  userGetEditNotes,
  userTaggedNotesPage,
};
