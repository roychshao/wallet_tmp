const db_dealer = require('./db_dealer.js')
const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000

// 問資料庫user是否存在
const authenticate = (id) => {
    return new Promise( async(resolve, reject) => {
        await db_dealer.user_exist(id)
            .then(results => {
                if(results.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch(err => {
                console.log("ERROR: " + err.message);
                reject(err);
            });
    });
}
const call_user_data = (user_id) => {
    return new Promise( async (resolve, reject) => {
        //await db_dealer.insert_user('google','1','roych.shao@gmail.com','Roy Shao','roy');
        //await db_dealer.delete_user('user_7417323a-a5f6-414a-b2e6-2c3d8d69f754');
        //await db_dealer.insert_wallet('user_7552f100-eba2-44e1-bc7f-7a1690fd4913', 0, 'wallet_1', 1000, 'my wallet','my own wallet');
        //await db_dealer.delete_wallet('3','wallet_0754c072-ebe3-407d-9eb9-0f19429a3559');
        //await db_dealer.insert_record('wallet_dacbbdb7-4e2b-47ed-ad42-da878ab81890','tag_402d95e2-2441-441b-95a1-7f98fa74ccc0',2,'test_record2','no description',300,'income','2022-04-06 23:00:00');
        //await db_dealer.insert_tag('wallet_4acf9f9f-215a-4fd6-af5c-01705ce4a50e',1,'tag_1','income');
        //await db_dealer.delete_record('record_0bc10593-1fb0-40ba-9067-d6e0907f9ec8','wallet_4acf9f9f-215a-4fd6-af5c-01705ce4a50e',1000);
        var user_status;
        var selected_wallet;
        var response = {};
        await db_dealer.get_user('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')    // 之後parse req得到要求的user id,just for testing
            .then(results => {
                if(results.length > 0)
                    user_status = "true";
                else
                    user_status = "false";
                // 確認被選擇的wallet, 而被選擇的wallet必須只有一個
                for(let i = 0; i < results.length; ++i) {
                    if(results[i].selected == 1) {
                        selected_wallet = results[i].wallet_id;
                        break;
                    }
                }
                // 將資料轉成需要的JSON格式
                var Data = {
                    success: user_status,
                    message:"Data of " + user_id + ".",
                    data:{
                        user_id: results[0].id,
                        username: results[0].username,
                        nickname: results[0].nickname,
                        selected_wallet_id: selected_wallet,
                        wallets:[
                        ]
                    }
                };

                // 填寫wallets陣列和wallets陣列中的records陣列
                for(let i = 0; i < results.length;) {
                    // construct a wallet object
                    var wallet_obj = {
                        wallet_id: results[i].wallet_id,
                        wallet_name: results[i].wallet_name,
                        wallet_total: results[i].wallet_total,
                        selected: results[i].selected,   // only true for now testing
                        records:[]
                    };
                    // construct a record array
                    var record_arr = [];
                    var j = 0;
                    if(results[i].selected == 1) {
                        for(j = 0; j < results[i].record_num; ++j) {
                            // 若已經沒有資料或已是不同wallet,則提早break
                            if(i + j >= results.length || results[i+j].wallet_id != results[i].wallet_id)
                                break;
                            var record_obj = {
                                record_id: results[i+j].record_id,
                                wallet_record_tag_id: results[i+j].wallet_record_tag_id,
                                record_ordinary: results[i+j].record_ordinary,
                                record_name: results[i+j].record_name,
                                record_description: results[i+j].record_description,  //
                                record_amount: results[i+j].record_amount,    //
                                record_type: results[i+j].record_type,    //
                                record_date: results[i+j].record_date,    //
                                record_created_time: results[i+j].record_created_time,
                                record_updated_time: results[i+j].record_updated_time
                            }
                            record_arr.push(record_obj);
                        }
                    }
                    if(j == 0) i++;
                    else
                        i += j;
                    // put record array into wallet object and put wallet object into response.data.wallets
                    wallet_obj.records = record_arr;
                    console.log(wallet_obj);
                    Data.data.wallets.push(wallet_obj);
                }
                console.log("Data is: ");
                console.log(Data);
                response = Data;
                resolve(response);

                //console.log(results);
                //resolve(results);
            }).catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
    });
}

const call_wallet = (wallet_id) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.get_wallet(wallet_id)
            .then(results => {
                var response = {
                    "success": true,
                    "message": "wallet data of " + wallet_id + ".",
                    "data": {
                        "wallet_id": results[0].wallet_id,
                        "wallet_name": results[0].wallet_name,
                        "wallet_title": results[0].wallet_title,
                        "wallet_total": results[0].wallet_total,
                        "wallet_description": results[0].wallet_description,
                        "records": []
                    }
                };
                for(var i = 0; i < results.length; ++i) {
                    var record_data = {
                        "record_id": results[i].record_id,
                        "wallet_record_tag_id": results[i].wallet_record_tag_id,
                        "record_ordinary": results[i].record_ordinary,
                        "record_name": results[i].record_name,
                        "record_description": results[i].record_description,
                        "record_amount": results[i].record_amount,
                        "record_type": results[i].record_type,
                        "record_date": results[i].record_date,
                        "record_created_time": results[i].record_created_time,
                        "record_updated_time": results[i].record_updated_time
                    }
                    //console.log(record_data);
                    response.data.records.push(record_data);
                }
                //console.log(results);
                //resolve(results);
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
    })
}

// 暫時先不做關閉資料庫的動作
exports.call_wallet = call_wallet;
exports.call_user_data = call_user_data;
exports.authenticate = authenticate;