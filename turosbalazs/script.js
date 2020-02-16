
// elements
const html = {
  main: document.querySelector('main'),
  left: document.querySelector('.left'),
  right: document.querySelector('.right')
}

const components = {
  landing: './components/landing/landing.html',
  sidenav: './components/sidenav/sidenav.html',
  gallery: './components/gallery/gallery.html',
  singleGallery: './components/single-gallery/gallery.html',
  contact: './components/contact/contact.html',
  bio: './components/bio/bio.html'
}

let page = 'landing';


function loadHTMLtoDOM(html, DOMelement) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     DOMelement.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", html, true);
  xhttp.send();
}

function navigation(target){
  history.pushState({
    id: `${target}`
}, `BALAZS Turós ${target.toUpperCase()} | ` , `http://my-app-url.com/${target}`);

}

loadHTMLtoDOM(components.gallery, html.right);

navigation('kiscica')

console.log(components.gallery)