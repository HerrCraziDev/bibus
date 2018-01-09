document.addEventListener('DOMContentLoaded', () => {
  var body = document.getElementById('body');

  setInterval( () => {
    body.style.backgroundColor = 'rgb(' + (Math.random() * 255).toString() + ',' + (Math.random() * 255).toString() + ',' + (Math.random() * 255).toString() + ')';
  }, 100);

  var bibus = new Bibus('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/', 'json');

  setInterval( () => {
    console.log('le' + await bibus.getVersion() );
  }, 2000);
});
