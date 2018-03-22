export default async function uploadAudioAsync(uri, name) {
    console.log("Uploading " + uri);
    let apiUrl = 'https://uwblueprint-dancefest.herokuapp.com/upload';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('file', {
      uri,
      name,
      type: `audio/x-${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    console.log("POSTing " + uri + " to " + apiUrl);
    return fetch(apiUrl, options);
  }