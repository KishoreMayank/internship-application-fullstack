addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class elemHandle {
  element(element) {
    const attribute = element.getAttribute('href');
    element.setAttribute(
      'href',
      attribute.replace('cloudflare.com', 'linkedin.com/in/mayank-kishore')
    );
    element.setInnerContent('Go to Mayank\'s Linkedin!');
  }
}

const rewrite = new HTMLRewriter().on('a#url', new elemHandle());

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  const json = await response.json();
  const urls = json['variants'];
  const to_transform = await fetch(urls[Math.floor(Math.random() * 2)]);
  return rewrite.transform(to_transform);
}