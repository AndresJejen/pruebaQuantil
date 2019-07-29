import json
import requests
import pandas as pd
import pickle
#from utiles import *

import numpy as np

"""Setting the headers to send and accept json responses
"""
header = {'Content-Type': 'application/json', \
                  'Accept': 'application/json'}

# creamos un dataset de pruebas
df = pd.read_csv('time_series.csv',  parse_dates=[0], header=None,index_col=0, names=['fecha','unidades'])


print(df.shape)

print('JSON para enviar en POST', df)

"""POST <url>/predict
"""

for i in df.index:

    data = {
        "fecha": str(i),
        "demanda": int(df.loc[i][0])
    }
    print(data)
    resp = requests.post("http://localhost:8001/api/newday", \
                data = json.dumps(data),\
                headers= header)
                    
    print('status',resp.status_code)
    print('Respuesta de Servidor')
    print(resp.json())