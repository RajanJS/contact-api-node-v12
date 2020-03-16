import { Router } from "express";
import {
    getContacts,
    getContact,
    postContact,
    putContact,
    deleteContact,
    deleteAllContact,
    postContactMany
} from "../controllers";
import { AsyncWrapper } from "../utils/async-wrapper";

const router = Router();

// GET /contacts
router.get("/", AsyncWrapper(getContacts));

// GET /contacts/:id
router.get("/:id", AsyncWrapper(getContact));

// POST /contacts
router.post("/", AsyncWrapper(postContact));

// POST /contacts/many
router.post("/many", AsyncWrapper(postContactMany));

// PUT /contacts/:id
router.put("/:id", AsyncWrapper(putContact));

// DELETE /contacts/:id
router.delete("/:id", AsyncWrapper(deleteContact));

// DELETE /contacts
router.delete("/", AsyncWrapper(deleteAllContact));

export const contacts = {
    baseUrl: "/contacts",
    router
};

export const contacts_v2 = {
    baseUrl: "/v2/contacts",
    router
};