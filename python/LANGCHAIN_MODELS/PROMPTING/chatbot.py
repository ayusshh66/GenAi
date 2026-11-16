from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from dotenv import load_dotenv

load_dotenv()

prompt = [
    SystemMessage(content="you are a chef master ai")
]
model = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite")

while True:
    user_input = input("you: ")

    if user_input == "exit":
        print(prompt)
        break

    prompt.append(HumanMessage(content=user_input))

    result = model.invoke(prompt)

    prompt.append(AIMessage(content=result.text))

    print("Ai:", result.text)
