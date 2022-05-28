import { API } from "../../backend";

export const createBlog = (form) => {
  console.log(form, "hedybehdbehdb");
  return fetch(`${API}/blog/create`, {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const CreatePodCast = (form) => {
  console.log(form, "hedybehdbehdb");
  return fetch(`${API}/podcast/create`, {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllBlogs = (filters = {}) => {
  const data = {
    filters,
  };
  return fetch(`${API}/blog/getAll`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBlogById = (blogId) => {
  return fetch(`${API}/blog/getOne/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createFeedback = async (user) => {
  return fetch(`${API}/blog/createfeed`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFeedById = (blogId) => {
  return fetch(`${API}/blog/getAllBlog/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLikes = async (id, operation) => {
  return fetch(`${API}/blog/operations/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(operation),
  })
    .then((response) => {
      console.log(response, "pp");
      return response.json();
    })
    .catch((err) => console.log(err));
};
