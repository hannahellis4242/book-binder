use super::signature_count::SignatureCount;
pub struct Book {
    pub signatures: Vec<SignatureCount>,
    pub pages: u64,
}
impl Book {
    /// Creates a new [`Book`].
    pub fn new(signatures: Vec<SignatureCount>, pages: u64) -> Self {
        Self { signatures, pages }
    }
}
use std::fmt;
impl fmt::Display for Book {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{{\"signatures\":\"{}\",\"pages\":{}}}",
            self.signatures
                .iter()
                .map(|x| format!("{}", x))
                .reduce(|acc, x| format!("{},{}", acc, x))
                .unwrap_or(String::new()),
            self.pages
        )
    }
}
