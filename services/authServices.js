//register
export const registerUser = async (data) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("User Registered sucessfully");
      return responseData;
    } else {
      const errorMessage = await response.text();
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    const message = console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
};

//login
export const loginUser = async (data) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("User login sucessfully");
      return null;
    } else {
      const errorMessage = await response.text();
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    const message = console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
};
