import csv
from sys import argv

import pandas as pd
import seaborn as sns

import os
import time
import json
from random import random
from datetime import datetime

import requests

def gera_arquivo(arquivo):
    URL = 'https://www2.cetip.com.br/ConsultarTaxaDi/ConsultarTaxaDICetip.aspx'

    # Criando a variável data e hora 

    arquivo = arquivo+".csv"
    primeira_vez = True
    
    for _ in range(0, 10):
        data_e_hora = datetime.now()
        data = datetime.strftime(data_e_hora, '%Y/%m/%d')
        hora = datetime.strftime(data_e_hora, '%H:%M:%S')

        # Captando a taxa CDI do site da B3

        try:
            response = requests.get(URL)
            response.raise_for_status()
        except requests.HTTPError as exc:
            print("Dado não encontrado, continuando.")
            cdi = None
        except Exception as exc:
            print("Erro, parando a execução.")
            raise exc
        else:
            dado = json.loads(response.text)
            cdi = float(dado['taxa'].replace(',', '.')) + (random() - 0.5)

        # Verificando se o arquivo "taxa-cdi.csv" existe

        
        if os.path.exists(arquivo) == False:
            with open(file=arquivo, mode='w', encoding='utf8') as fp:
                fp.write('data,hora,taxa\n')
        else:
            if primeira_vez == True:
                os.remove(arquivo)

                with open(file=arquivo, mode='w', encoding='utf8') as fp:
                    fp.write('data,hora,taxa\n')

                primeira_vez = False
           
        # Salvando dados no arquivo "taxa-cdi.csv"

        with open(file=arquivo, mode='a', encoding='utf8') as fp:
            fp.write(f'{data},{hora},{cdi}\n')

        time.sleep(2 + (random() - 0.5))
      

def grafico(arquivo):
    #example './taxa-cdi.csv'
    arquivo = arquivo + ".csv"
    df = pd.read_csv(arquivo)
    
    # Salvando no grafico

    grafico = sns.lineplot(x=df['hora'], y=df['taxa'])
    _ = grafico.set_xticklabels(labels=df['hora'], rotation=90)
    grafico.get_figure().savefig(f"{arquivo}.png")


# arquivo = argv[1]
arquivo = f"{argv[1]}"
gera_arquivo(arquivo=arquivo)
grafico(arquivo=arquivo)