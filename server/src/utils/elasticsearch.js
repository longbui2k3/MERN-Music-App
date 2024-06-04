const fetchSearchURL = async (type, search) => {
  const fetchURL = await fetch(
    `https://e8eda546453445c1a81610de2be42c3e.us-central1.gcp.cloud.es.io:443/${type}/_search`,
    {
      method: "POST",
      headers: {
        Authorization:
          "ApiKey WWJtVjNZOEJyZzNKcWU0eHhPTU06aEtvRkMzLTFTUGVkdUJUWmhxOTk2UQ==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          match_phrase_prefix: {
            name: search,
          },
        },
      }),
    }
  );
  return await fetchURL.json();
};

module.exports = {
  fetchSearchURL,
};
