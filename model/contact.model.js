const mongoose = require('mongoose')
const { v4 }  = require('uuid')
mongoose.pluralize(null)



const contactSchemaModel = new mongoose.Schema(
    {
        _id:{
            type:String,
            default: v4 
        },
        name:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
       
    },
    {
        timestamps: true,
    }
)

const  contactSchema = mongoose.model("Contact",contactSchemaModel)


module.exports={
    contactSchema,
    
}




