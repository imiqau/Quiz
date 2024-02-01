import inquirer from "inquirer";
const apilink = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "Qname",
        message: "Write your name:"
    });
    for (let i = 1; i < 10; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
        }
    }
    console.log(`dear ${name.Qname}, your score is ${score} out of ${"10"}`);
};
startQuiz();
