const form = document.querySelector('.search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log(response);

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */
  const template = document.querySelector('#template');
  const container = document.querySelector('.container');

  response.results.forEach((dataObj) => {
    const clone = template.content.cloneNode(true);
    const postUser = clone.querySelector('.post__user');
    const postDesc = clone.querySelector('.post__desc');

    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;

    postUser.innerText = `by ${dataObj.user.name}`;

    const desc = dataObj.description;

    if (desc === null || desc.length < 101) {
      postDesc.innerText = desc;
    } else {
      postDesc.innerText = `${desc.slice(0, 101)}...`;
    }

    container.appendChild(clone);
  });

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
