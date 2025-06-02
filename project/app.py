from flask import Flask, request
import smtplib
import os
from dotenv import load_dotenv
from flask_cors import CORS  # <-- Add this import

load_dotenv()

app = Flask(__name__)
CORS(app)  # <-- Enable CORS for all routes

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/alert', methods=['POST'])
def alert():
    send_email_alert()
    return "Alert sent successfully!"

def send_email_alert():
    sender = os.getenv("SENDER_EMAIL")
    password = os.getenv("EMAIL_PASSWORD")
    receiver = os.getenv("RECEIVER_EMAIL")

    subject = "Student at Help Desk"
    body = "A student is at the help desk requesting a laptop checkout."

    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender, password)
        smtp.sendmail(sender, receiver, message)

if __name__ == '__main__':
    app.run(debug=True)