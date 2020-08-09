# User Profile Image Manager :city_sunrise:

A __User Profile Image Manager__ built using __React__ for frontend and __Spring Boot Technologies__ (Web, JPA, etc) for backend and __Amazon AWS S3__ and __MySQL Database__ for image storage and database. The project features typical Service and Repository layers.

This project is built for the intention of uploading (and downloading) profile images for different users. The client is able to add different users and upload images for each user. The manager displays each user's name, ID, and latest profile picture. This application can be adapted to be used in a social media site or in a similar environment where profile pictures are used. Other adaptations can include file types other than images. 

**How does it work - More Info** :small_red_triangle_down:
<details>
<summary>'Logic' behind the code</summary>
![Diagram](https://github.com/NotTheBest/profileimagemanager/blob/master/readme-assets/diagram.png?raw=true)

The client inputs user profile names to the frontend and a POST request is called to the backend server (with the help of __Axios__) where the server creates a new user with a random ID and stores the information to the database. When an image is uploaded, a POST request is called to the backend server where the server stores the image to S3 and the image url to the database. Each time the frontend is loaded, a GET request is made to the server for all the user profiles and the server returns a list of the user profiles from the database. When the frontend maps out the user profiles, another GET request is called for each profile to download each profile picture and the server downloads the data from S3 and returns it into each image src tag in the form of a byte array. A history of images is saved to S3 to allow for 'logging' of previous profile pictures for each user.

Note: After uploading an image, a refresh might be needed. This is due to the lag time between S3 actually storing the image and for the image to be available for download from S3.
</details>
<br />

**Preview images** :small_red_triangle_down:
<details>
<summary>Some fun images/gifs of the application </summary>

* Add a new User Profile

![Add Profile](https://github.com/NotTheBest/profileimagemanager/blob/master/readme-assets/addprofile.gif)

* Drop an image to upload

![Drop Image](https://github.com/NotTheBest/profileimagemanager/blob/master/readme-assets/dropimage.gif)

* Displays profile picture

![Uploaded Image](https://github.com/NotTheBest/profileimagemanager/blob/master/readme-assets/uploadedimage.png?raw=true)

</details>

## Running the application locally

##### Start the Backend Server
The backend server is a Spring Boot application built using Maven. You can build a jar file and run it from the command line:

```
git clone https://github.com/NotTheBest/profileimagemanager.git
cd profileimagemanager
./mvnw package
java -jar target/*.jar
```
Or you can run it from Maven directly using the Spring Boot Maven plugin.
```
./mvnw spring-boot:run
```
This starts up the backend server.

##### Start the Frontend
The frontend is a React app. To start the frontend, navigate to the `frontend` directory:
```
cd src/main/frontend
npm start
```
You can then access the application here: http://localhost:3000/

![Preview](https://github.com/NotTheBest/profileimagemanager/blob/master/readme-assets/uploadedimage.png?raw=true)

## Configuration
This project uses __Amazon S3__ to store images. In order to connect with your S3 Bucket, edit
```
AWSCredentials awsCredentials = new BasicAWSCredentials(
                "accesskey",
                "secretkey"
        );
```
within the __AmazonConfig__ class in the __config__ package.
Then, navigate to __BucketName__ enum in the __bucket__ package to edit the bucket name to your bucket (changing 'notthebest-image-upload'):
```
PROFILE_IMAGE("notthebest-image-upload");
```
This project uses __MySQL Database__. In order to connect with the database, edit 
```
spring.datasource.username=root
spring.datasource.password=password
```
within __application.properties__ to match your local MySQL database's username and password.

The application will create a new database named __userprofiles__. If you would like to change the name of the database, edit the appropriate database url within __application.properties__ as you would like it.

## About

This project was a personal project to learn more about full stack development, utilizing React JS Framework and Spring Boot and relevant technologies. Database management and industry application architecture were also focuses.

A small summary of the skills showcased during this project: :small_red_triangle_down:

* Java Spring Core, HTML5, CSS and similar topics
* Spring Controller management & annotations for creating server API
* Spring Boot capabilities, annotations, usage, and deployment
* React JS frontend development and 'connectivity' via requests to Spring Boot server
* Axios library for HTTPS requests to server
* Client/Server data transfer
* JPA annotations and repository management
* MySQL database management with Spring Data JPA
* Software/web application development processes
* MVC/Industry architecture along with DAO, model, service layers, and similar
* Web application debugging and API testing with Postman
* A new website to use in addition to Unsplash: Pexels! :camera:
* More! :)

__Credit to Amigoscode: this project was expanded upon and adapted__