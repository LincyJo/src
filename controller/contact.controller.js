const contactService = require("../services/contact.services.js")


const createContactController = async(req,res)=>{
    let data = await contactService.createContact(req)
    res.send(data)
   }



 module.exports = {
    createContactController
} 