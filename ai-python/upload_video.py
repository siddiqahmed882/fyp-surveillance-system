import pyrebase


firebaseConfig = {
  "apiKey": "AIzaSyBrhPgVKf2HUOOVtAagVd2ydNLQl2sv1Dk",
  "authDomain": "alpha-surveillance.firebaseapp.com",
  "projectId": "alpha-surveillance",
  "storageBucket": "alpha-surveillance.appspot.com",
  "messagingSenderId": "186168422839",
  "appId": "1:186168422839:web:17d2b98509d7f3e4687832",
  "serviceAccount": "serviceAccount.json",
  "databaseURL": "https://alpha-surveillance-default-rtdb.firebaseio.com/"
}

firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()

bucket = storage.bucket

print('Bucket name:', bucket.name)
blob = bucket.blob("videos/my_video.mp4")
blob.upload_from_filename("./2023-05-04_09-51-52.mp4")
blob.make_public()

print("Video URL:", blob.public_url)

# Get the CDN URL of your Firebase Storage bucket
cdn_url = "https://firebasestorage.googleapis.com/v0/b/alpha-surveillance.appspot.com/o/"

# The path to your video file in Firebase Storage
path = "./2023-05-04_09-51-52.mp4"

# Generate the download URL for your video
video_url = cdn_url + path.replace("/", "%2F") + "?alt=media"

print("Streaming URL:", video_url)