import readlineSync from 'readline-sync';
import { GoogleGenAI } from "@google/genai";


const History = [];

function sum (num1,num2){
    return num1 + num2;

}

function prime(num){

    if(num<2){
        return false ;

    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

async function getCryptoPrice(coin){
     const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`)
     const data = await response.json();

     return data;
}

// we need to decalre function to call them with LLMsm it contains info about the function

const sumDeclaration = {
    // name of the function
    name : "sum",
    // what does this function do, here we are explain this to LLMs
    description : "get the sum of two numbers ",
    
    // Here you are defining what inputs this function needs.
    parameter : {
        type : 'OBJECT',
        properties : {
            num1 : {
                type :  "NUMBER",
                description : "it will be the first number for addition ex: 10"
            },
            num2 : {
                type : "NUMBER ",
                description : "it will be the second number for addition ex: 10"
            }
        },
        required : ['num1', 'num2']

    }

}


async function runAgent(userProblem) {
    History.push({
        role : "user",
        parts : [{text : userProblem}]
    })

    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : History

    })

    
}

async function main(){
     
    const userProblem = readlineSync.question("Ask Me Your Queries -->    ")
    await runAgent(userProblem);
    main()

}

main()


