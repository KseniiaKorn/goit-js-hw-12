const params = {
  key: '47286025-dcd3f7c6d98bacb5edade47ee',
  q: '',
  imageType: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function generateHttpsQuery(formValue) {
  params.q = formValue;
  const queryString = new URLSearchParams(params).toString();
  return `https://pixabay.com/api/?${queryString}`;
}

export function fetchPictures(httpsQuery) {
  return fetch(httpsQuery).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}