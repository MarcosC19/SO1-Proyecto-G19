use std::borrow::Borrow;
use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use mongodb::{bson::doc, bson::Document, options::FindOptions};
use mongodb::sync::{Client, Collection, Cursor};
use serde::{Deserialize, Serialize};
use std::env;
use std::error::Error;
use actix_web::http::StatusCode;
use actix_web::web::Json;
use futures::stream::TryStreamExt;
use futures::{SinkExt, StreamExt};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Log {
    pub Game_id: i32,
    pub Players: i32,
    pub Game_name: String,
    pub Winner: String,
    pub Queue: String,
}

fn data_to_document(log: &Log) -> Document {
    let Log {
        Game_id,
        Players,
        Game_name,
        Winner,
        Queue,
    } = log;

    return doc! (
        "Game_id": Game_id,
        "Players": Players,
        "Game_name":Game_name,
        "Winner": Winner,
        "Queue": Queue,
    );
}

fn connect() -> Result<mongodb::sync::Client,mongodb::error::Error> {
    let MongoHost = std::env::var("MONGO_HOST").unwrap();
    let MongoUser = std::env::var("MONGO_USER").unwrap();
    let MongoPass = std::env::var("MONGO_PASS").unwrap();
    let ConnString = format!("mongodb://{}:{}@{}:27017/",MongoUser,MongoPass,MongoHost);

    let client = Client::with_uri_str(ConnString)?;
    return Ok(client);
}

fn results(collection: &Collection<Log>) -> Result<Cursor<Log>,mongodb::error::Error> {
    let cursor = collection.find(None, None)?;
    return Ok(cursor);
}

fn insertOne(collection: &Collection<Log>, log:Log) -> Result<String, mongodb::error::Error> {
    let new_id = collection.insert_one(log, None)?;
    return Ok(new_id.inserted_id.to_string());
}

#[get("/getLogs/")]
async fn get_logs() -> impl Responder {
    let MongoDb = std::env::var("MONGO_DB").unwrap();
    let MongoCollection = std::env::var("MONGO_COLLECTION").unwrap();

    let client = connect().unwrap();
    let db = client.database(&MongoDb);
    let collection = db.collection::<Log>(&MongoCollection);
    let cursor = results(&collection).unwrap();
    let mut results: Vec<Log> = Vec::new();
    for value in cursor {
        results.push(value.unwrap());
    }

    return HttpResponse::Ok().json(results);
}

fn set_default_env_var(key: &str, value: &str) {
    if std::env::var(key).is_err() {
        std::env::set_var(key, value);
    }
}

#[actix_web::main]
async fn main() -> Result<(),std::io::Error>  {
    // Set default Env variables
    set_default_env_var("MONGO_HOST","Localhost");
    set_default_env_var("MONGO_USER","root");
    set_default_env_var("MONGO_PASS","Keyuser95");
    set_default_env_var("MONGO_DB","SOPES");
    set_default_env_var("MONGO_COLLECTION","Logs");

    // Iniciar env
    dotenv().ok();
    
    env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_methods(vec!["GET","POST"])
            .allowed_header(http::header::CONTENT_TYPE);

        App::new()
            .wrap(cors)
            .service(get_logs)
    })
    .bind(("0.0.0.0",5000))?
    .run()
    .await
}
