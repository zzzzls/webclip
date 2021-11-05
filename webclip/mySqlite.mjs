import sqlite3 from "sqlite3";

let DB = {
    NAME: 'webclip.db',
    err_catch: function err_catch(error) {
        if (error) {
            console.log('ERROE: ', error)
        }
    }
};

DB.SqliteDB = function () {
    DB.db = new sqlite3.Database(`./db/${DB.NAME}`)
    this.createTable();
}

DB.SqliteDB.prototype.createTable = function () {
    console.log("=== CREATE table");
    DB.db.serialize(function () {
        DB.db.run('CREATE TABLE IF NOT EXISTS webclip(\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            user VARCHAR(30) UNIQUE NOT NULL,\
            insert_ts INT(13) NOT NULL,\
            content TEXT\
        )', DB.err_catch)
    });
}


DB.SqliteDB.prototype.insert_and_update = function (user, content) {
    DB.db.serialize(function () {
        DB.db.get("SELECT * FROM webclip WHERE user=?", [user] ,(err, row) => {
            if(row){
                DB.db.run("UPDATE webclip SET insert_ts=?, content=? WHERE user=?", [new Date().getTime(), content, user], DB.err_catch)
            }else{
                DB.db.run("INSERT INTO webclip(user, insert_ts, content) values(?, ?, ?)", [user, new Date().getTime(), content], DB.err_catch)
            }
        })
    });
}

DB.SqliteDB.prototype.query = function (user, callback) {
    DB.db.serialize(function () {
        DB.db.get("SELECT * FROM webclip WHERE user=?", [user] ,(err, row) => {
            if(!err){
                callback(row);
            }
        })
    })
}

export let sqlite=DB.SqliteDB;
