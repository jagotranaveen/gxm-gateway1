import { useState, useRef, useEffect } from "react";
import apiService from "../../../services/service";
import {SettingsApiRoutes} from "../../../../src/api-routes";

const useMyProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [editedName, setEditedName] = useState("");
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleNameChange = (event) => {
    setIsEditing(true);
    setEditedName(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDiscardClick = () => {
    setIsEditing(false);
    setProfilePicture(null);
    setEditedName(name);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const data = await apiService(SettingsApiRoutes.PROFILE_UPDATE, 'POST', {
        body: JSON.stringify({ name: editedName }),
      });
      setEditedName(editedName);
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await apiService(SettingsApiRoutes.GET_USERS_PROFILE);
      setName(data.name);
      setEditedName(data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    profilePicture,
    isEditing,
    successMessage,
    fileInputRef,
    handleIconClick,
    handleFileChange,
    handleDiscardClick,
    handleSaveClick,
    setSuccessMessage,
    handleNameChange,
    name: editedName
  };
};

export default useMyProfile;
