function UserProfile() {
  return (
    <div>
      <img
        src="images/user.jpg"
        alt="User Profile"
        className="w-32 h-32 rounded-full mx-auto mt-10 mb-10"
      />
      <h2 className="text-xl font-bold mb-4">John Doe</h2>
      <p className="text-sm text-gray-400 mb-10">Premium User</p>
    </div>
  );
}

export default UserProfile;
