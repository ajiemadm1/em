async function apiGet(params){

  const url =
    PostTestV1_URL +
    '?' +
    new URLSearchParams(params);

  const res =
    await fetch(url);

  return await res.json();

}

async function apiPost(data){

  const res =
    await fetch(PostTestV1_URL,{

      method:'POST',

      body:JSON.stringify(data)

    });

  return await res.json();

}
