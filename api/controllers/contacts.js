import { ObjectID } from "bson";
import { errorHandler, fakeContacts } from "../utils";
import { Contact } from "../models";

const getContacts = async (req, res) => {

    const contacts = await Contact.find({});

    res.format({
        json: () => res.json(contacts),
        text: () => {
            const contactAsText = [...contacts.values()]
                .map(contact => Object.entries(contact).map(t => t.join(":")))
                .join("\n\n ==========================>>    ");
            res.send(contactAsText);
        },

        html: () => {
            const html = [
                `<table style="border: 1px solid black;">`,
                `<th style="border: 1px solid black; background:red;">Contact ID</th>
            <th style="border: 1px solid black; background:black; color:white;">Contact Data</th>
            `
            ];

            [...contacts].forEach(([id, contact]) => {
                html.push(`
                <tr style="border: 1px solid black;">
                <td style="border: 1px solid black; background:yellow;">${id}</td>
                <td style="border: 1px solid black;">${Object.entries(contact)
                        .map(([key, value]) => {
                            return `<p><b>${key}</b>: ${JSON.stringify(value).replace(
                                /"/g,
                                ""
                            )}</p>`;
                        })
                        .join("\n")}</td>
                </tr>
              `);
            });

            res.send(html.join("\n"));
        }
    });
};

const getContact = async (req, res, next) => {

    const contactId = req.params.id;
    contactId || next(errorHandler("Please enter a contact ID", 422));

    const contact = await Contact.findOne({
        _id: new ObjectID(contactId)
    });
    res.json(contact);
};

const postContact = async (req, res, next) => {

    const contact = req.body;
    (contact && contact.primaryContactNumber) ||
        next(errorHandler("Please submit valid contact", 422));
    const newContact = new Contact({ ...contact });
    await newContact.save();
    // result.insertedCount === 1
    //   // ? res.json({ message: "Contact created" })
    //     : next(errorHandler("No data inserted"));
};

const putContact = async (req, res, next) => {

    const contactId = req.params.id;
    const contact = req.body;

    contactId || next(errorHandler("Please enter a contact ID", 422));
    (contact && contact.primaryContactNumber) || next(errorHandler("Please submit valid contact", 422));
    const result = await Contact.updateOne(
        { _id: new ObjectID(contactId) },
        { $set: contact }
    );
    result.insertedCount === 1
        ? res.json({ message: "Contact created" })
        : next(errorHandler("No data inserted"));
};

const deleteContact = async (req, res, next) => {

    const contactId = req.params.id;
    contactId || next(errorHandler("Please enter a contact ID", 422));

    const result = await Contact.deleteOne({
        _id: new ObjectID(contactId)
    });

    result.deletedCount === 1
        ? res.json({ message: "Contact deleted" })
        : next(errorHandler("No data deleted"));

};

const deleteAllContact = async (req, res) => {
    await Contact.deleteMany({});

    res.json({ message: "All contacts deleted" });
};

const postContactMany = async (req, res) => {
    await Contact.insertMany([...fakeContacts.values()]);
    res.json({ message: "Many contacts generated" });
};

export { getContacts, getContact, postContact, postContactMany, putContact, deleteContact, deleteAllContact };