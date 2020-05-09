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
        // geral
        this.histPriceTotalFatura = 1;
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
        //op12
        this.histKwhDemandaNaoUtilizadaPonta = 0;
        this.histTarDemandaNaoUtilizadaPonta = 0;
        this.histPriceDemandaNaoUtilizadaPonta = 0;
        //op13
        this.histKwhDemandaNaoUtilizadaForaPonta = 0;
        this.histTarDemandaNaoUtilizadaForaPonta = 0;
        this.histPriceDemandaNaoUtilizadaForaPonta = 0;
        //op14
        this.histKwhUltrapassagemDemandaPonta = 0;
        this.histTarUltrapassagemDemandaPonta = 0;
        this.hisPriceUltrapassagemDemandaPonta = 0;
        //op15
        this.histKwhUltrapassagemDemandaForaPonta = 0;
        this.histTarUltrapassagemDemandaForaPonta = 0;
        this.hisPriceUltrapassagemDemandaForaPonta = 0;
        //op16
        this.histPriceOutros = 0;
      }
  #2# Buscar tarifas da distribuidora do cliente para a modalidade origem no mes vigente
      1. Inicializar variaveis
      2. Função buscar variáveis no db
      getTarifaOrigem(origem: string) {
        //op1
        this.tarOrigemPontaTusd = 1;
        //op2
        this.tarOrigemForaPontaTusd = 1;
        //op3
        this.tarOrigemPontaTe = 1;
        //op4
        this.tarOrigemForaPontaTe = 1;
        //op5
        this.tarOrigemConsumoReativoExcedentePonta = this.tarOrigemPontaTe;
        //op6
        this.tarOrigemConsumoReativoExcedenteForaPonta = this.tarOrigemForaPontaTe;
        //op7
        // Acidional bandeiras Ponta valor no histórico
        //op8
        // Acidional bandeiras Fora Ponta valor no histórico
        //op9
        this.tarOrigemDemandaReativaExcedenteForaPontaTusd = 1;
        //op10
        this.tarOrigemDemandaRegistradaKwPontaTusd = 0;
        //op11
        this.tarOrigemDemandaRegistradaKwForaPontaTusd = 1;
        //op12
        this.tarOrigemDemandaNaoUtilizadaPonta = 0;
        //op13
        this.tarOrigemDemandaNaoUtilizadaForaPonta = 0;
        //op14
        this.tarOrigemDemandaNaoUtilizadaPonta = 0;
        //op15
        this.tarOrigemDemandaNaoUtilizadaForaPonta = 0;
        //op16
        // outros tao tem tarifa
     

      }
  !!!! ATENÇÃO antes do calculo Origem existem variaveis que precisam ser calculadas!!!!!!!
      1. Tolerância Contrato Ponta
      2. Tolerância Contrato Fora Ponta
      3. Ultrapassagem Demanda Ponta op14
      4. Ultrapassagem Demanda Fora Ponta op 15
      // se o resultado for negativo inverter e passar para
      5. Demanda não utilizada Ponta
      6. Demanada não utilizada Fora Ponta

      calcToleranciaPonta() {
        resKwhToleranciaDemandaContratadaPonta = 
        math.multiply(this.histKwhDemandaContratadaPonta, 1.05);
      }

      calcToleranciaForaPonta() {
        resKwhToleranciaDemandaContratadaForaPonta = 
        math.multiply(this.histKwhDemandaContratadaForaPonta, 1.05);
      }

      // esta Função  retorna a quantidade de horas de ultrapassagem a ser cobrada em cada posto. 
      // como ela utiliza o valor do cálculo da tolerância como parâmetro, caso esste seja zeno
      // ela também retorna zero. 
      setUltrapassagemDemanda() {
        resKwhUltrapassagemDemandaPagarPonta = 
        math.subtract(this.resKwhToleranciaDemandaContratadaPonta, this.histKwhDemandaRegistradaKwPontaTusd);
        resKwhUltrapassagemDemandaPagarForaPonta = 
        math.subtract(this.resKwhToleranciaDemandaContratadaForaPonta, this.histKwhDemandaRegistradaKwForaPontaTusd);
      
      }
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  #3# Calcular o valor total da modalidade origem utilizando os valores do histório e 
      as tarifas da modalidade origem. 
      1. Inicializar variável para o valor calculado origem
      calcOrigem() {
        //op1
        this.resPriceOrigemConsumoPontaTusd = 
        math.multiply(this.histKwhConsumoPontaTusd, this.tarOrigemPontaTusd);
        //op2
        this.resPriceOrigemTotal =
        math.multiply(this.histKwhConsumoForaPontaTusd, this.tarOrigemForaPontaTusd);
        //op3 
        this.resPriceOrigemConsumoPontaTe = 
        math.multiply(this.histKwhConsumoPontaTe, this.tarOrigemPontaTe);
        //op4 
        this.resPriceOrigemConsumoForaPontaTe = 
        math.multiply(this.histKwhConsumoForaPontaTe, this.tarOrigemForaPontaTe);
        //op5
        this.resPriceOrigemConsumoReativoExcedentePonta = 
        math.multiply(this.histKwhConsumoReativoExedentePonta, this.tarOrigemExcedentePonta);
        //op6
        this.resPriceOrigemConsumoExcedenteForaPontaTe = 
        math.multiply(this.histKwhConsumoReativoExedenteForaPonta, this.tarOrigemConsumoReativoExcedenteForaPonta);
        //op7
        this.resPriceOrigemAdicionalBandeirasPonta = this.histPriceAdicionalBandeirasPonta;
        //op8
        this.resPriceOrigemAdicionalBandeirasForaPonta = this.histPriceAdicionalBandeirasForaPonta;
        //op9 
        this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd =
        math.multiply(this.histKwhDemandaReativaExcedenteForaPontaTusd, this.tarOrigemDemandaReativaExcedenteForaPontaTusd);
        //op10
        this.resPriceOrigemDemandaRegistradaKwPontaTusd =
        math.multiply(this.histKwhDemandaRegistradaKwPontaTusd, this.tarOrigemDemandaRegistradaKwPontaTusd);
        //op11
        this.resPriceOrigemDemandaRegistradaKwForaPontaTusd =
        math.multiply(this.histKwhDemandaRegistradaKwForaPontaTusd, this.tarOrigemDemandaRegistradaKwForaPontaTusd);
        //op12 (caso o cliente tenha um contrato esse é o Kw do contrato - a demanda registrada, a tarifa é zero, o resultado deve ser zero)
        this.resPriceOrigemDemandaNaoUtilizadaPonta =
        math.multiply(this.histKwhDemandaNaoUtilizadaPonta, this.tarOrigemDemandaNaoUtilizadaPonta);
        //op13
        this.resPriceOrigemDemandaNaoUtilizadaForaPonta =
        math.multiply(this.histKwhDemandaNaoUtilizadaForaPonta, this.tarOrigemDemandaNaoUtilizadaForaPonta);
        //op14
        this.resPriceOrigemUltrapassagemDemandaPonta =
        math.multiply(this.resKwhUltrapassagemDemandaPagarPonta, this.tarOrigemUltrapassagemDemandaPonta);
        //op15
        this.resPriceOrigemUltrapassagemDemandaForaPonta =
        math.multiply(this.resKwhUltrapassagemDemandaPagarForaPonta, this.tarOrigemUltrapassagemDemandaForaPonta);
        //op16
        this.resPriceOrigemOutros = this.histPriceOutros;

        // total
        this.esPriceOrigemTotal =
        math.sum(
           this.resPriceOrigemConsumoPontaTusd,                                     //op1
           this.resPriceOrigemConsumoForaPontaTusd,                                 //op2
           this.resPriceOrigemConsumoPontaTe,                                       //op3
           this.resPriceOrigemConsumoForaPontaTe,                                   //op4
           this.resPriceOrigemConsumoReativoExcedentePonta,                         //op5
           this.resPriceOrigemConsumoReativoExcedenteForaPonta,                     //op6
           this.resPriceOrigemAdicionalBandeirasPonta,                              //op7
           this.resPriceOrigemAdicionalBandeirasForaPonta,                          //op8
           this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd,                 //op9
           this.resPriceOrigemDemandaRegistradaKwPontaTusd,                         //op10
           this.resPriceOrigemDemandaRegistradaKwForaPontaTusd,                     //op11
           this.resPriceOrigemDemandaNaoUtilizadaPonta,                             //op12
           this.resPriceOrigemDemandaNaoUtilizadaForaPonta,                         //op13
           this.resPriceOrigemUltrapassagemDemandaPonta,                            //op14
           this.resPriceOrigemUltrapassagemDemandaForaPonta,                        //op15
           this.resPriceOrigemOutros                                                //op16
        ) 
        return resPriceOrigemTotal
      }
      2. Inicializar variável para o status da comparacao histórico X calculado
      // inicializado no helpers
      calcHistXoriginVariation() {
        this.resHelperHistXOrigemLimit =
        math.multiply(this.histPriceTotalFatura, 1.10);
        if this.resPriceOrigemTotal >= this.resHelperHistXOrigemLimit {
          this.resHelperInfoStatusHistXOrigem = 'Histórico e origem não batem'
        } else {
          'Histórico e origem batem'
        }
      }
  
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
      resHelperHistXOrigemLimit: any = 1;
      resHelperHistXOrigemDifference: any = 1;
      resHelperInfoStatusHistXOrigem: any = '';
    /*
    1. histórico
      histKwhNomeDaVariável -> Valores Kwh ou similar */
      //geral
      histPriceTotalFatura: any = 0;
      histKwhDemandaContratadaPonta: any = 0;
      histKwhDemandaContratadaForaPonta: any = 0;
      resKwhToleranciaDemandaContratadaPonta: any = 0;
      resKwhToleranciaDemandaContratadaForaPonta: any = 0;
      resKwhUltrapassagemDemandaPagarPonta: any = 0;
      resKwhUltrapassagemDemandaPagarForaPonta: any = 0;
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
      //op12 Demanda não utilizada ponta
      histKwhDemandaNaoUtilizadaPonta: any = 0;
      histTarDemandaNaoUtilizadaPonta: any = 0;
      histPriceDemandaNaoUtilizadaPonta: any = 0;
      //op13 Demanda não utilizada Fora ponta
      histKwhDemandaNaoUtilizadaForaPonta: any = 0;
      histTarDemandaNaoUtilizadaForaPonta: any = 0;
      histPriceDemandaNaoUtilizadaForaPonta: any = 0;
      //op14 
      histKwhUltrapassagemDemandaPonta: any = 0;
      histTarUltrapassagemDemandaPonta: any = 0;
      histPriceUltrapassagemDemandaPonta: any = 0;
      //op15 
      histKwhUltrapassagemDemandaForaPonta: any = 0;
      histTarUltrapassagemDemandaForaPonta: any = 0;
      histPriceUltrapassagemDemandaForaPonta: any = 0;
      //op15 outros somente um valor
      histPriceOutros: any = 0;

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
      //op5
      tarOrigemConsumoReativoExcedentePonta: any = 1;
      //op6
      tarOrigemConsumoReativoExcedenteForaPonta: any = 1;
      //op7
      // Acidional bandeiras Ponta valor no histórico
      //op8
      // Acidional bandeiras Fora Ponta valor no histórico
      //op9
      tarOrigemDemandaReativaExcedenteForaPontaTusd: any = 1;
      //op10
      tarOrigemDemandaRegistradaKwPontaTusd: any = 0;
      //op11
      tarOrigemDemandaRegistradaKwForaPontaTusd: any = 0;
      //op12 
      tarOrigemDemandaNaoUtilizadaPonta: any = 0;
      //op13 
      tarOrigemDemandaNaoUtilizadaForaPonta: any = 0;
      //op14
      tarOrigemUltrapassagemDemandaPonta: any = 0;
      //op15
      tarOrigemUltapassagemDemandaForaPonta: any = 0;
      //op16
      // outros nao tem tarifa
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
        //op9 
        resPriceOrigemDemandaReativaExcedenteForaPontaTusd: any = 1;
        //op10
        resPriceOrigemDemandaRegistradaKwPontaTusd: any = 0;
        //op11
        resPriceOrigemDemandaRegistradaKwForaPontaTusd: any = 0;
        //op12
        resPriceOrigemDemandaNaoUtilizadaPonta: any = 0;
        //op13
        resPriceOrigemDemandaNaoUtilizadaForaPonta: any = 0;
        //op14
        resPriceOrigemUltrapassagemDemandaPonta: any = 0;
        //op15 
        resPriceOrigemUltrapassagemDemandaForaPonta: any = 0;
        //op16
        resPriceOrigemOutros: any = 0;
        //
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
    3. Kwh destino*/
        //op1 
        kwhDestinoConsumoPontaTusd: any = 1;
        //op2 
        kwhDestinoConsumoForaPontaTusd: any = 1;
        //op3 
        kwhDestinoConsumoPontaTe: any = 1;
        //op4 
        kwhDestinoConsumoForaPontaTe: any = 1;
        //op5 
        kwhDestinoConsumoReativoExcedentePonta: any = 1;
        //op6 
        kwhDestinoConsumoReativoExcedenteForaPonta: any = 1;
        //op7
        kwhDestinoAdicionalBandeirasPonta: any = 1;
        //op8
        kwhDestinoAdicionalBandeirasForaPonta: any = 1;
        //op9 
        kwhDestinoDemandaReativaExcedenteForaPontaTusd: any = 1;
        //op10
        kwhDestinoDemandaRegistradaKwPontaTusd: any = 0;
        //op11
        kwhDestinoDemandaRegistradaKwForaPontaTusd: any = 0;
        //op12
        kwhDestinoDemandaNaoUtilizadaPonta: any = 0;
        //op13
        kwhDestinoDemandaNaoUtilizadaForaPonta: any = 0;
        //op14
        kwhDestinoUltrapassagemDemandaPonta: any = 0;
        //op15 
        kwhDestinoUltrapassagemDemandaForaPonta: any = 0;
        //op16
        kwhDestinoOutros: any = 0;
   /* 3. Tarifas destino */
     //op1
      tarDestinoPontaTusd: any = 1;
      //op2
      tarDestinoForaPontaTusd: any = 1;
      //op3
      tarDestinoPontaTe: any = 1;
      //op4
      tarDestinoForaPontaTe: any = 1;
      //op5
      tarDestinoConsumoReativoExcedentePonta: any = 1;
      //op6
      tarDestinoConsumoReativoExcedenteForaPonta: any = 1;
      //op7
      // Acidional bandeiras Ponta valor no histórico
      //op8
      // Acidional bandeiras Fora Ponta valor no histórico
      //op9
      tarDestinoDemandaReativaExcedenteForaPontaTusd: any = 1;
      //op10
      tarDestinoDemandaRegistradaKwPontaTusd: any = 0;
      //op11
      tarDestinoDemandaRegistradaKwForaPontaTusd: any = 0;
      //op12 
      tarDestinoDemandaNaoUtilizadaPonta: any = 0;
      //op13 
      tarDestinoDemandaNaoUtilizadaForaPonta: any = 0;
      //op14
      tarDestinoUltrapassagemDemandaPonta: any = 0;
      //op15
      tarDestinoUltapassagemDemandaForaPonta: any = 0;
      //op16
      // outros nao tem tarifa
  /*  4. Variaveis resultado origem */
        resPriceDestinoTotal: any = 1;
        //op1 
        resPriceDestinoConsumoPontaTusd: any = 1;
        //op2 
        resPriceDestinoConsumoForaPontaTusd: any = 1;
        //op3 
        resPriceDestinoConsumoPontaTe: any = 1;
        //op4 
        resPriceDestinoConsumoForaPontaTe: any = 1;
        //op5 
        resPriceDestinoConsumoReativoExcedentePonta: any = 1;
        //op6 
        resPriceDestinoConsumoReativoExcedenteForaPonta: any = 1;
        //op7
        resPriceDestinoAdicionalBandeirasPonta: any = 1;
        //op8
        resPriceDestinoAdicionalBandeirasForaPonta: any = 1;
        //op9 
        resPriceDestinoDemandaReativaExcedenteForaPontaTusd: any = 1;
        //op10
        resPriceDestinoDemandaRegistradaKwPontaTusd: any = 0;
        //op11
        resPriceDestinoDemandaRegistradaKwForaPontaTusd: any = 0;
        //op12
        resPriceDestinoDemandaNaoUtilizadaPonta: any = 0;
        //op13
        resPriceDestinoDemandaNaoUtilizadaForaPonta: any = 0;
        //op14
        resPriceDestinoUltrapassagemDemandaPonta: any = 0;
        //op15 
        resPriceDestinoUltrapassagemDemandaForaPonta: any = 0;
        //op16
        resPriceDestinoOutros: any = 0;  
  /*  5. Variaveis resultado destino
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
    |variável | histKwh | hisTarOri | histPrice |  histKwhOrigem | tarPriceOrigem  |  resPriceOrigem | histKmhOrigem |  fatorKwhDestino | fatorPriceDestino | resPriceDestino |  histKwhSim | tarPriceSim  |   fatorKwhSim |   fatorPriceSim | resPriceSim |
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

    12.1 Demanda Não Utilizada Ponta
    12.2 {{ histKwhDemandaNaoUtilizadaPonta }}
    12.3 {{ histTarDemandaNaoUtilizadaPonta }}
    12.4 {{ histPriceDemandaNaoUtilizadaPonta }}
    12.5 {{ tarOrigemDemandaNaoUtilizadaPonta }}
    12.6 {{ resPriceOrigemDemandaNaoUtilizadaPonta }}

    13.1 Demanda Não Utilizada Fora Ponta
    13.2 {{ histKwhDemandaNaoUtilizadaForaPonta }}
    13.3 {{ histTarDemandaNaoUtilizadaForaPonta }}
    13.4 {{ histPriceDemandaNaoUtilizadaForaPonta }}
    13.5 {{ tarOrigemDemandaNaoUtilizadaForaPonta }}
    13.6 {{ resPriceOrigemDemandaNaoUtilizadaForaPonta }}

    14.1 Ultrapassagem Demanda Contratada Ponta
    14.1 {{ histKwhUltrapassagemDemandaPonta }}
    14.2 {{ histTarUltrapassagemDemandaPonta }}
    14.3 {{ histPriceUltrapassagemDemandaPonta }}
    14.4 {{ tarOrigemUltrapassagemDemandaPonta }}
    14.6 {{ resPriceOrigemUltrapassagemDemandaPonta }}

    15.1 Ultrapassagem Demanda Contratada Fora Ponta
    15.1 {{ histKwhUltrapassagemDemandaForaPonta }}
    15.2 {{ histTarUltrapassagemDemandaForaPonta }}
    15.3 {{ histPriceUltrapassagemDemandaForaPonta }}
    15.4 {{ tarOrigemUltrapassagemDemandaForaPonta }}
    15.6 {{ resPriceOrigemUltrapassagemDemandaForaPonta }}

    16.1 Outros
    16.2 'N/D'
    16.3 'N/D'
    16.4 {{ histPriceOutros }}
    16.5 'N/D'
    15.6 {{ resPriceOrigemOutros }}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  #######################################################################################
  */

  constructor(
    public router: Router,

  ) { }

  ngOnInit() {
  }

}
