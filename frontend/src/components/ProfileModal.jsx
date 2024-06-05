import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import proImage from "../assets/user.png";
import { auth, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function ProfileModal({ toggleModal }) {
  const currentUser = auth.currentUser

  const [newFullName, setNewFullName] = useState(currentUser.displayName);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    currentUser.photoURL ? currentUser.photoURL : proImage
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = currentUser.photoURL;

    if (selectedFile) {
      const storageRef = ref(
        storage,
        `profile_images/${currentUser.uid}/${selectedFile.name}`
      );
      const snapshot = await uploadBytes(storageRef, selectedFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateProfile(auth.currentUser, {
      displayName: newFullName,
      photoURL: imageUrl,
    });
    toggleModal();
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-full bg-gray-900 h-screen">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={previewImage}
              alt="User Image"
            />
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  disabled
                  value={newEmail}
                />
              </div>
              <div>
                <label
                  htmlFor="newFullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="newFullName"
                  id="newFullName"
                  placeholder=""
                  value={newFullName}
                  onChange={(e) => {
                    setNewFullName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
