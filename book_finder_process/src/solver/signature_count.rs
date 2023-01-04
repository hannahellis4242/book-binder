pub struct SignatureCount {
    pub pages: u64,
    pub count: u64,
}

use std::fmt;
impl fmt::Display for SignatureCount {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}:{}", self.pages, self.count)
    }
}
