import { API } from "../../backend";

export const getAllPods = () => {
  return fetch(`${API}/podcast/getAll`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPodById = (blogId) => {
  return fetch(`${API}/podcast/getOne/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
