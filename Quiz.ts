import chalk from "chalk";
import inquirer from "inquirer";

const apilink:string = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
    let fetchQuiz: any = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);

let startQuiz = async () => {
    let score: number = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "Qname",
        message: "Write your name:"
    });
    for(let i=1; i<10; i++){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer];

        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val: any) => val),
        });
        if(ans.quiz == data[i].correct_answer){
            ++score

        }
        
    }
    console.log(`dear ${name.Qname}, your score is ${score} out of ${"10"}`);

};
startQuiz()