import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as math from "mathjs";
import { Options } from "ng5-slider";
import { ChartOptions, ChartType, ChartDataSets } from 'chartjs';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulacao-azul',
  templateUrl: './simulacao-azul.component.html',
  styleUrls: ['./simulacao-azul.component.css']
})
export class SimulacaoAzulComponent implements OnInit {
  /*
  ########################## SIMULACAO VERDE PARA AZUL ##################################
  ********************* considerar os dados necessários para o cálculo ******************
  #1# Buscar histórico de consumo:
      1. Inicializar variaveis
      2. Função buscar variáveis no db
  #2# Buscar tarifas da distribuidora do cliente para a modalidade origem no mes vigente
      1. Inicializar variaveis
      2. Função buscar variáveis no db
  #3# Calcular o valor total da modalidade origem utilizando os valores do histório e 
      as tarifas da modalidade origem. 
      1. Inicializar variável para o valor calculado origem
      2. Inicializar variável para o status da comparacao histórico X calculado
      3. Tratar erro caso a diferença seja maior que o limite
      #3.1# Informar se o cálculo é exatamente igual
      #3.2# Se não for igual passar se a diferença for inferior a 5% erro se maior
      4. Chamar função snapshot
  #4# Inicializar a simulação destino azul transferindo os valores que não se alteram
      1. Inicializar variáveis dos resultados de cada operacao
      2. Inicializar as variaveis das tarifas destino
      3. Função buscar tarifas destino
      4. Transferir do histórico, os valores das variáveis que não precisam ser calculadas
  #5#. Inicializar como 1 as variáveis a serem calculadas
        5.1. Inicializar variaveis a serem calculadas
        5.2. Inicializar fatores do cácculo   
  #6# Calcular fator multiplicador base
    1. Inicializar variável para o fator
    2. Inicializar variável para o Consumo Ponta calculado
    3. Inicializar variável para o Consumo Ponta simulado
    4. Inicializar variável para o valor máximo do multiplicador
  #7# Cálculo destino base
        5.1. Inicializar variaveis a serem calculadas
        5.2. Inicializar fatores do cácculo
        5.3  Função calculo base
        5.4  Chamar snapshot
  #8# Calcular disponibilidade energética nesse caso
    1. Inicializar variável para a disponibilidade energética origiem
    2. Inicializar variável para a disponibilidade energética calculada
    3. Inicializar variável para a disponibilidade energética simulada
    4. Inicializar variável para os fatores do cálculo da disponibilide energética
  #9# Calcular perde-ganha
    1. Inicializar variável para o perde-ganha calculado
    2. Inicializar variável para o perde-ganha simulado
  #10# Plotar grafico perde-ganha
    1. Inicializar gráfico
    2. Passar valores
  #11# Plotar grafico de linha
    1. Inicializar gráfico
    2. Passar valores
  #12# Serializar tudo em um Array de cenarios Json para snapshot
    1. Inicializar variáveis referentes para espelhar todas as demais variáveis
    2. Nomear cada snapshot nomedocliente_origem_destino_datetimenow
    3. Função push para o db a cada simulacao
    4. Funcção resetar variáveis
  #13# Inicializar slider
    1. Inicializar variável para o valor numérico do slider
    2. Inicializar variável para o valor percentual do slider
    3. Inicializar variável para o valor máximo do slider
      3.1. Setar valor máximo do slider igual ao multiplicador base máximo
  #14# Atualzar o calculo utilizando o valor do slider
    1. Inicializar variáves para o cálculo simulado
    2. Função cálculo simulado
    4. Atualizar gráficos
    3. Chamar snapshot



    ------------------- LISTA VARIÁVEIS PARA MÓDULO ------------------------------------
    ********* CONVENÇÃO SINTAXE  ************************
    1. 
    *****************************************************

    1. Variáveis histórico
    2. Tarifas origem
    3. Tarifas destino
    4. Variaveis resultado origem
    5. Variaveis resultado destino
    6. Variáveis resultado simulacao
    7. Variáveis slider
    8. Variáveis disponibilidade energética
    9. Variáveis perde-ganha
    10. Campilado todas variáveis para snapshot
      10.1  Informações cliente, mes, tipo de simulacao
      10.2. origem
      10.3. calculado
      10.4. simulado  

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    -------------------- DISPLAY -------------------------------------------------------
    1. Tabela Dados gerais
    | 1       | 2        | 3     | 
    |variável | kwhHist | tarOri |
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  #######################################################################################
  */

  constructor(
    public router: Router,

  ) { }

  ngOnInit() {
  }

}

op$*1