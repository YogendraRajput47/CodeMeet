export const getToken = async () => {
  try {
    const token = await window.Clerk?.session?.getToken?.(); 
    return token;
  } catch (error) {
    console.log("Failed to get the token");
  }
};
