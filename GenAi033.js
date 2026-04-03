import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const History = [];

const availableTools = {
  sum,
  prime,
  getCryptoPrice
};

function sum({ num1, num2 }) {
  return num1 + num2;
}

function prime({ num }) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

async function getCryptoPrice({ coin }) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
  );
  const data = await response.json();
  return data;
}

const sumDeclaration = {
  name: "sum",
  description: "get the sum of two numbers",
  parameters: {
    type: "OBJECT",
    properties: {
      num1: {
        type: "NUMBER",
        description: "it will be the first number for addition ex: 10"
      },
      num2: {
        type: "NUMBER",
        description: "it will be the second number for addition ex: 10"
      }
    },
    required: ["num1", "num2"]
  }
};

const primeDeclaration = {
  name: "prime",
  description: "tells if a number is prime or not",
  parameters: {
    type: "OBJECT",
    properties: {
      num: {
        type: "NUMBER",
        description: "this number will be checked if it is a prime number or not ex: 3"
      }
    },
    required: ["num"]
  }
};

const cryptoDeclaration = {
  name: "getCryptoPrice",
  description: "it will get the price of crypto currency",
  parameters: {
    type: "OBJECT",
    properties: {
      coin: {
        type: "STRING",
        description: "it will be the name of the crypto currency ex: bitcoin"
      }
    },
    required: ["coin"]
  }
};

async function runAgent(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }]
  });

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: {
        tools: [
          {
            functionDeclarations: [
              sumDeclaration,
              cryptoDeclaration,
              primeDeclaration
            ]
          }
        ]
      }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const { name, args } = response.functionCalls[0];

      const funCall = availableTools[name];

      if (!funCall) {
        console.log(`No function found with name: ${name}`);
        break;
      }

      const result = await funCall(args);

      History.push({
        role: "model",
        parts: [
          {
            functionCall: response.functionCalls[0]
          }
        ]
      });

      History.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: name,
              response: {
                result: result
              }
            }
          }
        ]
      });
    } else {
      History.push({
        role: "model",
        parts: [{ text: response.text }]
      });

      console.log("\nAnswer:", response.text);
      break;
    }
  }
}

async function main() {
  while (true) {
    const userProblem = readlineSync.question("\nAsk Me Your Queries --> ");

    if (userProblem.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    await runAgent(userProblem);
  }
}

main().catch(console.error);