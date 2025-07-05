from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import joblib
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")

# Load your dataset (update path if needed)
df = pd.read_csv("SMSSpamCollection", sep="\t", header=None, names=["label", "text"])

# Vectorize
vectorizer = TfidfVectorizer(stop_words=stopwords.words("english"))
X = vectorizer.fit_transform(df["text"])
y = df["label"].map({"ham": 0, "spam": 1})

# Train model
model = MultinomialNB()
model.fit(X, y)

# Save both model + vectorizer together
joblib.dump((vectorizer, model), "spam_classifier.joblib")
print("✅ Model + vectorizer saved as spam_classifier.joblib")
