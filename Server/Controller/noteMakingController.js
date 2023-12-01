import userSchema from "../Model/userModel.js";
import noteSchema from "../Model/notesModel.js";

/**************************** User Add Notes *************************************/
const userAddNotes = async (req, res) => {
  try {
    const { title, summary, photo, file, content, image, userId } = req.body;
    const user = await userSchema.findById(userId);
    if (user) {
      const newNote = await noteSchema({
        title,
        summary,
        photo,
        file,
        content,
        image,
        author: userId,
      });

    

      newNote.save()

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


/**************************** User Update Notes *************************************/



/**************************** User Delete Notes *************************************/


/**************************** User Search  *************************************/

const handleSearch = async (req, res, next) => {
    const {searchItem} = req.body;
    
  try {
    const results = await noteSchema.find({$text: {$search: searchItem}});
   
    res.status(200).json({results});
   
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export { userAddNotes, userGetNotes, handleSearch };
