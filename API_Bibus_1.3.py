#!/usr/bin/env python3
# coding: utf-8
__author__ = "Antoine Auffret"
__version__ = "1.3"
__source__ = "https://geo.pays-de-brest.fr/donnees/Documents/Public/DocWebServicesTransport.pdf"

import requests
import urllib
import json

class Bibus():
	# Initialisation de l'url de base et du format de données retour
	def __init__(self, base_url, output_format):
		self.base_url = base_url
		self.output_format = output_format

	# Appel du module requests et renvoie les données en json
	def __request(self, url):
		r = requests.get(url)
		return json.dumps(r.json(), sort_keys=True, indent=4)

	# Obtenir la version de l'application
	def getVersion(self):
		url = "%s%s?format=%s" % (base_url, "getVersion", output_format)
		return self.__request(url)

	# Obtenir le nom de tous les arrêts
	def getStopsNames(self):
		url = "%s%s?format=%s" % (base_url, "getStopsNames", output_format)
		return self.__request(url)

	# Obtenir toutes les lignes
	def getRoutes(self):
		url = "%s%s?format=%s" % (base_url, "getRoutes", output_format)
		return self.__request(url)

	# Obtenir les arrêts d'une ligne
	def getStops_route(self, route_id, trip_headsign):
		param = "route_id=%s&trip_headsign=%s" % (route_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getStops_route", output_format, param)
		return self.__request(url)

	# Obtenir un arrêt
	def getStop(self, stop_name):
		param = "stop_name=%s" % (stop_name)
		url = "%s%s?format=%s&%s" % (base_url, "getStop", output_format, param)
		return self.__request(url)

	# Obtenir un arrêt
	def getStop2(self, stop_id):
		param = "stop_id=%s" % (stop_id)
		url = "%s%s?format=%s&%s" % (base_url, "getStop2", output_format, param)
		return self.__request(url)

	# Obtenir toutes les lignes desservant un arrêt
	def getRoutes_stop(self, stop_name):
		param = "stop_name=%s" % (stop_name)
		url = "%s%s?format=%s&%s" % (base_url, "getRoutes_stop", output_format, param)
		return self.__request(url)

	# Obtenir toutes les lignes desservant un arrêt
	def getRoutes_stop2(self, stop_id):
		param = "stop_id=%s" % (stop_id)
		url = "%s%s?format=%s&%s" % (base_url, "getRoutes_stop2", output_format, param)
		return self.__request(url)

	# Obtenir les noms des destinations
	def getDestinations(self, route_id):
		param = "route_id=%s" % (route_id)
		url = "%s%s?format=%s&%s" % (base_url, "getDestinations", output_format, param)
		return self.__request(url)

	# Obtenir les arrêts les plus proches
	def getStopsNear(self, latitude, longitude):
		param = "latitude=%s&longitude=%s" % (latitude, longitude)
		url = "%s%s?format=%s&%s" % (base_url, "getStopsNear", output_format, param)
		return self.__request(url)

	# Obtenir l'arrêt le plus proche pour une ligne
	def getStopNear_route(self, route_id, latitude, longitude):
		param = "route_id=%s&latitude=%s&longitude=%s" % (route_id, latitude, longitude)
		url = "%s%s?format=%s&%s" % (base_url, "getStopNear_route", output_format, param)
		return self.__request(url)

	# Obtenir la position (arrêt) des véhicules (bus ou tramway)
	def getStopVehiclesPosition(self, route_id, trip_headsign):
		param = "route_id=%s&trip_headsign=%s" % (route_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getStopVehiclesPosition", output_format, param)
		return self.__request(url)

	# Obtenir la position (géographique) des véhicules
	def getGeolocatedVehiclesPosition(self, route_id, trip_headsign):
		param = "route_id=%s&trip_headsign=%s" % (route_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getGeolocatedVehiclesPosition", output_format, param)
		return self.__request(url)

	# Obtenir les horaires des prochains départs
	def getNextDepartures(self, route_id, stop_name, trip_headsign):
		param = "route_id=%s&stop_name=%s&trip_headsign=%s" % (route_id, stop_name, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getNextDepartures", output_format, param)
		return self.__request(url)

	# Obtenir les horaires des prochains départs
	def getNextDepartures2(self, route_id, stop_id, trip_headsign):
		param = "route_id=%s&stop_id=%s&trip_headsign=%s" % (route_id, stop_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getNextDepartures2", output_format, param)
		return self.__request(url)

	# Obtenir les temps d'attente avant les prochains passages
	def getRemainingTimes(self, route_id, stop_name, trip_headsign):
		param = "route_id=%s&stop_name=%s&trip_headsign=%s" % (route_id, stop_name, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getRemainingTimes", output_format, param)
		return self.__request(url)

	# Obtenir les temps d'attente avant les prochains passages
	def getRemainingTimes2(self, route_id, stop_id, trip_headsign):
		param = "route_id=%s&stop_id=%s&trip_headsign=%s" % (route_id, stop_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getRemainingTimes2", output_format, param)
		return self.__request(url)

	# Obtenir les déviations
	def getDeviations(self, route_id, trip_headsign):
		param = "route_id=%s&trip_headsign=%s" % (route_id, trip_headsign)
		url = "%s%s?format=%s&%s" % (base_url, "getDeviations", output_format, param)
		return self.__request(url)

	# Obtenir les perturbations
	def getPerturbations(self):
		url = "%s%s?format=%s" % (base_url, "getPerturbations", output_format)
		return self.__request(url)

if __name__ == '__main__':
	# Initialisation
	base_url = "https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/"
	output_format = "json"
	api = Bibus(base_url, output_format)

	# coord Saint-Exupery
	latitude = "48.387953"
	longitude = "-4.504505"
	near = json.loads(api.getStopsNear(latitude, longitude))

	# Direction Plouzané
	terminus1 = "Porte de Plouzané"
	sens1 = "◀"
	direction1 = "🏰"
	trip_headsign1 = urllib.parse.quote(terminus1)

	stop_id1 = near[1]["Stop_id"]
	stop1 = json.loads(api.getRoutes_stop2(stop_id1))
	route_id1 = stop1[0]["Route_id"]
	route_long_name1 = stop1[0]["Route_long_name"]

	eta1 = api.getRemainingTimes2(route_id1, stop_id1, trip_headsign1)
	#print(eta1)
	eta1 = json.loads(eta1)
	try:
		s1 = eta1[0]["Remaining_time"].split(":")[1]+":"+eta1[0]["Remaining_time"].split(":")[2]
		print(s1)
	except:
		s1 = "na"
	try:
		s12 = eta1[1]["Remaining_time"].split(":")[1]
	except:
		s12 = "na"

	print("%s%s%s %s" % (sens1, direction1, s1, s12))
	#print(route_id1)
	#print(route_long_name1)
	#print(terminus1)
	#print(s1)
	#print(s12)

	#######################################################

	#Direction Goesnou
	terminus2 = "Porte de Gouesnou"
	sens2 = "▶"
	direction2 = "⛪"
	trip_headsign2 = urllib.parse.quote(terminus2)

	stop_id2 = near[0]["Stop_id"]
	stop2 = json.loads(api.getRoutes_stop2(stop_id2))
	route_id2 = stop2[0]["Route_id"]
	route_long_name2 = stop2[0]["Route_long_name"]

	eta2 = api.getRemainingTimes2(route_id2, stop_id2, trip_headsign2)
	#print(eta2)
	eta2 = json.loads(eta2)
	try:
		s2 = eta2[0]["Remaining_time"].split(":")[1]+":"+eta2[0]["Remaining_time"].split(":")[2]
	except:
		s2 = "na"
	try:
		s22 = eta2[1]["Remaining_time"].split(":")[1]
	except:
		s22 = "na"

	print("%s%s%s %s" % (sens2, direction2, s2, s22))
	#print(route_id2)
	#print(route_long_name2)
	#print(terminus2)
	#print(s2)
	#print(s22)

	#######################################################

	#Direction Guipavas
	terminus3 = "Porte de Guipavas"
	sens3 = "▶"
	direction3 = "✈"
	trip_headsign3 = urllib.parse.quote(terminus3)

	stop_id3 = near[0]["Stop_id"]
	stop3 = json.loads(api.getRoutes_stop2(stop_id3))
	route_id3 = stop3[0]["Route_id"]
	route_long_name3 = stop3[0]["Route_long_name"]

	eta3 = api.getRemainingTimes2(route_id3, stop_id3, trip_headsign3)
	#print(eta)
	eta3 = json.loads(eta3)
	try:
		s3 = eta3[0]["Remaining_time"].split(":")[1]+":"+eta3[0]["Remaining_time"].split(":")[2]
	except:
		s3 = "na"
	try:
		s32 = eta3[1]["Remaining_time"].split(":")[1]
	except:
		s32 = "na"

	print("%s%s%s %s" % (sens3, direction3, s3, s32))
	#print(route_id3)
	#print(route_long_name3)
	#print(terminus3)
	#print(s3)
	#print(s32)

	##### Données statiques #####
	#print(api.getVersion())
	#print(api.getStopsNames())
	#print(api.getRoutes())
	#print(api.getStops_route(route_id, trip_headsign))
	#print(api.getStop(stop_name))
	#print(api.getStop2(stop_id))
	#print(api.getRoutes_stop(stop_name))
	#print(api.getRoutes_stop2(stop_id))
	#print(api.getDestinations(route_id))

	##### Données dynamiques et temps réel #####
	#print(api.getStopsNear(latitude, longitude))
	#print(api.getStopNear_route(route_id, latitude, longitude))
	#print(api.getStopVehiclesPosition(route_id, trip_headsign))
	#print(api.getGeolocatedVehiclesPosition(route_id, trip_headsign))
	#print(api.getNextDepartures(route_id, stop_name, trip_headsign))
	#print(api.getNextDepartures2(route_id, stop_id, trip_headsign))
	#print(api.getRemainingTimes(route_id, stop_name, trip_headsign))
	#print(api.getRemainingTimes2(route_id, stop_id, trip_headsign))
	#print(api.getDeviations(route_id, trip_headsign))
	#print(api.getPerturbations())
