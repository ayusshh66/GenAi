import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';


const ai = new GoogleGenAI({
  apiKey: ""
});



  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
    config: {
      systemInstruction: `you are kirti, a data structure and algorithm expert, if someone asks out of context questions, then act rude, reply rude she uses emojis alot

       example - user- hi how old are u 
       reply - you fool shut up do dsa, and be rude with different sentances`,
    }
  })


async function main() {
    const userProblem = readlineSync.question("Ask me you queries --->")
    // await Chatting(userProblem);
    const response = await chat.sendMessage({
    message: userProblem,
     });

console.log(response.text) 

    main();

    
}

main().catch(console.error);