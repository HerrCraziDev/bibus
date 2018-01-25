/************************************************/
/*                  bibus.js                    */
/*  API for requesting online informations and  */
/*  previsionnal data for the Bibus bus network */
/*  By G. Leroy-Ferrec  - Club Elec ISEN Brest  */
/*  GNU Public License 3.0                      */
/************************************************/

/*
Remarks :
Thanks to Antoine Auffret (CIR 3) for his initial Python version
This library relies on the Bibus API developped by Brest Métropole
*/


class Bibus
{
  constructor(url, output_format='json')
  {
    this.url = url;
    this.output_format = output_format;
  }

  request(restFunc, callback, params = '')
  {
    var req = new XMLHttpRequest();

    //In NodeJS, the explicit instanciation of XMLHttpRequest by require() makes it overwrite the 'this' object
    //(which should normally refer to the current Bibus object instance) in req.onreadystatechange, so we need to
    //export this' members (Those of Bibus) in vars.
    var url = this.url;
    var output_format = this.output_format;

    req.open( 'GET', this.url + restFunc + '?format=' + this.output_format + params );
    req.send();

    req.onreadystatechange = function ()
    {
      if ( req.readyState === 4 )
      {
        if ( req.status == 200 )
        {
          if ( req.responseText != '' )
          {
            if ( output_format === 'json' )
            {
              req.json = JSON.parse(req.responseText);
              req.xml = '';

              if ( req.json.length == 0 ) req.error = 'ERR_NO_DATA'
            }
            else if ( output_format === 'xml' )
            {
              req.json = {};
              req.xml = req.responseText;
            }
          } else {
            req.error = 'ERR_INVALID';
            console.warn('ERR_INVALID : '+url+restFunc + '?format=json' + params);
          }
        } else {
          req.error = 'ERR_UNAVAILABLE';
        }

        callback(req);
      }
    };

  }

  getVersion(callback)
  {
    return this.request( 'getVersion', callback );
  }

  getStopsNames(callback)
  {
    return this.request( 'getStopsNames', callback);
  }

  getRoutes(callback)
  {
    return this.request( 'getRoutes', callback);
  }

  getStops_route(route_id, trip_headsign, callback)
  {
    return this.request( 'getStops_route', callback, '&route_id='+route_id+'&trip_headsign='+trip_headsign);
  }

  getStop(stop, callback)
  {
    return this.request( 'getStop', callback, '&stop_name='+stop);
  }

  getStop2(stop_id, callback)
  {
    return this.request( 'getStop2', callback, '&stop_id='+stop_id);
  }

  getRoutes_stop(stop, callback)
  {
    return this.request( 'getRoutes_stop', callback, '&stop_name='+stop);
  }

  getRoutes_stop2(stop_id, callback)
  {
    return this.request( 'getRoutes_stop2', callback, '&stop_id='+stop_id);
  }

  getDestinations(route_id, callback)
  {
    return this.request( 'getDestinations', callback, '&route_id='+route_id);
  }

  getStopsNear(lat, long, callback)
  {
    return this.request( 'getStopsNear', callback, '&latitude='+lat+'&longitude='+long);
  }

  getStopNear_route(route_id, lat, long, callback)
  {
    return this.request( 'getStopNear_route', callback, '&route_id='+route_id+'&latitude='+lat+'&longitude='+long);
  }

  getStopVehiclesPosition(route_id, trip_headsign, callback)
  {
    return this.request( 'getStopVehiclesPosition', callback, '&route_id='+route_id+'&trip_headsign='+trip_headsign);
  }

  getGeolocatedVehiclesPosition(route_id, trip_headsign, callback)
  {
    return this.request( 'getGeolocatedVehiclesPosition', callback, '&route_id='+route_id+'&trip_headsign='+trip_headsign);
  }

  getNextDepartures(route_id, stop, trip_headsign, callback)
  {
    return this.request( 'getNextDepartures', callback, '&route_id='+route_id+'&stop_name='+stop+'&trip_headsign='+trip_headsign);
  }

  getNextDepartures(route_id, stop_id, trip_headsign, callback)
  {
    return this.request( 'getNextDepartures', callback, '&route_id='+route_id+'&stop_id='+stop_id+'&trip_headsign='+trip_headsign);
  }

  getRemainingTimes(route_id, stop, trip_headsign, callback)
  {
    return this.request( 'getRemainingTimes', callback, '&route_id='+route_id+'&stop_name='+stop+'&trip_headsign='+trip_headsign);
  }

  getRemainingTimes2(route_id, stop_id, trip_headsign, callback)
  {
    return this.request( 'getRemainingTimes2', callback, '&route_id='+route_id+'&stop_id='+stop_id+'&trip_headsign='+trip_headsign);
  }

  getDeviations(route_id, trip_headsign, callback)
  {
    return this.request( 'getDeviations', callback, '&route_id='+route_id+'&trip_headsign='+trip_headsign);
  }

  getPerturbations(callback)
  {
    return this.request( 'getPerturbations', callback);
  }

}



//NodeJS module exports (used for NJS requires)
if ( typeof module !== 'undefined' && module.exports )  //Check if we're using the NodeJS environment
{
    if ( typeof XMLHttpRequest == 'undefined' )          //Check if XHR is defined, else define it (globally)
    {
        global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    }

    module.exports.Bibus = Bibus;                       //Export the class to NodeJS
}
