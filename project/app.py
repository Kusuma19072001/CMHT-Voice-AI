from flask import Flask, request
import smtplib
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/alert', methods=['POST'])
def alert():
    data = request.get_json()
    alert_type = data.get('type', '').lower()

    # Customize subject and body based on alert_type
    if alert_type == 'laptop return':
        subject = "Laptop Return Request"
        body = "A student is at the help desk requesting to return a laptop."
    elif alert_type == 'laptop Checkout':
        subject = "Laptop Checkout Request"
        body = "A student is at the help desk requesting a laptop checkout."
    elif alert_type == 'something else':
        subject = "Student Needs Information/Assistance"
        body = "A student is at the help desk and needs information/assistance."
    else:
        subject = "Student at Help Desk"
        body = "A student is at the help desk."

    send_email_alert(subject, body)
    return "Alert sent successfully!"

def send_email_alert(subject, body):
    sender = os.getenv("SENDER_EMAIL")
    password = os.getenv("EMAIL_PASSWORD")
    receiver = os.getenv("RECEIVER_EMAIL")

    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender, password)
        smtp.sendmail(sender, receiver, message)

if __name__ == '__main__':
    app.run(debug=True)