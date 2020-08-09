import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import axios from 'axios';
import {useDropzone} from 'react-dropzone'

const CreateUserProfiles = ({forceUpdateCallback}) => {
  const [userField, setUserField] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.set("username", userField);

    axios.post(
      `http://localhost:8080/api/v1/user-profile/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(() => {
      console.log("user created successfully");
      forceUpdateCallback();
    }).catch(err => {
      console.log(err);
    });

    setUserField("");
  }

  return (
    <>
    <div className="header">
      <h1>User Profile Image Manager</h1>
    </div>
    <div className="createUserInput">
      <p>Add User Profiles</p>
      <input type="text" value={userField} onChange={(event) => setUserField(event.target.value)}/>
      <div className="button" onClick={handleSubmit}>
        <div id="underline"></div>
        <div id="buttonText">Add</div>
      </div>
    </div>
    </>
  );
}

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
      setUserProfiles(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const forceUpdate = () => {
    fetchUserProfiles();
  }

  return (
    <>
    <CreateUserProfiles forceUpdateCallback={forceUpdate}/>
    <div>
      {userProfiles.map((userProfile, index) => {
        return (
          <div key={index}>
            {userProfile.userProfileId ? (
              <img src={`http://localhost:8080/api/v1/user-profile/${userProfile.userProfileId}/image/download`} alt=""/>
            ) : null}
            <br/>
            <br/>
            <h1>{userProfile.username}</h1>
            <p>{userProfile.userProfileId}</p>
            <Dropzone {...userProfile} forceUpdateCallback={() => (forceUpdate())}/>
            <br/>
          </div>
        )
      })}
    </div>
    </>
  );
}

function Dropzone({ userProfileId, forceUpdateCallback }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    axios.post(
      `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    ).then(() => {
      console.log("image uploaded successfully");
      forceUpdateCallback();
    }).catch(err => {
      console.log(err);
    });
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop profile image here, or click to select image</p>
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProfiles/>
    </div>
  );
}

export default App;