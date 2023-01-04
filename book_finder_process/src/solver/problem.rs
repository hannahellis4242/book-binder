pub struct Problem {
    pub target: u64,
    pub maximum: u64,
    pub allowed_signature_sizes: Vec<u64>,
}

impl Problem {
    pub fn new(target: u64, maximum: u64, allowed: &[u64]) -> Option<Self> {
        use itertools::Itertools;
        if maximum < target {
            None
        } else {
            let allowed_sizes = allowed.iter().unique().cloned().collect::<Vec<_>>();
            Some(Problem {
                target: target,
                maximum: maximum,
                allowed_signature_sizes: allowed_sizes,
            })
        }
    }
}

use std::fmt;
impl fmt::Display for Problem {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{{ \"target\":{},\"maximum\":{},\"allowedSignatureSizes\":{:?} }}",
            self.target, self.maximum, self.allowed_signature_sizes
        )
    }
}
