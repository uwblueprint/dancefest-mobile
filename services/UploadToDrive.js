const url = 'https://www.googleapis.com/drive/v3'
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3'

let apiToken = null

export function setApiToken(token) {
  apiToken = token
}

function initiateSession(name, contentLength) {
  const metaData = { name };
  const metaDataString = JSON.stringify(metaData);
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiToken}`);
  headers.append('X-Upload-Content-Type', 'audio/m4a');
  headers.append('X-Upload-Content-Length', contentLength);
  headers.append('Content-Type', 'application/json; charset=UTF-8');
  headers.append('Content-Length', metaDataString.length);
  return fetch(`${uploadUrl}/files?uploadType=resumable`, {
    method: 'POST',
    headers,
    body: metaDataString,
  });
}

function byteCount(s) {
  return encodeURI(s).split(/%..|./).length - 1;
}

export function uploadFile(name, content) {
  let sessionURI;
  const contentString = JSON.stringify(content);

  const headers = new Headers();
  headers.append('Content-Type', 'audio/m4a');
  headers.append('Content-Length', byteCount(contentString));

  const sessionPromise = initiateSession(name, byteCount(contentString));
  sessionPromise.then(response => {
    if (response.ok) {
      sessionURI = response.headers.map.location[0];
      return fetch(sessionURI, {
        method: 'PUT',
        headers,
        body: contentString,
      }).then(response => console.log(response));
    }
    return response.json()
      .then((error) => {
        throw new Error(JSON.stringify(error))
      });
  });
}