use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, PasswordVerifier, Salt, SaltString},
    Argon2, PasswordHash,
};
use hex::ToHex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DerivKey {
    raw_hash: String,
    hash: String,
    salt: String,
}

#[wasm_bindgen]
impl DerivKey {
    pub fn new(raw_hash: String, hash: String, salt: String) -> Self {
        Self {
            raw_hash,
            hash,
            salt,
        }
    }

    pub fn get_raw_hash(&mut self) -> String {
        self.raw_hash.clone()
    }

    pub fn get_hash(&mut self) -> String {
        self.hash.clone()
    }

    pub fn get_salt(&mut self) -> String {
        self.salt.clone()
    }

    pub fn derive_key(input: &str, salt: Option<String>) -> Self {
        let rng_val = SaltString::generate(&mut OsRng);

        let salt = match &salt {
            Some(val) => Salt::from_b64(val.as_str()).expect("Failed creating salt"),
            None => rng_val.as_salt(),
        };

        let argon2 = Argon2::default();

        let raw_hash = argon2
            .hash_password(input.as_bytes(), salt)
            .expect("Invalid input key");

        let hash = raw_hash
            .hash
            .expect("Hash is not defined")
            .encode_hex_upper();

        let salt = raw_hash.salt.expect("Salt not provided").to_string();

        Self::new(raw_hash.to_string(), hash, salt)
    }

    pub fn verify_key(password: &str, password_hash: &str) -> bool {
        match PasswordHash::new(&password_hash) {
            Ok(hash) => Argon2::default()
                .verify_password(password.as_bytes(), &hash)
                .is_ok(),
            Err(e) => {
                println!("Failed while parsing hash!: {}", e);
                false
            }
        }
    }
}

#[test]
fn test_derive_key() {
    let password = "secretP44sw0rd";
    let mut derived_key = DerivKey::derive_key(&password, None);

    let raw_hash = derived_key.get_raw();
    assert!(DerivKey::verify_key(&password, &raw_hash));
}
