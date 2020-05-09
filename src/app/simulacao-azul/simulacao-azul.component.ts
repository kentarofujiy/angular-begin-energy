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
      getHistorico() {
        // op1
        this.histKwhConsumoPontaTusd = 1;
        this.histTarPriceConsumoPontaTusd = 1;
        this.histPriceConsumoPontaTusd = 1;
        this.op1 = math.multiply(this.histTarPriceConsumoPontaTusd, this.histKwhConsumoPontaTusd) 
        if math.equal(this.op1, this.this.histPriceConsumoPontaTusd);
          console.log("gethist-op1 ok");
        else
          console.log("getdist-op1 error");
        end
        // op2
        this.histKwhConsumoForaPontaTusd = 1;
        this.histTarPriceConsumoForaPontaTusd = 1;
        this.histPriceConsumoForaPontaTusd = 1;
        // op3
        this.histKwhConsumoPontaTe = 1;
        this.histTarPriceConsumoPontaTe = 1;
        this.histPriceConsumoPontaTe = 1;
        // op4
        this.histKwhConsumoForaPontaTe = 1;
        this.histTarPriceConsumoForaPontaTe = 1;
        this.histPriceConsumoForaPontaTe = 1;
        // op5
        this.histKwhConsumoReativoExcedentePonta = 1;
        this.histTarPriceConsumoReativoExcedentePonta = 1;
        this.histPriceConsumoReativoExcedentePonta = 1;
        // op6
        this.histKwhConsumoReativoExcednteForaPonta = 1;
        this.histTarPriceConsumoReativoExcedenteForaPonta = 1;
        this.histPriceConsumoReativoExcedenteForaPonta = 1;
        //op7
        this.histPriceAdicionalBandeirasPonta = 1;
        //op8
        this.histPriceAdicionalBandeirasForaPonta = 1;
        //op9
        this.histKwhDemandaReativaExcedenteForaPontaTusd = 1;
        this.histTarDemandaReativaExcedenteForaPontaTusd = 19.5772335;
        this.histPriceDemandaReativaExcedenteForaPontaTusd = 1;
        //op10
        this.histKwhDemandaRegistradaKwPontaTusd = 0;
        this.histTarDemandaRegistradaKwPontaTusd = 0;
        this.histPriceDemandaRegistradaKwPontaTusd = 0;
        //op11
        this.histKwhDemandaRegistradaKwForaPontaTusd = 0;
        this.histTarDemandaRegistradaKwForaPontaTusd = 0;
        this.histPriceDemandaRegistradaKwForaPontaTusd = 0;
      }
  #2# Buscar tarifas da distribuidora do cliente para a modalidade origem no mes vigente
      1. Inicializar variaveis
      2. Função buscar variáveis no db
      getTarifaOrigem(origem: string) {
        //op 1
        this.tarOrigemPontaTusd = 1;
        //op 2
        this.tarOrigemForaPontaTusd = 1;
        //op 3
        this.tarOrigemPontaTe = 1;
        //op 4
        this.tarOrigemForaPontaTe = 1;
        //op 5
        this.tarOrigemConsumoReativoExcedentePonta = this.tarOrigemPontaTe;
        //op 6
        this.tarOrigemConsumoReativoExcedenteForaPonta = this.tarOrigemForaPontaTe;
        //op 7
        // Acidional bandeiras Ponta valor no histórico
        //op 8
        // Acidional bandeiras Fora Ponta valor no histórico
        //op 9
        this.tarOrigemDemandaReativaExcedenteForaPontaTusd = 1;
        //op 10
        this.tarOrigemDemandaRegistradaKwPontaTusd = 0;
        //op 11
        this.tarOrigemDemandaRegistradaKwForaPontaTusd = 1;

      }
  #3# Calcular o valor total da modalidade origem utilizando os valores do histório e 
      as tarifas da modalidade origem. 
      1. Inicializar variável para o valor calculado origem
      calcOrigem() {
        //op 1
        this.resPriceOrigemConsumoPontaTusd = 
        math.multiply(this.histKwhConsumoPontaTusd, this.tarOrigemPontaTusd);
        //op 2
        this.resPriceOrigemTotal =
        math.multiply(this.histKwhConsumoForaPontaTusd, this.tarOrigemForaPontaTusd);
        //op 3 
        this.resPriceOrigemConsumoPontaTe = 
        math.multiply(this.histKwhConsumoPontaTe, this.tarOrigemPontaTe);
        //op 4 
        this.resPriceOrigemConsumoForaPontaTe = 
        math.multiply(this.histKwhConsumoForaPontaTe, this.tarOrigemForaPontaTe);
        //op 5
        this.resPriceOrigemConsumoReativoExcedentePonta = 
        math.multiply(this.histKwhConsumoReativoExedentePonta, this.tarOrigemExcedentePonta);
        //op 6
        this.resPriceOrigemConsumoExcedenteForaPontaTe = 
        math.multiply(this.histKwhConsumoReativoExedenteForaPonta, this.tarOrigemConsumoReativoExcedenteForaPonta);
        //op 7
        this.resPriceOrigemAdicionalBandeirasPonta = this.histPriceAdicionalBandeirasPonta;
        //op 8
        this.resPriceOrigemAdicionalBandeirasForaPonta = this.histPriceAdicionalBandeirasForaPonta;
        //op 9 
        this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd =
        math.multiply(this.histKwhDemandaReativaExcedenteForaPontaTusd, this.tarOrigemDemandaReativaExcedenteForaPontaTusd);
        //op 10
        this.resPriceOrigemDemandaRegistradaKwPontaTusd =
        math.multiply(this.histKwhDemandaRegistradaKwPontaTusd, this.tarOrigemDemandaRegistradaKwPontaTusd);
        //op 11
        this.resPriceOrigemDemandaRegistradaKwForaPontaTusd =
        math.multiply(this.histKwhDemandaRegistradaKwForaPontaTusd, this.tarOrigemDemandaRegistradaKwForaPontaTusd);
        // total
        this.esPriceOrigemTotal =
        math.sum(
           this.resPriceOrigemConsumoPontaTusd,        //op 1
           this.resPriceOrigemConsumoForaPontaTusd,    //op 2
           this.resPriceOrigemConsumoPontaTe,          //op 3
           this.resPriceOrigemConsumoForaPontaTe,      //op 4
           this.resPriceOrigemConsumoReativoExcedentePonta, //op 5
           this.resPriceOrigemConsumoReativoExcedenteForaPonta,  //op6
           this.resPriceOrigemAdicionalBandeirasPonta, //op 7
           this.resPriceOrigemAdicionalBandeirasForaPonta, //op 8
           this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd, //op 9
           this.resPriceOrigemDemandaRegistradaKwPontaTusd, //op 10
           this.resPriceOrigemDemandaRegistradaKwForaPontaTusd, //op 11
        ) 
        return resPriceOrigemTotal
      }
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
    hist => histórico de consumo
    Kwh => valores não monetários
    Price => valores monetários
    res => resultado de operação
    origem => modalidade do cliente antes da categoria
    destino => modalidade a ser simulada
    calc ou calculo => simulação base sem slider
    simulacao => valor resultante de novo calculo baseado no valor do slider
    helperKwh => váriável de suporte com valor em Kwh ou similar
    helperPrice => variável de suporte com valor em Reais
    info => dados que são são valorem em Reais ou Kwh ou similar
    X => indica resultado de comparação de dois valores
    fator => variável recalculada antes da operacao
    ---------------------------------------------------------------------------------------
    operation  helpers */
      op1: any = 1;
    
    /*s/n helpers */
      origem: any = '';
      destino: any = '';
      resHelperInfoStatusHistXOrigem: any = 1;

    /*
    1. histórico
      histKwhNomeDaVariável -> Valores Kwh ou similar */
      //op 1
      histKwhConsumoPontaTusd: any = 1;
      histTarPriceConsumoPontaTusd: any = 1;
      histPriceConsumoPontaTusd: any = 1;
      //op 2
      histKwhConsumoForaPontaTusd: any = 1;
      histTarPriceConsumoForaPontaTusd: any = 1;
      histPriceConsumoForaPontaTusd: any = 1;
      //op 3
      histKwhConsumoPontaTe: any = 1;
      histTarPriceConsumoPontaTe: any = 1;
      histPriceConsumoPontaTe: any = 1;
      //op 4
      histKwhConsumoForaPontaTe: any = 1;
      histTarPriceConsumoForaPontaTe: any = 1;
      histPriceConsumoForaPontaTe: any = 1;
      //op 5
      histKwhConsumoReativoExedentePonta: any = 1;
      histTarConsumoReativoExcedentePonta: any = 1;
      histPriceConsumoReativoExcedentePonta: any = 1;
      //op 6
      histKwhConsumoReativoExedenteForaPonta: any = 1;
      histTarConsumoReativoExcedenteForaPonta: any = 1;
      histPriceConsumoReativoExcedenteForaPonta: any = 1;
      //op 7
      histPriceAdicionalBandeirasPonta: any = 1;
      //op 8
      histPriceAdicionalBandeirasForaPonta: any = 1;
      //op 9 (Demanda reativa excedente  Ponta não aparece em nenhuma tabela)
      histKwhDemandaReativaExcedenteForaPontaTusd: any = 1;
      histTarDemandaReativaExcedenteForaPontaTusd: any = 1;
      histPriceDemandaReativaExcedenteForaPontaTusd: any = 1;
      //op 10 (Não usada na origem verde)
      histKwhDemandaRegistradaKwPontaTusd: any = 0;
      histTarDemandaRegistradaKwPontaTusd: any = 0;
      histPriceDemandaRegistradaKwPontaTusd: any = 0;
      //op 11 (Não usada na origem verde)
      histKwhDemandaRegistradaKwForaPontaTusd: any = 0;
      histTarDemandaRegistradaKwForaPontaTusd: any = 0;
      histPriceDemandaRegistradaKwForaPontaTusd: any = 0;

      /*histPriceNomeDaVariável -> Valores em Reais
    2. tarifas
      tarOrigemNomeDaVariavel -> Tarifas modalidade atual */
      //op1
      tarOrigemPontaTusd: any = 1;
      //op2
      tarOrigemForaPontaTusd: any = 1;
      //op3
      tarOrigemPontaTe: any = 1;
      //op4
      tarOrigemForaPontaTe: any = 1;
      //op 5
      tarOrigemConsumoReativoExcedentePonta: any = 1;
      //op 6
      tarOrigemConsumoReativoExcedenteForaPonta: any = 1;
      //op 7
      // Acidional bandeiras Ponta valor no histórico
      //op 8
      // Acidional bandeiras Fora Ponta valor no histórico
      //op 9
      tarOrigemDemandaReativaExcedenteForaPontaTusd: any = 1;
      //op 10
      tarOrigemDemandaRegistradaKwPontaTusd: any = 0;
      //op 11
      tarOrigemDemandaRegistradaKwForaPontaTusd: any = 0;
      /*tarDestinoNomeDaVariavel -> Tarifas modalidae destino
    3. fatores dos cálculos
      3.1 origem
        resPriceOrigemNomeDoFator -> Fator cálculo origem em Reais */
        resPriceOrigemTotal: any = 1;
        //op1 
        resPriceOrigemConsumoPontaTusd: any = 1;
        //op2 
        resPriceOrigemConsumoForaPontaTusd: any = 1;
        //op3 
        resPriceOrigemConsumoPontaTe: any = 1;
        //op4 
        resPriceOrigemConsumoForaPontaTe: any = 1;
        //op5 
        resPriceOrigemConsumoReativoExcedentePonta: any = 1;
        //op6 
        resPriceOrigemConsumoReativoExcedenteForaPonta: any = 1;
        //op7
        resPriceOrigemAdicionalBandeirasPonta: any = 1;
        //op8
        resPriceOrigemAdicionalBandeirasForaPonta: any = 1;
        //op 9 
        resPriceOrigemDemandaReativaExcedenteForaPontaTusd: any = 1;
        //op 10
        resPriceOrigemDemandaRegistradaKwPontaTusd: any = 0;
        //op 11
        resPriceOrigemDemandaRegistradaKwForaPontaTusd: any = 0; 
        /*resKwhOrigemNomeDoFator -> Fator cálculo origem em Kwh ou Reais
      3.2 cálculo
        resPriceCalcNomeDoFator -> Fator cálculo calculo em Reais
        resKwhCalcNomeDoFator -> Fator cálculo calculo em Kwh ou Reais
      3.3 simulacao
        resPriceSimNomeDoFator -> Fator cálculo simulação em Reais
        resKwhSimNomeDoFator -> Fator cálculo simulação em Kwh ou Reais
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
    | 1       | 2        | 3     |  4           |  5            | 6                |  7              |  8            |  9               | 10                | 11              | 12          |  13          |  14            |    15          | 16          |   
    |variável | histKwh | hisTarOri | histPrice |  histKwhOrigem | tarPriceOrigem  |  resPriceOrigem | histKmhOrigem |  fatorKwhDestino | fatorPriceDestino | resPriceDestino |  histKwhSim | tarPriceSim  |   fatorKwhSim | 
    fatorPriceSim | resPriceSim |
    1.1 Consumo Ponta tusd
    1.2 {{ histKwhConsumoPontaTusd }}
    1.3 {{ histTarConsumoPontaTusd }}
    1.4 {{ histPriceConsumoPontaTusd }}
    1.5 {{ tarOrigemPontaTusd }}
    1.6 {{ resPriceOrigemConsumoPontaTusd }}

    2.1 Consumo Fora Ponta tusd
    2.2 {{ histKwhConsumoForaPontaTusd }}
    2.3 {{ histTarConsumoForaPontaTusd }}
    2.4 {{ histPriceConsumoForaPontaTusd }}
    2.5 {{ tarOrigemForaPontaTusd }}
    2.6 {{ resPriceOrigemConsumoForaPontaTusd }}

    3.1 Consumo Ponta TE
    3.2 {{ histKwhConsumoPontaTe }}
    3.3 {{ histTarConsumoPontaTe }}
    3.4 {{ histPriceConsumoPontaTe }}
    3.5 {{ tarOrigemPontaTe }}
    3.6 {{ resPriceOrigemConsumoPontaTe }}

    4.1 Consumo Fora Ponta TE
    4.2 {{ histKwhConsumoForaPontaTe }}
    4.3 {{ histTarConsumoForaPontaTe }}
    4.4 {{ histPriceConsumoForaPontaTe }}
    4.5 {{ tarOrigemForaPontaTe }}
    4.6 {{ resPriceOrigemConsumoForaPontaTe }}

    5.1 Consumo Reativo Exedente Ponta
    5.2 {{ histKwhConsumoReativoExcedentePonta }}
    5.3 {{ histTarConsumoReativoExcedentePonta }}
    5.4 {{ histPriceConsumoReativoExcedentePonta }}
    5.5 {{ tarOrigemConsumoReativoExcedenteForaPonta }}
    5.6 {{ resPriceOrigemConsumoReativoExcedentePonta }}

    6.1 Consumo Reativo Exedente Fora Ponta
    6.2 {{ histKwhConsumoReativoExcedenteForaPonta }}
    6.3 {{ histTarConsumoReativoExcedenteForaPonta }}
    6.4 {{ histPriceConsumoReativoExcedenteForaPonta }}
    6.5 {{ tarOrigemConsumoReativoExcedenteForaPonta }}
    6.6 {{ resPriceOrigemConsumoReativoExcedenteForaPonta }}

    7.1 Adicional Bandeiras Ponta
    7.2 'N/D'
    7.3 'N/D'
    7.4 {{ histPriceAdicionalBandeirasPonta }}
    7.5 'N/D'
    7.6 {{ resPriceOrigemAdicionalBandeirasPonta }}

    8.1 Adicional Bandeiras Fora Ponta
    8.2 'N/D'
    8.3 'N/D'
    8.4 {{ histPriceAdicionalBandeirasForaPonta }}
    8.5 'N/D'
    8.6 {{ resPriceOrigemAdicionalBandeirasForaPonta }}

    9.1 Demanda Reativa Exedente Fora Ponta TUSD
    9.2 {{ histKwhDemandaReativaExcedenteForaPontaTusd }}
    9.3 {{ histTarDemandaReativaExcedenteForaPontaTusd }}
    9.4 {{ histPriceDemandaReativaExcedenteForaPontaTusd }}
    9.5 {{ tarOrigemDemandaReativaExcedenteForaPontaTusd }}
    9.6 {{ resPriceOrigemDemandaReativaExcedenteForaPontaTusd }} 

    10.1 Demanda Registrada Ponta TUSD
    10.2 {{ histKwhDemandaRegistradaKwPontaTusd }}
    10.3 {{ histTarDemandaRegistradaKwPontaTusd }}
    10.4 {{ histPriceDemandaRegistradaKwPontaTusd }}
    10.5 {{ tarOrigemDemandaRegistradaKwPontaTusd }}
    10.6 {{ resPriceOrigemDemandaRegistradaKwPontaTusd }}

    11.1 Demanda Registrada Fora Ponta TUSD
    11.2 {{ histKwhDemandaRegistradaKwForaPontaTusd }}
    11.3 {{ histTarDemandaRegistradaKwForaPontaTusd }}
    11.4 {{ histPriceDemandaRegistradaKwForaPontaTusd }}
    11.5 {{ tarOrigemDemandaRegistradaKwForaPontaTusd }}
    11.6 {{ resPriceOrigemDemandaRegistradaForaPontaTusd }}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  #######################################################################################
  */

  constructor(
    public router: Router,

  ) { }

  ngOnInit() {
  }

}
