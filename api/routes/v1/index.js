import { Router } from "express";
import setContactsV1 from "./contactsV1";
import setGroupsV1 from "./groupsV1";

const router = Router();

setContactsV1(router);
setGroupsV1(router);

export const routerV1 = {
    baseUrl: "/api/v1",
    router
};