export const baseURL = "http://ec2-52-70-33-38.compute-1.amazonaws.com/";

export const makeRequest = (url, store, actionTypes) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = e => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      const result = request.response;
      console.warn(result);
      store.dispatch({
        type: actionTypes.REQUEST_COMPLETED,
        payload: { potential: JSON.parse(result) }
      });
    } else {
      store.dispatch({
        type: actionTypes.REQUEST_FAILED
      });
      console.log(request.status);
      console.log(request.response);
    }
  };

  request.open("GET", url);
  request.send();
}

