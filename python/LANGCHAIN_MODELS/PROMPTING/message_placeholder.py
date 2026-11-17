from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
chat_template = ChatPromptTemplate([
    ("system","you are a helpful customer care Ai"),
    MessagesPlaceholder(variable_name = "chat_history"),
    ("human", "{query}")
])

chat_history = []

with open("chat_history.txt") as f:
    chat_history.extend(f.readlines())

result = chat_template.invoke({"chat_history":chat_history, "query":"when will i get refund?"})

print(result.text)
# print(chat_history)