import { errorHandler } from "../utils";
import { MongoDao } from "../config";
import { ObjectID } from "bson";

const getGroups = async (req, res) => {
    // use Set data structure to get array of unique values
    const contactsCollection = MongoDao.sharedDb.dbConnection.collection(
        "contacts"
    );
    const contacts = await contactsCollection.find({}).toArray();
    res.json([...new Set(contacts.flatMap(conntact => conntact.groups).filter(Boolean))]);

};
const getGroupsForContact = async (req, res, next) => {

    const contactsCollection = MongoDao.sharedDb.dbConnection.collection(
        "contacts"
    );
    const contactId = req.params.contactId;
    contactId || next(errorHandler("Please enter a contact ID", 422));

    const contact = await contactsCollection.findOne({
        _id: new ObjectID(contactId)
    });
    res.json(contact.groups);
};

export { getGroups, getGroupsForContact };