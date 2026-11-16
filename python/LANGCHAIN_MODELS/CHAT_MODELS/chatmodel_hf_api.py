from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv

load_dotenv()


llm = HuggingFaceEndpoint(
    repo_id="openai/gpt-oss-20b",
    task="text-generation",
    provider="auto",
    max_new_tokens=128
)

model = ChatHuggingFace(llm=llm)

result = model.invoke("What is the capital of USA?")

print(result.content)
