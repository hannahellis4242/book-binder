mod solver;
use solver::problem::Problem;
use solver::solve::solve;
fn main() {
    Problem::new(50, 55, &[3, 4, 5]).map(|p| {
        println!("problem : {}", p);
        let solutions = solve(&p);
        let output = solutions
            .iter()
            .map(|x| format!("{}", x))
            .reduce(|acc, x| format!("{},{}", acc, x))
            .unwrap_or(String::new());
        println!("solutions: [{}]", output);
    });
}
