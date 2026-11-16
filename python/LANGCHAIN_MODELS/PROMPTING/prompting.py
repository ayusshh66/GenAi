from langchain_google_genai import ChatGoogleGenerativeAI
import streamlit as st 
from dotenv import load_dotenv

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-2.5-flash",temperature=1)


st.header("Reaserch tool")

user_input = st.text_input(
    "enter ur prompt"
)

if st.button("summarize"):
    result = model.invoke(user_input)
    st.write(result.content)
