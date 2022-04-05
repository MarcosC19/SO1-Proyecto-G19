use actix_cors::Cors;
use actix_web::{http, middleware, App, HttpServer};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use std::env;
use api_service::ApiService;

mod api_router;
mod api_service;

pub struct ServiceManager {
    api: ApiService,
}

impl ServiceManager {
    pub fn new(api: ApiService) -> Self {
        ServiceManager { api }
    }
}

pub struct AppState {
    service_manager: ServiceManager,
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // Iniciar env
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

    let MongoHost = env::var("MONGO_HOST").expect("MONGO HOST NOT SPECIFIED");
    let client_options = ClientOptions::parse(&MongoHost).unwrap();

    let client = Client::with_options(client_options).unwrap();

    let MongoDB = env::var("MONGO_DB").expect("MONGO DB NOT SPECIFIED");
    let Db = client.database(&MongoDB);

    let MongoCollection = env::var("MONGO_COLLECTION").expect("MONGO COLLECTION NOT SPECIFIED");
    let Collection = Db.collection(&MongoCollection);

    let LocalServer = env::var("LOCALIP").expect("NO LOCAL IP SPECIFIED");

    HttpServer::new(move || {
        let user_service_worker = ApiService::new(MongoCollection.clone());
        let service_manager = ServiceManager::new(user_service_worker);

        let cors_mw = Cors::new()
            .allowed_methods(vec!["GET","POST"])
            .allowed_header(http::header::CONTENT_TYPE)
            .finish();

        App::new()
            .wrap(cors_mw)
            .wrap(middleware::Logger::default())
            .data(AppState { service_manager })
            .configure(api_router::init)
    })
    .bind(LocalServer)?
    .run()
    .await
}
