import { errorHandler } from "../utils";
import { ObjectID } from "bson";
import { Contact } from "../models";

const getGroups = async (req, res) => {
    // use Set data structure to get array of unique values
    const contacts = await Contact.find();
    res.json([...new Set(contacts.flatMap(conntact => conntact.groups).filter(Boolean))]);

};
const getGroupsForContact = async (req, res, next) => {

    const contactId = req.params.contactId;
    contactId || next(errorHandler("Please enter a contact ID", 422));

    const contact = await Contact.findOne({
        _id: new ObjectID(contactId)
    });
    res.json(contact.groups);
};

export { getGroups, getGroupsForContact };