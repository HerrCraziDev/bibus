/************************************************/
/*             realtime-update.js               */
/*  Using bibus.js lib to retrieve real-time    */
/*  data from the Bibus REST API.               */
/*                                              */
/*  By G. Leroy-Ferrec  - Club Elec ISEN Brest  */
/*            GNU Public License 3.0            */
/************************************************/

const url = 'https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/';
const output_format = 'json';

/*
Lignes : 6 (Cl.Keraudren - Fort Montbarey), 3 (Océanopolis - Lambézellec)
Arrêts : ISEN (id=ISEN_2), Kerinou (id=KERINO_2)
*/

/*
update(element, res) :
  updates the DOM element 'element' with the data provided by 'res',
  or with an error if there weren't any data since 5s.
  -element : a DOM element
  -res : A modified XMLHttpRequest object provided by bibus.js. To be used only
         in a bibus.js request callback.
*/
function update(element, res)
{
  if ( res.error === undefined )
  {
    element.textContent = res.json[0].Remaining_time;
    element.className = 'hour';
    element.timeSinceUpdate = (new Date()).getTime();
  } else {
    if ( ((new Date()).getTime() - element.timeSinceUpdate) > 5000 )
    {
      element.className = '';
      switch ( res.error )
      {
        case 'ERR_INVALID':
        element.textContent = "Données indisponibles";
        break;

        case 'ERR_UNAVAILABLE':
        element.textContent = "Service indisponible";
        break;

        case 'ERR_NO_DATA':
        element.textContent = "Pas de correspondance prochainement";
        break;

        default:
        element.textContent = "Erreur sauvage inconnue :/"
      }
    }
  }
}

window.onload = function ()
{
  //Get some DOM elements
  var version = document.getElementById('version');

  var FortMontbarey = document.getElementById('dir-fort-montbarey');
  var Keraudren = document.getElementById('dir-keraudren');
  var Lambe = document.getElementById('dir-lambezellec');
  var Oceanopolis = document.getElementById('dir-oceanopolis');

  //Time since the last sucessfull request on the server. Starts at the current time.
  FortMontbarey.timeSinceUpdate = Lambe.timeSinceUpdate = Oceanopolis.timeSinceUpdate = Keraudren.timeSinceUpdate = (new Date()).getTime();

  //Create the Bibus object that will make the requests on the Bibus API server.
  var bibus = new Bibus(url, output_format);


  /*  Update  */

  setInterval( () => {

    bibus.getRemainingTimes2('6', 'ISEN_2', 'Fort Montbarey', (res) => {
      update(FortMontbarey, res);
    });

    //Following requests are delayed by a timeout to prevent the server from denying them
    setTimeout( () => {
      bibus.getRemainingTimes2('6', 'ISEN_1', 'Clin Keraudren', (res) => {
        update(Keraudren, res);
      });
    }, 200);

    setTimeout( () => {
      bibus.getRemainingTimes2('3', 'KERINO_1', 'Océanopolis', (res) => {
        update(Oceanopolis, res);
      });
    }, 400);

    setTimeout( () => {
      bibus.getRemainingTimes2('3', 'KERINO_2', 'Lambézellec', (res) => {
        update(Lambe, res);
      });
    }, 600);
  }, 2000);
}
