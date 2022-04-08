use actix_cors::Cors;
use actix_web::{get, http, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use mongodb::{bson::doc};
use mongodb::sync::{Client, Collection, Cursor};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Log {
    pub game_id: i32,
    pub players: i32,
    pub game_name: String,
    pub winner: i32,
    pub queue: String,
}

fn connect() -> Result<mongodb::sync::Client,mongodb::error::Error> {
    let mongo_host = std::env::var("MONGO_HOST").unwrap();
    let mongo_user = std::env::var("MONGO_USER").unwrap();
    let mongo_pass = std::env::var("MONGO_PASS").unwrap();
    let conn_string = format!("mongodb://{}:{}@{}:27017/",mongo_user,mongo_pass,mongo_host);
    println!("Connection String: {}",conn_string);
    let client = Client::with_uri_str(conn_string)?;
    return Ok(client);
}

fn results(collection: &Collection<Log>) -> Result<Cursor<Log>,mongodb::error::Error> {
    let cursor = collection.find(None, None)?;
    return Ok(cursor);
}


#[get("/getLogs/")]
async fn get_logs() -> impl Responder {
    let mongo_db = std::env::var("MONGO_DB").unwrap();
    let mongo_collection = std::env::var("MONGO_COLLECTION").unwrap();

    let client = connect().unwrap();
    let db = client.database(&mongo_db);
    let collection = db.collection::<Log>(&mongo_collection);
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
    // Iniciar env
    dotenv().ok();

    // Set default Env variables
    set_default_env_var("MONGO_HOST","34.122.108.75");
    set_default_env_var("MONGO_USER","admingrupo19");
    set_default_env_var("MONGO_PASS","so1-fase2");
    set_default_env_var("MONGO_DB","so-proyecto-f2");
    set_default_env_var("MONGO_COLLECTION","logs");
    set_default_env_var("PORT","8080");

    let port = std::env::var("PORT").unwrap();
    let iport:u16 = port.parse().unwrap();
    
    env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

    HttpServer::new(|| {
        let cors = Cors::permissive()
            .allowed_methods(vec!["GET","POST"])
            .allowed_header(http::header::CONTENT_TYPE);

        App::new()
            .wrap(cors)
            .service(get_logs)
    })
    .bind(("0.0.0.0",iport))?
    .run()
    .await
}
