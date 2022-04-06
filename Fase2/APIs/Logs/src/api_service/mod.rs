use bson::{doc, Document};
use mongodb::{Collection};
use serde::{Deserialize, Serialize};

extern crate serde;
extern crate serde_json;



#[derive(Clone)]
pub struct ApiService {
    collection: Collection<Data>,
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
    pub fn new(collection: Collection<Data>) -> ApiService {
        ApiService { collection }
    }

    pub fn get_json(&self) -> std::result::Result<std::vec::Vec<bson::ordered::OrderedDocument>, mongodb::error::Error> {
        let cursor = self.collection.find(None, None);
        let docs: Vec<_> = cursor.map(|doc| doc.unwrap()).collect();
        
        Ok(docs)
    }
}

