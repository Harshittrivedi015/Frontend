import React, { useEffect, useState } from "react";

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); // For storing the image file

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files?.[0]) {
      const file = files[0];
      setImageFile(file);

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Base64 string for image preview
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data.users);
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    if (!userData?._id) {
      alert("User ID is missing");
      return;
    }

    try {
      const formData = new FormData();

      // Append all the text fields
      for (const key in userData) {
        if (key !== "profileImage") { // Don't include profileImage in FormData text fields
          formData.append(key, userData[key]);
        }
      }

      // If there's an image file, append it
      if (imageFile) {
        formData.append("profileImage", imageFile); // Append the image file directly
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/updateProfile/${userData._id}`, {
        method: "PUT",
        body: formData, // Send FormData, not JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile updated successfully");
        setUserData(result.user); // optional: reflect updated data
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error");
    }
  };

  if (!userData) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-start gap-4">
      {/* Image Section */}
      <div className="flex-shrink-0 text-center">
        {userData.profileImage ? (
          <img
             src={`data:image/jpeg;base64,${userData.profileImage}`}  // Render base64 image
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover mx-auto"
          />
        ) : (
          <div className="w-20 h-20 rounded-full border-2 border-blue-500 bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
            No Image
          </div>
        )}
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleChange}
            className="mt-2 text-sm"
          />
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="username"
              value={userData.username || ""}
              onChange={handleChange}
              placeholder="Username"
              className="border rounded p-2 text-sm"
            />
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded p-2 text-sm"
            />
            <input
              type="text"
              name="mobile"
              value={userData.mobile || ""}
              onChange={handleChange}
              placeholder="Mobile"
              className="border rounded p-2 text-sm"
            />
            <input
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="border rounded p-2 text-sm"
            />
            <textarea
              name="bio"
              value={userData.bio || ""}
              onChange={handleChange}
              placeholder="Short bio"
              rows={2}
              className="border rounded p-2 text-sm col-span-full"
            />
            <button
              onClick={handleSave}
              className="col-span-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">{userData.username}</h2>
            <p className="text-gray-600 text-sm">{userData.email}</p>
            <p className="text-gray-600 text-sm">📞 {userData.mobile}</p>
            <p className="text-gray-600 text-sm">📍 {userData.address}</p>
            <p className="text-gray-500 text-sm mt-2 italic">{userData.bio}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
