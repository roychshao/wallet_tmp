import db_caller from "../db_interact/db_caller.js";

export const get_record = async (req, res) => {
    await db_caller.call_record(/*req.body.record_id*/"record_12816023-2d25-4b47-9e51-7bc36050f0c1")
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得record資料失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const insert_record = async (req, res) => {
    await db_caller.Insert_record("wallet_11f0c4ed-edef-436d-9b67-46812cdc1d08","tag_dc38b659-29e5-468e-918d-e675811379c7",0,"測試紀錄","測試用紀錄",100,"支出","2022-05-13 02:30:46"/*req.body.record_wallet_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date*/)
        .then(result => {
            var response = {
                "success": true,
                "message": "創建record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "創建record失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const update_record = async (req, res) => { 
    await db_caller.Update_record("record_cfa5c052-5c59-442a-a2c0-b6cb27707f8f","tag_2a5e01a9-147f-4b2c-ae47-20cae339e01b",1,"新紀錄","更新後的紀錄",200,"收入","2022-01-01 02:25:46"/*req.body.record_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date*/) 
        .then(result => {
            var response = {
                "success": true,
                "message": "更新record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "更新record失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const delete_record = async (req, res) => {
    await db_caller.Delete_record(req.body.record_id, req.body.record_wallet_id, req.body.record_amount) 
        .then(result => {
            var response = {
                "success": true,
                "message": "刪除record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除record失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};
