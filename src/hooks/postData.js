import axios from "axios";

export default async function usePostData(url, data) {
  const token = JSON.parse(localStorage.getItem("yolo_access_token"))
  try {
    const response = await axios.post(
      `https://yolo.ps/admin/api/${url}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
