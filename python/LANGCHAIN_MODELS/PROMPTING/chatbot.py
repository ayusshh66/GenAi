from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()


model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.1)

while True:
    user_input = input("you: ")
    if user_input == "exit":
        break
    result = model.invoke(user_input)

    print("Ai",  result.content)