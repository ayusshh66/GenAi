
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-2.5-flash",temperature=1)

result = model.invoke("tell me 3 line a poem about delhi ")

print(result.content)
