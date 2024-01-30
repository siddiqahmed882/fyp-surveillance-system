import datetime
import cv2
import numpy as np
import threading
import smtplib     
import ssl
import os
import requests
from email.mime.text import MIMEText
from flask import Flask, Response
from email.utils import formataddr
from email.mime.multipart import MIMEMultipart  
from email.mime.base import MIMEBase  
from email import encoders  
# from dotenv import load_dotenv

# Load variables from .env file
# load_dotenv()

# room_no = os.getenv('ROOM_NO')
# device_id = os.getenv('DEVICE_ID')

def create_notification():
    print("Notification Creating")    
    
    url = "https://app.nativenotify.com/api/notification"

    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "appId": 8001,
        "appToken": "zy08cMaUkMdVRgRWjNB7bm",
        "title": "Fire Detected",
        "body": "Fire Detected in one of your Room",
        "dateSent": "5-16-2023 1:49PM",
        # "pushData": {"yourProperty": "yourPropertyValue"},
        "bigPictureURL": "https://images.pexels.com/photos/5213883/pexels-photo-5213883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200 | response.status_code == 201:
        print("POST request successful.")
    else:
        print("POST request failed with status code:", response.status_code)


    # Return success message
    response = {
        'status': 'success',
        'message': 'Notification created successfully!'
    }
    print(response)
    


###################################################################################################



fire_cascade = cv2.CascadeClassifier('fire_detection_cascade_model.xml') # To access xml file which includes positive and negative images of fire. (Trained images)
# File is also provided with the code.

class FireDetection:
    def fire_detection(ip_address):
        # Load a sample video or webcam

        if ip_address == '0':
            ip_address = 0
            print(ip_address)

        else:
            print(ip_address)
            ip_address = ip_address.replace("-", ":")
            ip_address = ip_address.replace("+", "/")
            ip_address = 'http://' + ip_address
            print(ip_address)

        vid = cv2.VideoCapture(ip_address) # To start camera this command is used "0" for laptop inbuilt camera and "1" for USB attahed camera
        runOnce = False # created boolean    		
        timer = 0
        fps = vid.get(cv2.CAP_PROP_FPS)  # Get the FPS of the video

        # Define the codec and create VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'MJPG')
        out = None

        while(True):
            Alarm_Status = False
            ret, frame = vid.read() # Value in ret is True # To read video frame
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) # To convert frame into gray color
            fire = fire_cascade.detectMultiScale(frame, 1.2, 5) # to provide frame resolution

            ## to highlight fire with square 
            for (x,y,w,h) in fire:
                cv2.rectangle(frame,(x-20,y-20),(x+w+20,y+h+20),(255,0,0),2)
                roi_gray = gray[y:y+h, x:x+w]
                roi_color = frame[y:y+h, x:x+w]

                print("Fire alarm initiated")
                # threading.Thread(target=play_alarm_sound_function).start()  # To call alarm thread

                print(timer)
                if timer >= 10 or runOnce == False:
                    final_result = "true"
                    filename = 'opencv_frame_0.png'
                    cv2.imwrite(filename, frame)
                    
                    if(final_result == "true"):
                         print("Notify")
                         create_notification()
                    print("Mail send initiated")
                    threading.Thread(target=send_mail_function).start() # To call alarm thread
                    runOnce = True
                    # time.sleep(30)
                else:
                    print("Mail is already sent once")
                    runOnce = True

            # Yield the frame to Flask
            ret, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

            cv2.imshow('frame', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # Write video file after every 5 minutes
            timer += 1/fps
            # print(timer)
            if timer >= 300:  # 5 minutes
                print("Time UP")
                if out is not None:
                    out.release()
                filename = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S.avi")
                out = cv2.VideoWriter(filename, fourcc, fps, (int(vid.get(cv2.CAP_PROP_FRAME_WIDTH)), int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))))
                timer = 0
            if out is not None:
                out.write(frame)

        if out is not None:
            out.release()
        vid.release()
        cv2.destroyAllWindows()

app = Flask(__name__)
fd = FireDetection()

def play_alarm_sound_function(): # defined function to play alarm post fire detection using threading
    # playsound.playsound('fire_alarm.mp3',True) # to play alarm # mp3 audio file is also provided with the code.
    print("Fire alarm end") # to print in consol

def send_mail_function(): # defined function to send mail post fire detection using threading

        
    url = "https://5bdbnhzw-8001.inc1.devtunnels.ms/api/v1/user/ipAddress/0"

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200 or response.status_code == 201:
        print("GET request successful.", response.json())
        user_record = response.json().get("data", {})  # Extract 'data' from the JSON response
        print("User data:", user_record)

        # Extract user details
        user_email = user_record.get('email', '')
        user_name = user_record.get('name', '')
        
        print("User email:", user_email)
        print("User name:", user_name)
    else:
        print("GET request failed with status code:", response.status_code)


    # User configuration
    sender_email = 'zx996666@gmail.com'
    sender_name = 'Zack Xavier'
    password = 'uunwmblfodgisnba'

    receiver_emails = [user_email, 'tomsawyer925@gmail.com']
    receiver_names = [user_name, 'Tom Sawyer']

    # Email body
    email_html = open('email.html')
    email_body = email_html.read()

    filename = 'opencv_frame_0.png'

    for receiver_email, receiver_name in zip(receiver_emails, receiver_names):
            print("Sending the email...")
            # Configurating user's info
            msg = MIMEMultipart()
            msg['To'] = formataddr((receiver_name, receiver_email))
            msg['From'] = formataddr((sender_name, sender_email))
            msg['Subject'] = 'Fire detected in Building-402 in NorthWest Virginia'

            msg.attach(MIMEText(email_body, 'html'))

            try:
                # Open PDF file in binary mode
                with open(filename, "rb") as attachment:
                                part = MIMEBase("application", "octet-stream")
                                part.set_payload(attachment.read())

                # Encode file in ASCII characters to send by email
                encoders.encode_base64(part)

                # Add header as key/value pair to attachment part
                part.add_header(
                        "Content-Disposition",
                        f"attachment; filename= {filename}",
                )

                msg.attach(part)
            except Exception as e:
                    print('Oh no! We didnt found the attachment!n')
                    break

            try:
                    # Creating a SMTP session | use 587 with TLS, 465 SSL and 25
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    # Encrypts the email
                    context = ssl.create_default_context()
                    server.starttls(context=context)
                    # We log in into our Google account
                    server.login(sender_email, password)
                    # Sending email from sender, to receiver with the email body
                    server.sendmail(sender_email, receiver_email, msg.as_string())
                    print('Email sent!')
            except Exception as e:
                    print('Oh no! Something bad happened!n')
                    break
            finally:
                    print('Closing the server...')
                    server.quit()



@app.route('/')
def index():
    return "Fire Detection System!"



@app.route('/video_feed/<string:ip_address>')
def video_feed(ip_address):
    return Response(FireDetection.fire_detection(ip_address),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)





