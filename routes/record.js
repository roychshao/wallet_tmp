import express from "express";
import auth from "../middleware/auth.js";
import { insert_record_response, update_record_response, delete_record_response } from '../middleware/record.js';
import { get_record,insert_record,update_record,delete_record } from "../controllers/record.js";
import { get_record_check,create_record_check,update_record_check,delete_record_check } from "../object/record.js";
import { checkStrEmpty } from "../common/type_check.js";

const router = express.Router();

router.get("/",[auth,get_record_check], get_record);
router.post("/create",[auth,create_record_check], insert_record, insert_record_response);
router.post("/edit",[auth,update_record_check], update_record, update_record_response);
router.post("/delete",[auth,delete_record_check], delete_record, delete_record_response);

export default router;
