use bson::{doc, Document};
use mongodb::results::{DeleteResult, UpdateResult, InsertOneResult};
use mongodb::{error::Error, Collection};
use serde::{Deserialize, Serialize};

extern crate serde;
extern crate serde_json;

#[derive(Debug, Serialize, Deserialize)]
pub struct Data {
    pub Game_id: i32,
    pub Players: i32,
    pub Game_name: String,
    pub Winner: String,
    pub Queue: String,
}

#[derive(Clone)]
pub struct ApiService {
    collection: Collection,
}

fn data_to_document(data: &Data) -> Document {
    let Data {
        Game_id,
        Players,
        Game_name,
        Winner,
        Queue,
    } = data;

    doc! {
        "Game_id": Game_id,
        "Players": Players,
        "Game_name":Game_name,
        "Winner": Winner,
        "Queue": Queue,
    }
}

impl ApiService {    
    pub fn new(collection: Collection) -> ApiService {
        ApiService { collection }
    }

    pub fn get_json(&self) -> std::result::Result<std::vec::Vec<bson::ordered::OrderedDocument>, mongodb::error::Error> {
        let cursor = self.collection.find(None, None).ok().expect("Failed to Execute Find");
        let docs: Vec<_> = cursor.map(|doc| doc.unwrap()).collect();
        Ok(docs)
    }
}

