import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';


const ai = new GoogleGenAI({
  apiKey: ""
});



  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
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