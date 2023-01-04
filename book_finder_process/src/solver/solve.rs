use super::{book::Book, problem::Problem, signature_count::SignatureCount};

type Books = Vec<Book>;

type Point = Vec<u64>;

fn number_of_pages(allowed: &[u64], point: &Point) -> u64 {
    4 * allowed.iter().zip(point).map(|(x, y)| x * y).sum::<u64>()
}

fn convert_point_to_book(allowed: &[u64], point: &Point) -> Book {
    let pages = number_of_pages(allowed, point);
    Book::new(
        allowed
            .iter()
            .zip(point)
            .filter(|(_, y)| **y != 0_u64)
            .map(|(x, y)| SignatureCount {
                pages: *x,
                count: *y,
            })
            .collect::<Vec<_>>(),
        pages,
    )
}

fn allowed(p: &Problem, point: &Point) -> bool {
    let pages = number_of_pages(&p.allowed_signature_sizes, &point);
    pages >= p.target && pages <= p.maximum
}

fn maximums(p: &Problem) -> Vec<u64> {
    p.allowed_signature_sizes
        .iter()
        .map(|&x| (p.maximum as f64) / (4.0 * (x as f64)))
        .map(|x| x.ceil())
        .map(|x| x as u64)
        .collect::<Vec<u64>>()
}

pub fn solve(p: &Problem) -> Books {
    use itertools::Itertools;
    maximums(&p)
        .iter()
        .map(|&x| (0..x + 1).collect::<Vec<_>>())
        .multi_cartesian_product()
        .filter(|point| allowed(p, point))
        .map(|point| convert_point_to_book(&p.allowed_signature_sizes, &point))
        .sorted_by(|a, b| a.pages.cmp(&b.pages))
        .collect::<Vec<Book>>()
}
