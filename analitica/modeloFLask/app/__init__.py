"""Filename: server.py
"""
import pandas as pd
from pandas.io.json import json_normalize
from sklearn.externals import joblib
from flask import Flask, jsonify, request
from datetime import datetime,timedelta

from utiles import *

app = Flask(__name__)

@app.route('/')
def hello_world():
    return("Hola MUNDO desde Python!")

@app.route('/predict', methods=['POST'])
def predict():
	"""API request
	"""
	try:
		req_json = request.get_json()
		req_json = json_normalize(req_json)
		req_json['fecha'] = [x.split('T')[0] for x in req_json['fecha']]
		req_json['fecha'] =  pd.to_datetime(req_json['fecha'])
		req_json['weekday'] = [x.weekday() for x in req_json['fecha']]
		req_json['month']=[x.month for x in req_json['fecha']]
		req_json = req_json.sort_values(by='fecha', ascending=True)
		req_json=req_json.drop(columns="_id")
		#req_json=req_json.drop(columns="fecha")
		req_json=req_json.drop(columns="__v")
		req_json.rename(columns={'demanda': 'unidades'}, inplace=True)
		print(req_json)
		loaded_scaler = load_object('scaler_time_series.pkl')
		reframed = transformar(req_json, loaded_scaler)
		reordenado=reframed[ ['weekday','month','var1(t-7)','var1(t-6)','var1(t-5)','var1(t-4)','var1(t-3)','var1(t-2)','var1(t-1)'] ]
		reordenado.dropna(inplace=True)
		print(reordenado)
		data = reordenado.to_json(orient='records')
		print(data)
		input = pd.read_json(data, orient='records')
	except Exception as e:
		raise e

	if input.empty:
		return("No hay datos de Entrada - Error")
	else:
		#Load the saved model
		print("Cargar el modelo...")
		loaded_model = cargarModeloSiEsNecesario()

		print("Hacer Pronosticos")
		continuas = input[['var1(t-7)','var1(t-6)','var1(t-5)','var1(t-4)','var1(t-3)','var1(t-2)','var1(t-1)']]
		predictions = loaded_model.predict([input['weekday'], input['month'], continuas])

		print("Transformando datos")
		loaded_scaler = load_object('scaler_time_series.pkl')
		inverted = loaded_scaler.inverse_transform(predictions)
		inverted = inverted.astype('int32')

		final_predictions = pd.DataFrame(inverted)
		final_predictions.columns = ['demanda']
		
		hoy = req_json['fecha'].loc[0]
		#date_time_obj = datetime.strptime(hoy, '%Y-%m-%d %H:%M:%S.%f')

		print(hoy)
		dias = timedelta(days=1)
		hoy_mas_1_dias = hoy + dias # sumamos 5 Dias
		print(hoy_mas_1_dias)
		fechas = pd.date_range(start =str(hoy_mas_1_dias),  periods = 8) 
		print(fechas)
		final_predictions['fechas'] = fechas
		print(final_predictions)
		print("Enviar respuesta")
		responses = jsonify(predictions=final_predictions.to_json(orient="records"))
		responses.status_code = 200
		print("Fin de Peticion")
		

		return (responses)

global_model = None

def cargarModeloSiEsNecesario():
	global global_model
	if global_model is not None:
		print('Modelo YA cargado')
		return global_model
	else:
		global_model = crear_modeloEmbeddings()
		global_model.load_weights("pesos.h5")	
		print('Modelo Cargado')
		return global_model