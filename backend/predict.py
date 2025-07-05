from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

vectorizer, model = joblib.load("spam_classifier.joblib")

class Message(BaseModel):
    text: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Spam classifier API is up"}

@app.post("/predict")
def predict(message: Message):
    transformed = vectorizer.transform([message.text])
    prediction = model.predict(transformed)[0]
    label = "spam" if prediction == 1 else "ham"
    return {"prediction": label}
