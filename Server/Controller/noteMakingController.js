import userSchema from '../Model/userModel.js'
import noteSchema from '../Model/notesModel.js'

/**************************** User Add Notes *************************************/
const userAddNotes= async (req,res)=>{
    
    try {
        
        
       const {title,summary,photo,file,content,image,userId}=req.body
       const user= await userSchema.findById(userId)
       if(user){
        const newNote = await noteSchema.create({
            title,
           summary,
           photo,
           file,
           content,
           image,
           author:userId
          });
         
          

          if(newNote){
            res.status(200).json({
                newNote
            })
          }
       }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/**************************** User get Notes *************************************/

const userGetNotes= async (req,res)=>{
    try {
        const {id}= req.params
      
        const notesFind= await noteSchema.find({author:id})
      
        if(notesFind){
            res.status(200).json({notesFind})
        }else{
            res.status(500).json({message:"no notes to display"})
        }
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/**************************** User Update Notes *************************************/

/**************************** User Delete Notes *************************************/

export {userAddNotes,userGetNotes}