const handleErrors = (res) => {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
};
  
export { handleErrors };