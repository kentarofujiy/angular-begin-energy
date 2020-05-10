import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as math from "mathjs";
import { Options } from "ng5-slider";
import { ChartOptions, ChartType, ChartDataSets } from "chartjs";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import { Router } from "@angular/router";
import { OrigemVerdeGetHistoryService } from "../shared/origem-verde-get-history.service";
import * as pluginAnnotations from "chartjs-plugin-annotation";

@Component({
  selector: "app-simulacao-azul",
  templateUrl: "./simulacao-azul.component.html",
  styleUrls: ["./simulacao-azul.component.css"]
})
export class SimulacaoAzulComponent implements OnInit {
  /////////////////////////// INICIALIZACAO DAS VARIAVEIS ////////////////////////////////////
  // VARIAVEIS ORIGEM
  /*s/n helpers */
  op1: any = 1;
  origem: any = "";
  destino: any = "";
  resHelperHistXOrigemLimit: any = 1;
  resHelperHistXOrigemDifference: any = 1;
  resHelperInfoStatusHistXOrigem: any = "";
  helperFatorBase: any = 1;
  resHelperKwhPercentualForaPonta: any = 1;
  resHelperPercentualDestinoBase: any = 1;

  /*
    1. histórico */
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
  histKwhConsumoReativoExcedentePonta: any = 1;
  histTarConsumoReativoExcedentePonta: any = 1;
  histPriceConsumoReativoExcedentePonta: any = 1;
  //op 6
  histKwhConsumoReativoExcedenteForaPonta: any = 1;
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

  /*    2. tarifas */
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
  /*   3. fatores dos cálculos
      3.1 origem */
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
  tarOrigemUltrapassagemDemandaForaPonta: any = 0;
  //op16
  resPriceOrigemOutros: any = 0;
  // FIM VARIAVEIS ORIGEM
  // ############################################################################=
  // VARIAVEIS DESTINO
  //3. Kwh destino*/
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
  tarDestinoUltrapassagemDemandaForaPonta: any = 0;
  //op16
  // outros nao tem tarifa
  /*  4. Variaveis resultado origem */
  resPriceDestinoTotal: any = 1;
  resDestinoKwhPontaTusd: any = 1;
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
  // FIM VARIAVEIS DESTINO

  // VARIAVEIS SIMULACAO
  resHelperPercentualSimulacaoSlider: any = 1;
  resHelperKwhSimulacaoPercentualForaPonta: any = 1;
  //3. Kwh simulacao*/
  //op1
  kwhSimulacaoConsumoPontaTusd: any = 1;
  //op2
  kwhSimulacaoConsumoForaPontaTusd: any = 1;
  //op3
  kwhSimulacaoConsumoPontaTe: any = 1;
  //op4
  kwhSimulacaoConsumoForaPontaTe: any = 1;
  //op5
  kwhSimulacaoConsumoReativoExcedentePonta: any = 1;
  //op6
  kwhSimulacaoConsumoReativoExcedenteForaPonta: any = 1;
  //op7
  kwhSimulacaoAdicionalBandeirasPonta: any = 1;
  //op8
  kwhSimulacaoAdicionalBandeirasForaPonta: any = 1;
  //op9
  kwhSimulacaoDemandaReativaExcedenteForaPontaTusd: any = 1;
  //op10
  kwhSimulacaoDemandaRegistradaKwPontaTusd: any = 0;
  //op11
  kwhSimulacaoDemandaRegistradaKwForaPontaTusd: any = 0;
  //op12
  kwhSimulacaoDemandaNaoUtilizadaPonta: any = 0;
  //op13
  kwhSimulacaoDemandaNaoUtilizadaForaPonta: any = 0;
  //op14
  kwhSimulacaoUltrapassagemDemandaPonta: any = 0;
  //op15
  kwhSimulacaoUltrapassagemDemandaForaPonta: any = 0;
  //op16
  kwhSimulacaoOutros: any = 0;
  /* 3. Tarifas destino */
  //op1
  tarSimulacaoPontaTusd: any = 1;
  //op2
  tarSimulacaoForaPontaTusd: any = 1;
  //op3
  tarSimulacaoPontaTe: any = 1;
  //op4
  tarSimulacaoForaPontaTe: any = 1;
  //op5
  tarSimulacaoConsumoReativoExcedentePonta: any = 1;
  //op6
  tarSimulacaoConsumoReativoExcedenteForaPonta: any = 1;
  //op7
  // Acidional bandeiras Ponta valor no histórico
  //op8
  // Acidional bandeiras Fora Ponta valor no histórico
  //op9
  tarSimulacaoDemandaReativaExcedenteForaPontaTusd: any = 1;
  //op10
  tarSimulacaoDemandaRegistradaKwPontaTusd: any = 0;
  //op11
  tarSimulacaoDemandaRegistradaKwForaPontaTusd: any = 0;
  //op12
  tarSimulacaoDemandaNaoUtilizadaPonta: any = 0;
  //op13
  tarSimulacaoDemandaNaoUtilizadaForaPonta: any = 0;
  //op14
  tarSimulacaoUltrapassagemDemandaPonta: any = 0;
  //op15
  tarSimulacaoUltrapassagemDemandaForaPonta: any = 0;
  //op16
  // outros nao tem tarifa
  /*  4. Variaveis resultado origem */
  resPriceSimulacaoTotal: any = 1;
  resSimulacaoKwhPontaTusd: any = 1;
  //op1
  resPriceSimulacaoConsumoPontaTusd: any = 1;
  //op2
  resPriceSimulacaoConsumoForaPontaTusd: any = 1;
  //op3
  resPriceSimulacaoConsumoPontaTe: any = 1;
  //op4
  resPriceSimulacaoConsumoForaPontaTe: any = 1;
  //op5
  resPriceSimulacaoConsumoReativoExcedentePonta: any = 1;
  //op6
  resPriceSimulacaoConsumoReativoExcedenteForaPonta: any = 1;
  //op7
  resPriceSimulacaoAdicionalBandeirasPonta: any = 1;
  //op8
  resPriceSimulacaoAdicionalBandeirasForaPonta: any = 1;
  //op9
  resPriceSimulacaoDemandaReativaExcedenteForaPontaTusd: any = 1;
  //op10
  resPriceSimulacaoDemandaRegistradaKwPontaTusd: any = 0;
  //op11
  resPriceSimulacaoDemandaRegistradaKwForaPontaTusd: any = 0;
  //op12
  resPriceSimulacaoDemandaNaoUtilizadaPonta: any = 0;
  //op13
  resPriceSimulacaoDemandaNaoUtilizadaForaPonta: any = 0;
  //op14
  resPriceSimulacaoUltrapassagemDemandaPonta: any = 0;
  //op15
  resPriceSimulacaoUltrapassagemDemandaForaPonta: any = 0;
  //op16
  resPriceSimulacaoOutros: any = 0;

  // FIM VARIAVEIS SIMULACAO

  /////////////////////////// FIM INICIALIZACAO DAS VARIAVEIS ////////////////////////////////////
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = ["Comparação Valor da Fatura"];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  // // grafico de linhas
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          id: "x-axis-0",
          position: "bottom"
        },
        {
          id: "x-axis-1",
          position: "top"
        }
      ],
      yAxes: [
        {
          id: "y-axis-1",
          position: "left",
          gridLines: {
            color: "blue"
          },
          ticks: {
            fontColor: "blue"
          }
        },
        {
          id: "y-axis-0",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)"
          },
          ticks: {
            fontColor: "red"
          }
        }
      ]
    },
    annotation: {
      annotations: []
    }
  };
  public lineChartColors: Color[] = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // dark grey
      backgroundColor: "#6ea8e137",
      borderColor: "blue",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  constructor(
    public router: Router,
    private verdehistory: OrigemVerdeGetHistoryService
  ) {}

  ngOnInit() {
    this.calculateHistorico();
    this.calculateOrigem();
    this.calculateDestino();
    this.calculateSimulacao();
    this.calculateLineGraph();
    this.updateGraficos();
  }

calculateHistorico() {
  this.getHistorico();
}
calculateOrigem() {
   this.getTarifaOrigem();
   this.calcToleranciaPonta();
   this.calcToleranciaForaPonta();
   this.setUltrapassagemDemanda();
   this.calcOrigem();
}
calculateDestino() {
    this.getTarifaDestino();
    this.calcKwhDestinoPontaTusd();
    this.calcDestino();
}
calculateSimulacao(){
    this.calcKwhSimulacaoPontaTusd();
    this.calcSimulacao();
}
calculateLineGraph() {
    this.lineFactors();
}
updateGraficos(){
    this.plotBarChart();
    this.plotLineChart();
}

  /////////////////////////// FUNCOES ////////////////////////////////////
  /*
    this.resHelperPercentualDestinoBase = 20;    
    this.resHelperKwhPercentualForaPonta =
    math.chain(this.histKwhDemandaRegistradaKwForaPontaTusd)
      .divide(100)
      .multiply(this.resHelperPercentualDestinoBase)
      .done()
    this.resDestinoKwhPontaTusd = 
    math.chain(this.resHelperKwhPercentualForaPonta)
      .multiply(3)
      .multiply(20)
      .done() 

  */
  /*
=> array de valores contendo objetos Json com: 
{ 
  "percentual": <integer>,
  "percentualdoconsumokwhforaponta": <bigint>,
  "valordafatura": <bigint>,
  "disponibilidadeenergetica": <bigint>
}
inputs:
histKwhConsumoForaPontaTusd
histKwhDemandaRegistradaKwForaPontaTusd
1. obter array contendo todos os valores referentes a divisão do consumo fora ponta de 1% ate 30%
2. multiplicar cada objeto desse array por 3 e depois por 20 e verificar se o valor obtido é inferior ao histKwhConsumoForaPontaTusd
fatoresGrafico = [
  {
  "percentual": 1,
  "fator": 1.46,
  "consumoponta": 123.123
  },
  {
    "percentual": 2,
    "fator": 2.92,
    "consumoponta": 123.123
  }
]

     .done() 
  this.resPriceDestinoConsumoPontaTusd =  
  math.multiply(this.resDestinoKwhPontaTusd, this.tarDestinoPontaTusd);

  this.resPriceDestinoConsumoPontaTe =
  math.multiply(this.resDestinoKwhPontaTusd, this.tarDestinoPontaTe);

  this.resPriceDestinoDemandaRegistradaKwPontaTusd =
  math.multiply(this.resHelperKwhPercentualForaPonta, this.tarOrigemDemandaRegistradaKwPontaTusd);

*/
sliderValor :any = 0;
valorForaPonta :any = 0;
sliderPorcentagem :any = 0;
sliderFator :any = 0; 
sliderPrecoPontaTusd :any = 0;
sliderPrecoPontaTe :any = 0;
sliderPrecoRegistrada :any = 0;
sliderParcialFatura :any = 0;
slideSomarFatura :any = 0;
slideTotalSimulacao :any = 0;
sliderSimulation() {
    //this.resHelperPercentualSimulacaoSlider = 55;
    this.resHelperKwhSimulacaoPercentualForaPonta = math
      .chain(this.histKwhDemandaRegistradaKwForaPontaTusd)
      .divide(100)
      .multiply(this.resHelperPercentualSimulacaoSlider)
      .done();
    this.resSimulacaoKwhPontaTusd = math
      .chain(this.resHelperKwhSimulacaoPercentualForaPonta)
      .multiply(3)
      .multiply(20)
      .done();
    this.resPriceSimulacaoConsumoPontaTusd = math.multiply(
      this.resSimulacaoKwhPontaTusd,
      this.tarDestinoPontaTusd
    );

    this.resPriceSimulacaoConsumoPontaTe = math.multiply(
      this.resSimulacaoKwhPontaTusd,
      this.tarDestinoPontaTe
    );

    this.resPriceSimulacaoDemandaRegistradaKwPontaTusd = math.multiply(
      this.resHelperKwhSimulacaoPercentualForaPonta,
      this.tarOrigemDemandaRegistradaKwPontaTusd
    );

}


  a: any = [];
  b: any = [];
  c: any = [];
  d: any = [];
  e: any = [];
  f: any = [];
  g: any = [];
  limite: any = 0;
  base: any = 0;
  percent: any = 0;
  fator: any = 0;
  tarifatusd: any = 0;
  tarifate: any = 0;
  tarifaregistrada: any = 0;
  pricepontatusd: any = 0;
  pricepontate: any = 0;
  precoregistrada: any = 0;
  parcialdafatura: any = 0;
  somarfatura: any = 0;
  totalfatura: any = 0;

  lineFactors() {
    this.base = 146;
    this.limite = 1778;
    this.tarifatusd = 0.082647415469211;
    this.tarifate = 0.4736207;
    this.tarifaregistrada = 41.6531028903238;

    this.parcialdafatura = math.sum(
      // this.resPriceOrigemConsumoPontaTusd,      
      this.resPriceOrigemConsumoForaPontaTusd, //op2
      //   this.resPriceOrigemConsumoPontaTe,      
      this.resPriceOrigemConsumoForaPontaTe, //op4
      this.resPriceOrigemConsumoReativoExcedentePonta, //op5
      this.resPriceOrigemConsumoReativoExcedenteForaPonta, //op6
      this.resPriceOrigemAdicionalBandeirasPonta, //op7
      this.resPriceOrigemAdicionalBandeirasForaPonta, //op8
      this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd, //op9
      //    this.resPriceOrigemDemandaRegistradaKwPontaTusd,               
      this.resPriceOrigemDemandaRegistradaKwForaPontaTusd, //op11
      this.resPriceOrigemDemandaNaoUtilizadaPonta, //op12
      this.resPriceOrigemDemandaNaoUtilizadaForaPonta, //op13
      this.resPriceOrigemUltrapassagemDemandaPonta, //op14
      this.resPriceDestinoUltrapassagemDemandaForaPonta, //op15
      this.resPriceOrigemOutros //op16
    );

    for (let i = 10; this.fator < this.limite; i++) {
      this.percent = math
        .chain(this.base)
        .divide(100)
        .multiply(i)
        .done();
      console.log("percent = " + this.percent);
      this.fator = math
        .chain(this.percent)
        .multiply(3)
        .multiply(20)
        .done();
      console.log("ponta = " + this.fator);
      this.a.push(this.fator);
      this.g.push(i + "%");
      this.pricepontatusd = math.multiply(this.fator, this.tarifatusd);
      console.log("preco ponta tusd = " + this.pricepontatusd);
      this.b.push(this.pricepontatusd);
      this.pricepontate = math.multiply(this.fator, this.tarifate);
      console.log("preco ponta te = " + this.pricepontate);
      this.c.push(this.pricepontate);
      this.precoregistrada = math.multiply(this.percent, this.tarifaregistrada);
      console.log("preco registrada = " + this.precoregistrada);
      this.d.push(this.precoregistrada);
      this.somarfatura = math.sum(
        this.pricepontatusd,
        this.pricepontate,
        this.precoregistrada
      );
      console.log("somar a fatura = " + this.somarfatura);
      this.e.push(this.somarfatura);
      this.totalfatura = math.sum(this.parcialdafatura, this.somarfatura);
      console.log("total da fatura = " + this.totalfatura);
      this.f.push(this.totalfatura);
    }
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
    console.log(this.d);
    console.log(this.e);
    console.log(this.f);
    console.log(this.g);
  }
  plotLineChart() {
    this.lineChartData = [
      // { data: this.f, label: 'Valor Fatura', yAxisID: 'y-axis-1'  },
      // { data: this.e, label: 'Custo Ponta', xAxisID: 'x-axis-1' },
      { data: this.f, label: "Valor Fatura (R$)", yAxisID: "y-axis-0" },
      {
        data: this.a,
        label: "Disponibilidade Energética (Kw)",
        yAxisID: "y-axis-1"
      }
    ];
    this.lineChartLabels = this.g;
    this.lineChartOptions.annotation.annotations = [
      {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: this.histPriceTotalFatura,
        borderColor: "orange",
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: "orange",
          content: "Fatura Origem - R$ " + this.histPriceTotalFatura
        }
      },
      {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-1",
        value: this.histKwhDemandaRegistradaKwForaPontaTusd,
        borderColor: "green",
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: "green",
          content:
            "Origem Demanda Ponta - Kw " +
            this.histKwhDemandaRegistradaKwForaPontaTusd
        }
      }
    ];
  }

  // funcoes historico e origem verde

  getHistorico() {
    // geral
    this.histPriceTotalFatura = 30666.18;
    this.histKwhDemandaContratadaPonta = 130;
    this.histKwhDemandaContratadaForaPonta = 0;
    // op1
    this.histKwhConsumoPontaTusd = 1778.596;
    this.histTarPriceConsumoPontaTusd = 1.0956842;
    this.histPriceConsumoPontaTusd = 0;
    this.op1 = math.multiply(
      this.histTarPriceConsumoPontaTusd,
      this.histKwhConsumoPontaTusd
    );
    if (math.equal(this.op1, this.histPriceConsumoPontaTusd))
      console.log("gethist-op1 ok");
    else console.log("getdist-op1 error");
    // op2
    this.histKwhConsumoForaPontaTusd = 54357.5;
    this.histTarPriceConsumoForaPontaTusd = 0.0826473;
    this.histPriceConsumoForaPontaTusd = 0;
    // op3
    this.histKwhConsumoPontaTe = 1778.596;
    this.histTarPriceConsumoPontaTe = 0.4736207;
    this.histPriceConsumoPontaTe = 0;
    // op4
    this.histKwhConsumoForaPontaTe = 54357.5;
    this.histTarPriceConsumoForaPontaTe = 0.2874082;
    this.histPriceConsumoForaPontaTe = 0;
    // op5
    this.histKwhConsumoReativoExcedentePonta = 338;
    this.histTarConsumoReativoExcedentePonta = 0.3029261;
    this.histPriceConsumoReativoExcedentePonta = 0;
    // op6
    this.histKwhConsumoReativoExcedenteForaPonta = 7486.16;
    this.histTarConsumoReativoExcedenteForaPonta = 0.3029202;
    this.histPriceConsumoReativoExcedenteForaPonta = 0;
    //op7
    this.histPriceAdicionalBandeirasPonta = 35.1;
    //op8
    this.histPriceAdicionalBandeirasForaPonta = 1444.49;
    //op9
    this.histKwhDemandaReativaExcedenteForaPontaTusd = 18.24;
    this.histTarDemandaReativaExcedenteForaPontaTusd = 19.5772335;
    this.histPriceDemandaReativaExcedenteForaPontaTusd = 0;
    //op10
    this.histKwhDemandaRegistradaKwPontaTusd = 0;
    this.histTarDemandaRegistradaKwPontaTusd = 0;
    this.histPriceDemandaRegistradaKwPontaTusd = 0;
    //op11
    this.histKwhDemandaRegistradaKwForaPontaTusd = 146.6;
    (this.histTarDemandaRegistradaKwForaPontaTusd = 19), 5773313;
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
    this.histPriceUltrapassagemDemandaPonta = 0;
    //op15
    this.histKwhUltrapassagemDemandaForaPonta = 16.6;
    this.histTarUltrapassagemDemandaForaPonta = 39.1544295;
    this.histPriceUltrapassagemDemandaForaPonta = 0;
    //op16
    this.histPriceOutros = 31.9;
  }

  // busca tarifas
  getTarifaOrigem() {
    //op1
    this.tarOrigemPontaTusd = 1.0956842;
    //op2
    this.tarOrigemForaPontaTusd = 0.0826473;
    //op3
    this.tarOrigemPontaTe = 0.47362066;
    //op4
    this.tarOrigemForaPontaTe = 0.2874082;
    //op5
    this.tarOrigemConsumoReativoExcedentePonta = 0.3029261;
    //op6
    this.tarOrigemConsumoReativoExcedenteForaPonta = 0.3029202;
    //op7
    // Acidional bandeiras Ponta valor no histórico
    //op8
    // Acidional bandeiras Fora Ponta valor no histórico
    //op9
    this.tarOrigemDemandaReativaExcedenteForaPontaTusd = 19.5772335;
    //op10
    this.tarOrigemDemandaRegistradaKwPontaTusd = 41.6531028903238;
    //op11
    this.tarOrigemDemandaRegistradaKwForaPontaTusd = 19.5773313;
    //op12
    this.tarOrigemDemandaNaoUtilizadaPonta = 0;
    //op13
    this.tarOrigemDemandaNaoUtilizadaForaPonta = 0;
    //op14
    this.tarOrigemUltrapassagemDemandaPonta = 0;
    //op15
    this.tarOrigemUltrapassagemDemandaForaPonta = 39.1544295;
    //op16
    // outros tao tem tarifa
  }

  calcToleranciaPonta() {
    this.resKwhToleranciaDemandaContratadaPonta = math.multiply(
      this.histKwhDemandaContratadaPonta,
      1.05
    );
  }

  calcToleranciaForaPonta() {
    this.resKwhToleranciaDemandaContratadaForaPonta = math.multiply(
      this.histKwhDemandaContratadaForaPonta,
      1.05
    );
  }

  // esta Função  retorna a quantidade de horas de ultrapassagem a ser cobrada em cada posto.
  // como ela utiliza o valor do cálculo da tolerância como parâmetro, caso esste seja zeno
  // ela também retorna zero.
  setUltrapassagemDemanda() {
    this.resKwhUltrapassagemDemandaPagarPonta = math.subtract(
      this.resKwhToleranciaDemandaContratadaPonta,
      this.histKwhDemandaRegistradaKwPontaTusd
    );
    this.resKwhUltrapassagemDemandaPagarForaPonta = math.subtract(
      this.resKwhToleranciaDemandaContratadaForaPonta,
      this.histKwhDemandaRegistradaKwForaPontaTusd
    );
  }

  calcOrigem() {
    //op1
    this.resPriceOrigemConsumoPontaTusd = math.multiply(
      this.histKwhConsumoPontaTusd,
      this.tarOrigemPontaTusd
    );
    //op2
    this.resPriceOrigemTotal = math.multiply(
      this.histKwhConsumoForaPontaTusd,
      this.tarOrigemForaPontaTusd
    );
    //op3
    this.resPriceOrigemConsumoPontaTe = math.multiply(
      this.histKwhConsumoPontaTe,
      this.tarOrigemPontaTe
    );
    //op4
    this.resPriceOrigemConsumoForaPontaTe = math.multiply(
      this.histKwhConsumoForaPontaTe,
      this.tarOrigemForaPontaTe
    );
    //op5
    this.resPriceOrigemConsumoReativoExcedentePonta = math.multiply(
      this.histKwhConsumoReativoExcedentePonta,
      this.tarOrigemConsumoReativoExcedentePonta
    );
    //op6
    this.resPriceOrigemConsumoReativoExcedenteForaPonta = math.multiply(
      this.histKwhConsumoReativoExcedenteForaPonta,
      this.tarOrigemConsumoReativoExcedenteForaPonta
    );
    //op7
    this.resPriceOrigemAdicionalBandeirasPonta = this.histPriceAdicionalBandeirasPonta;
    //op8
    this.resPriceOrigemAdicionalBandeirasForaPonta = this.histPriceAdicionalBandeirasForaPonta;
    //op9
    this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd = math.multiply(
      this.histKwhDemandaReativaExcedenteForaPontaTusd,
      this.tarOrigemDemandaReativaExcedenteForaPontaTusd
    );
    //op10
    this.resPriceOrigemDemandaRegistradaKwPontaTusd = math.multiply(
      this.histKwhDemandaRegistradaKwPontaTusd,
      this.tarOrigemDemandaRegistradaKwPontaTusd
    );
    //op11
    this.resPriceOrigemDemandaRegistradaKwForaPontaTusd = math.multiply(
      this.histKwhDemandaRegistradaKwForaPontaTusd,
      this.tarOrigemDemandaRegistradaKwForaPontaTusd
    );
    //op12 (caso o cliente tenha um contrato esse é o Kw do contrato - a demanda registrada, a tarifa é zero, o resultado deve ser zero)
    this.resPriceOrigemDemandaNaoUtilizadaPonta = math.multiply(
      this.histKwhDemandaNaoUtilizadaPonta,
      this.tarOrigemDemandaNaoUtilizadaPonta
    );
    //op13
    this.resPriceOrigemDemandaNaoUtilizadaForaPonta = math.multiply(
      this.histKwhDemandaNaoUtilizadaForaPonta,
      this.tarOrigemDemandaNaoUtilizadaForaPonta
    );
    //op14
    this.resPriceOrigemUltrapassagemDemandaPonta = math.multiply(
      this.resKwhUltrapassagemDemandaPagarPonta,
      this.tarOrigemUltrapassagemDemandaPonta
    );
    //op15
    this.resPriceOrigemUltrapassagemDemandaForaPonta = math.multiply(
      //this.resKwhUltrapassagemDemandaPagarForaPonta,
      16.6,
      this.tarOrigemUltrapassagemDemandaForaPonta
    );
    //op16
    this.resPriceOrigemOutros = this.histPriceOutros;

    // total
    this.resPriceOrigemTotal = math.sum(
      this.resPriceOrigemConsumoPontaTusd, //op1
      this.resPriceOrigemConsumoForaPontaTusd, //op2
      this.resPriceOrigemConsumoPontaTe, //op3
      this.resPriceOrigemConsumoForaPontaTe, //op4
      this.resPriceOrigemConsumoReativoExcedentePonta, //op5
      this.resPriceOrigemConsumoReativoExcedenteForaPonta, //op6
      this.resPriceOrigemAdicionalBandeirasPonta, //op7
      this.resPriceOrigemAdicionalBandeirasForaPonta, //op8
      this.resPriceOrigemDemandaReativaExcedenteForaPontaTusd, //op9
      this.resPriceOrigemDemandaRegistradaKwPontaTusd, //op10
      this.resPriceOrigemDemandaRegistradaKwForaPontaTusd, //op11
      this.resPriceOrigemDemandaNaoUtilizadaPonta, //op12
      this.resPriceOrigemDemandaNaoUtilizadaForaPonta, //op13
      this.resPriceOrigemUltrapassagemDemandaPonta, //op14
      this.resPriceDestinoUltrapassagemDemandaForaPonta, //op15
      this.resPriceOrigemOutros //op16
    );
    return this.resPriceOrigemTotal;
  }
  // fim historico e origem verde

  // inicio destino azul
  getTarifaDestino() {
    //op1
    this.tarDestinoPontaTusd = 0.082647415469211;
    //op2
    this.tarDestinoForaPontaTusd = 0.0826473;
    //op3
    this.tarDestinoPontaTe = 0.4736207;
    //op4
    this.tarDestinoForaPontaTe = 0.2874082;
    //op5
    this.tarDestinoConsumoReativoExcedentePonta = 0.3029261;
    //op6
    this.tarDestinoConsumoReativoExcedenteForaPonta = 0.3029202;
    //op7
    // Acidional bandeiras Ponta valor no histórico
    //op8
    // Acidional bandeiras Fora Ponta valor no histórico
    //op9
    this.tarDestinoDemandaReativaExcedenteForaPontaTusd = 19.5772335;
    //op10
    this.tarDestinoDemandaRegistradaKwPontaTusd = 0;
    //op11
    this.tarDestinoDemandaRegistradaKwForaPontaTusd = 19.5773313;
    //op12
    this.tarDestinoDemandaNaoUtilizadaPonta = 0;
    //op13
    this.tarDestinoDemandaNaoUtilizadaForaPonta = 0;
    //op14
    this.tarDestinoUltrapassagemDemandaPonta = 0;
    //op15
    this.tarDestinoUltrapassagemDemandaForaPonta = 39.1544295;
    //op16
    // outros tao tem tarifa
  }

  calcKwhDestinoPontaTusd() {
    // usar um valor percentual e obter tal percentuagem do valor do historico de consumo fora ponta
    // no caso 20 é um valor arbitrário
    // multiplicar por 3(ref: horas) depois por 20 (ref: dias)
    // usar esse kwh calculado e  usar como kwh do consumo ponta tusdo
    // multiplicar os 3 valores que variam no origem verde destino azul
    // 1. resPriceDestinoConsumoPontaTusd
    // 2. resPriceDestinoConsumoPontaTe
    // 3. resPriceDestinoDemandaRegistradaKwPontaTusd
    this.resHelperPercentualDestinoBase = 20;
    this.resHelperKwhPercentualForaPonta = math
      .chain(this.histKwhDemandaRegistradaKwForaPontaTusd)
      .divide(100)
      .multiply(this.resHelperPercentualDestinoBase)
      .done();
    this.resDestinoKwhPontaTusd = math
      .chain(this.resHelperKwhPercentualForaPonta)
      .multiply(3)
      .multiply(20)
      .done();
    this.resPriceDestinoConsumoPontaTusd = math.multiply(
      this.resDestinoKwhPontaTusd,
      this.tarDestinoPontaTusd
    );

    this.resPriceDestinoConsumoPontaTe = math.multiply(
      this.resDestinoKwhPontaTusd,
      this.tarDestinoPontaTe
    );

    this.resPriceDestinoDemandaRegistradaKwPontaTusd = math.multiply(
      this.resHelperKwhPercentualForaPonta,
      this.tarOrigemDemandaRegistradaKwPontaTusd
    );
  }

  calcDestino() {
    //op1 calculado com percentual
    //this.resPriceDestinoConsumoPontaTusd =
    //math.multiply(this.histKwhConsumoPontaTusd, this.tarDestinoPontaTusd);
    //op2
    this.resPriceDestinoConsumoForaPontaTusd = math.multiply(
      this.histKwhConsumoForaPontaTusd,
      this.tarDestinoForaPontaTusd
    );
    //op3 calculado com percentual
    //this.resPriceDestinoConsumoPontaTe =
    // math.multiply(this.histKwhConsumoPontaTe, this.tarDestinoPontaTe);
    //op4
    this.resPriceDestinoConsumoForaPontaTe = math.multiply(
      this.histKwhConsumoForaPontaTe,
      this.tarDestinoForaPontaTe
    );
    //op5
    this.resPriceDestinoConsumoReativoExcedentePonta = math.multiply(
      this.histKwhConsumoReativoExcedentePonta,
      this.tarDestinoConsumoReativoExcedentePonta
    );
    //op6
    this.resPriceDestinoConsumoReativoExcedenteForaPonta = math.multiply(
      this.histKwhConsumoReativoExcedenteForaPonta,
      this.tarDestinoConsumoReativoExcedenteForaPonta
    );
    //op7
    this.resPriceDestinoAdicionalBandeirasPonta = this.histPriceAdicionalBandeirasPonta;
    //op8
    this.resPriceDestinoAdicionalBandeirasForaPonta = this.histPriceAdicionalBandeirasForaPonta;
    //op9
    this.resPriceDestinoDemandaReativaExcedenteForaPontaTusd = math.multiply(
      this.histKwhDemandaReativaExcedenteForaPontaTusd,
      this.tarDestinoDemandaReativaExcedenteForaPontaTusd
    );
    //op10 calculado com percentual
    //this.resPriceDestinoDemandaRegistradaKwPontaTusd =
    //math.multiply(this.histKwhDemandaRegistradaKwPontaTusd, this.tarDestinoDemandaRegistradaKwPontaTusd);
    //op11
    this.resPriceDestinoDemandaRegistradaKwForaPontaTusd = math.multiply(
      this.histKwhDemandaRegistradaKwForaPontaTusd,
      this.tarDestinoDemandaRegistradaKwForaPontaTusd
    );
    //op12 (caso o cliente tenha um contrato esse é o Kw do contrato - a demanda registrada, a tarifa é zero, o resultado deve ser zero)
    this.resPriceDestinoDemandaNaoUtilizadaPonta = math.multiply(
      this.histKwhDemandaNaoUtilizadaPonta,
      this.tarDestinoDemandaNaoUtilizadaPonta
    );
    //op13
    this.resPriceDestinoDemandaNaoUtilizadaForaPonta = math.multiply(
      this.histKwhDemandaNaoUtilizadaForaPonta,
      this.tarDestinoDemandaNaoUtilizadaForaPonta
    );
    //op14
    this.resPriceDestinoUltrapassagemDemandaPonta = math.multiply(
      this.resKwhUltrapassagemDemandaPagarPonta,
      this.tarDestinoUltrapassagemDemandaPonta
    );
    //op15
    this.resPriceDestinoUltrapassagemDemandaForaPonta = this.resPriceDestinoUltrapassagemDemandaForaPonta;
    // math.multiply(this.resKwhUltrapassagemDemandaPagarForaPonta, //this.tarDestinoUltrapassagemDemandaForaPonta);
    //op16
    this.resPriceDestinoOutros = this.histPriceOutros;

    // total
    this.resPriceDestinoTotal = math.sum(
      this.resPriceDestinoConsumoPontaTusd, //op1
      this.resPriceDestinoConsumoForaPontaTusd, //op2
      this.resPriceDestinoConsumoPontaTe, //op3
      this.resPriceDestinoConsumoForaPontaTe, //op4
      this.resPriceDestinoConsumoReativoExcedentePonta, //op5
      this.resPriceDestinoConsumoReativoExcedenteForaPonta, //op6
      this.resPriceDestinoAdicionalBandeirasPonta, //op7
      this.resPriceDestinoAdicionalBandeirasForaPonta, //op8
      this.resPriceDestinoDemandaReativaExcedenteForaPontaTusd, //op9
      this.resPriceDestinoDemandaRegistradaKwPontaTusd, //op10
      this.resPriceDestinoDemandaRegistradaKwForaPontaTusd, //op11
      this.resPriceDestinoDemandaNaoUtilizadaPonta, //op12
      this.resPriceDestinoDemandaNaoUtilizadaForaPonta, //op13
      this.resPriceDestinoUltrapassagemDemandaPonta, //op14
      this.resPriceDestinoUltrapassagemDemandaForaPonta, //op15
      this.resPriceDestinoOutros //op16
    );
    return this.resPriceDestinoTotal;
  }

  // fim destino azul

  calcKwhSimulacaoPontaTusd() {
    // usar um valor percentual e obter tal percentuagem do valor do historico de consumo fora ponta
    // no caso 20 é um valor arbitrário
    // multiplicar por 3(ref: horas) depois por 20 (ref: dias)
    // usar esse kwh calculado e  usar como kwh do consumo ponta tusdo
    // multiplicar os 3 valores que variam no origem verde destino azul
    // 1. resPriceDestinoConsumoPontaTusd
    // 2. resPriceDestinoConsumoPontaTe
    // 3. resPriceDestinoDemandaRegistradaKwPontaTusd
    this.resHelperPercentualSimulacaoSlider = 25;
    this.resHelperKwhSimulacaoPercentualForaPonta = math
      .chain(this.histKwhDemandaRegistradaKwForaPontaTusd)
      .divide(100)
      .multiply(this.resHelperPercentualSimulacaoSlider)
      .done();
    this.resSimulacaoKwhPontaTusd = math
      .chain(this.resHelperKwhSimulacaoPercentualForaPonta)
      .multiply(3)
      .multiply(20)
      .done();
    this.resPriceSimulacaoConsumoPontaTusd = math.multiply(
      this.resSimulacaoKwhPontaTusd,
      this.tarDestinoPontaTusd
    );

    this.resPriceSimulacaoConsumoPontaTe = math.multiply(
      this.resSimulacaoKwhPontaTusd,
      this.tarDestinoPontaTe
    );

    this.resPriceSimulacaoDemandaRegistradaKwPontaTusd = math.multiply(
      this.resHelperKwhSimulacaoPercentualForaPonta,
      this.tarOrigemDemandaRegistradaKwPontaTusd
    );
  }

  calcSimulacao() {
    this.resPriceDestinoTotal = math.sum(
      this.resPriceSimulacaoConsumoPontaTusd, //op1
      this.resPriceDestinoConsumoForaPontaTusd, //op2
      this.resPriceSimulacaoConsumoPontaTe, //op3
      this.resPriceDestinoConsumoForaPontaTe, //op4
      this.resPriceDestinoConsumoReativoExcedentePonta, //op5
      this.resPriceDestinoConsumoReativoExcedenteForaPonta, //op6
      this.resPriceDestinoAdicionalBandeirasPonta, //op7
      this.resPriceDestinoAdicionalBandeirasForaPonta, //op8
      this.resPriceDestinoDemandaReativaExcedenteForaPontaTusd, //op9
      this.resPriceSimulacaoDemandaRegistradaKwPontaTusd, //op10
      this.resPriceDestinoDemandaRegistradaKwForaPontaTusd, //op11
      this.resPriceDestinoDemandaNaoUtilizadaPonta, //op12
      this.resPriceDestinoDemandaNaoUtilizadaForaPonta, //op13
      this.resPriceDestinoUltrapassagemDemandaPonta, //op14
      this.resPriceDestinoUltrapassagemDemandaForaPonta, //op15
      this.resPriceDestinoOutros //op16
    );
    return this.resPriceSimulacaoTotal;
  }

  // simulacao valor do slider

  // fim simulacao valor do slider
  // graficos
  plotBarChart() {
    this.barChartData = [
      { data: [this.histPriceTotalFatura], label: "Total Inicial" },
      { data: [this.resPriceDestinoTotal], label: "Simulado Base" },
      { data: [this.resPriceSimulacaoTotal], label: "Simulado Ponta" }
    ];
  }

  // fim graficos
  /////////////////////////// FIM FUNCOES ////////////////////////////////////
  /*
 
  ########################## SIMULACAO VERDE PARA AZUL ##################################

  %%%%%%%%%%%%%%%%%%%%%%%%%% REGISTRO FUNCOES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    initHistVars();
    getHistorico();
    initOrigemTars();
    getTarifaOrigem();
    initOrigemVals();
    calcToleranciaPonta();
    calcToleranciaForaPonta();
    setUltrapassagemDemanda();
    calcOrigem();
    initDestinoKwh();
    initDestinoTars();
    initDestinoVals();
    setDestinoKwh();
    getDestinoTars();
    initFactors();
    calcBaseFactors()
    calcDestino();


  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  ********************* considerar os dados necessários para o cálculo ******************
  #1# Buscar histórico de consumo:
      1. Inicializar variaveis
      2. Função buscar variáveis no db
     
  #2# Buscar tarifas da distribuidora do cliente para a modalidade origem no mes vigente
      1. Inicializar variaveis
      2. Função buscar variáveis no db
    
  !!!! ATENÇÃO antes do calculo Origem existem variaveis que precisam ser calculadas!!!!!!!
      1. Tolerância Contrato Ponta
      2. Tolerância Contrato Fora Ponta
      3. Ultrapassagem Demanda Ponta op14
      4. Ultrapassagem Demanda Fora Ponta op 15
      // se o resultado for negativo inverter e passar para
      5. Demanda não utilizada Ponta
      6. Demanada não utilizada Fora Ponta

    
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  #3# Calcular o valor total da modalidade origem utilizando os valores do histório e 
      as tarifas da modalidade origem. 
      1. Inicializar variável para o valor calculado origem
     
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
    0. Identificar operações que variam de acordo com o multiplicador
      1. Consumo ponta tusd (op1)
      2. Consumo ativo ponta te (op3)
      3. Demanda registrada KW ponta tusd (op10)
    1. Inicializar variável para o fator
    // fator base no helper
    2. Inicializar variável para o Consumo Ponta calculado

    3. Inicializar variável para o Consumo Ponta simulado
    
    4. Inicializar variável para o valor máximo do multiplicador
    
   #7# Cálculo destino base
        5.1. Inicializar variaveis a serem calculadas
        //ok
        5.2. Inicializar fatores do cácculo
        //ok
        5.3  Função calculo base
        // retirar as 3 variaveis
       
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
    operation  helpers
       1. histórico
      histKwhNomeDaVariável -> Valores Kwh ou similar */
  /*histPriceNomeDaVariável -> Valores em Reais
    2. tarifas
      tarOrigemNomeDaVariavel -> Tarifas modalidade atual 
      tarDestinoNomeDaVariavel -> Tarifas modalidae destino
    3. fatores dos cálculos
      3.1 origem
        resPriceOrigemNomeDoFator -> Fator cálculo origem em Reais */
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
  /* 3. Tarifas destino */

  /*  4. Variaveis resultado origem */

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
    1.7 {{ tarDestinoPontaTusd }}
    1.8 {{ resPriceDestinoConsumoPontaTusd }}

    2.1 Consumo Fora Ponta tusd
    2.2 {{ histKwhConsumoForaPontaTusd }}
    2.3 {{ histTarConsumoForaPontaTusd }}
    2.4 {{ histPriceConsumoForaPontaTusd }}
    2.5 {{ tarOrigemForaPontaTusd }}
    2.6 {{ resPriceOrigemConsumoForaPontaTusd }}
    2.7 {{ tarDestinoForaPontaTusd }}
    2.8 {{ resPriceDestinoConsumoForaPontaTusd }}

    3.1 Consumo Ponta TE
    3.2 {{ histKwhConsumoPontaTe }}
    3.3 {{ histTarConsumoPontaTe }}
    3.4 {{ histPriceConsumoPontaTe }}
    3.5 {{ tarOrigemPontaTe }}
    3.6 {{ resPriceOrigemConsumoPontaTe }}
    3.7 {{ tarDestinoPontaTe }}
    3.8 {{ resPriceDestinoConsumoPontaTe }}

    4.1 Consumo Fora Ponta TE
    4.2 {{ histKwhConsumoForaPontaTe }}
    4.3 {{ histTarConsumoForaPontaTe }}
    4.4 {{ histPriceConsumoForaPontaTe }}
    4.5 {{ tarOrigemForaPontaTe }}
    4.6 {{ resPriceOrigemConsumoForaPontaTe }}
    4.7 {{ tarDestinoForaPontaTe }}
    4.8 {{ resPriceDestinoConsumoForaPontaTe }}

    5.1 Consumo Reativo Exedente Ponta
    5.2 {{ histKwhConsumoReativoExcedentePonta }}
    5.3 {{ histTarConsumoReativoExcedentePonta }}
    5.4 {{ histPriceConsumoReativoExcedentePonta }}
    5.5 {{ tarOrigemConsumoReativoExcedenteForaPonta }}
    5.6 {{ resPriceOrigemConsumoReativoExcedentePonta }}
    5.7 {{ tarDestinoConsumoReativoExcedenteForaPonta }}
    5.8 {{ resPriceDestinoConsumoReativoExcedentePonta }}

    6.1 Consumo Reativo Exedente Fora Ponta
    6.2 {{ histKwhConsumoReativoExcedenteForaPonta }}
    6.3 {{ histTarConsumoReativoExcedenteForaPonta }}
    6.4 {{ histPriceConsumoReativoExcedenteForaPonta }}
    6.5 {{ tarOrigemConsumoReativoExcedenteForaPonta }}
    6.6 {{ resPriceOrigemConsumoReativoExcedenteForaPonta }}
    6.7 {{ tarDestinoConsumoReativoExcedenteForaPonta }}
    6.8 {{ resPriceDestinoConsumoReativoExcedenteForaPonta }}

    7.1 Adicional Bandeiras Ponta
    7.2 'N/D'
    7.3 'N/D'
    7.4 {{ histPriceAdicionalBandeirasPonta }}
    7.5 'N/D'
    7.6 {{ resPriceOrigemAdicionalBandeirasPonta }}
    7.7 'N/D'
    7.8 {{ resPriceDestinoAdicionalBandeirasPonta }}
    

    8.1 Adicional Bandeiras Fora Ponta
    8.2 'N/D'
    8.3 'N/D'
    8.4 {{ histPriceAdicionalBandeirasForaPonta }}
    8.5 'N/D'
    8.6 {{ resPriceOrigemAdicionalBandeirasForaPonta }}
    8.7 'N/D'
    8.8 {{ resPriceDestinoAdicionalBandeirasForaPonta }}

    9.1 Demanda Reativa Exedente Fora Ponta TUSD
    9.2 {{ histKwhDemandaReativaExcedenteForaPontaTusd }}
    9.3 {{ histTarDemandaReativaExcedenteForaPontaTusd }}
    9.4 {{ histPriceDemandaReativaExcedenteForaPontaTusd }}
    9.5 {{ tarOrigemDemandaReativaExcedenteForaPontaTusd }}
    9.6 {{ resPriceOrigemDemandaReativaExcedenteForaPontaTusd }} 
    9.7 {{ tarDestinoDemandaReativaExcedenteForaPontaTusd }}
    9.8 {{ resPriceDestinoDemandaReativaExcedenteForaPontaTusd }} 

    10.1 Demanda Registrada Ponta TUSD
    10.2 {{ histKwhDemandaRegistradaKwPontaTusd }}
    10.3 {{ histTarDemandaRegistradaKwPontaTusd }}
    10.4 {{ histPriceDemandaRegistradaKwPontaTusd }}
    10.5 {{ tarOrigemDemandaRegistradaKwPontaTusd }}
    10.6 {{ resPriceOrigemDemandaRegistradaKwPontaTusd }}
    10.7 {{ tarDestinoDemandaRegistradaKwPontaTusd }}
    10.8 {{ resPriceDestinoDemandaRegistradaKwPontaTusd }}


    11.1 Demanda Registrada Fora Ponta TUSD
    11.2 {{ histKwhDemandaRegistradaKwForaPontaTusd }}
    11.3 {{ histTarDemandaRegistradaKwForaPontaTusd }}
    11.4 {{ histPriceDemandaRegistradaKwForaPontaTusd }}
    11.5 {{ tarOrigemDemandaRegistradaKwForaPontaTusd }}
    11.6 {{ resPriceOrigemDemandaRegistradaForaPontaTusd }}
    11.7 {{ tarDestinoDemandaRegistradaKwForaPontaTusd }}
    11.8{{ resPriceDestinoDemandaRegistradaForaPontaTusd }}

    12.1 Demanda Não Utilizada Ponta
    12.2 {{ histKwhDemandaNaoUtilizadaPonta }}
    12.3 {{ histTarDemandaNaoUtilizadaPonta }}
    12.4 {{ histPriceDemandaNaoUtilizadaPonta }}
    12.5 {{ tarOrigemDemandaNaoUtilizadaPonta }}
    12.6 {{ resPriceOrigemDemandaNaoUtilizadaPonta }}
    12.7 {{ tarDestinoDemandaNaoUtilizadaPonta }}
    12.8 {{ resPriceDestinoDemandaNaoUtilizadaPonta }}

    13.1 Demanda Não Utilizada Fora Ponta
    13.2 {{ histKwhDemandaNaoUtilizadaForaPonta }}
    13.3 {{ histTarDemandaNaoUtilizadaForaPonta }}
    13.4 {{ histPriceDemandaNaoUtilizadaForaPonta }}
    13.5 {{ tarOrigemDemandaNaoUtilizadaForaPonta }}
    13.6 {{ resPriceOrigemDemandaNaoUtilizadaForaPonta }}
    13.7 {{ tarDestinoDemandaNaoUtilizadaForaPonta }}
    13.8 {{ resPriceDestinoDemandaNaoUtilizadaForaPonta }}
    

    14.1 Ultrapassagem Demanda Contratada Ponta
    14.2 {{ histKwhUltrapassagemDemandaPonta }}
    14.3 {{ histTarUltrapassagemDemandaPonta }}
    14.4 {{ histPriceUltrapassagemDemandaPonta }}
    14.5 {{ tarOrigemUltrapassagemDemandaPonta }}
    14.6 {{ resPriceOrigemUltrapassagemDemandaPonta }}
    14.7 {{ tarDestinoUltrapassagemDemandaPonta }}
    14.8 {{ resPriceDestinoUltrapassagemDemandaPonta }}

    15.1 Ultrapassagem Demanda Contratada Fora Ponta
    15.1 {{ histKwhUltrapassagemDemandaForaPonta }}
    15.2 {{ histTarUltrapassagemDemandaForaPonta }}
    15.3 {{ histPriceUltrapassagemDemandaForaPonta }}
    15.4 {{ tarOrigemUltrapassagemDemandaForaPonta }}
    15.6 {{ resPriceOrigemUltrapassagemDemandaForaPonta }}
    15.7 {{ tarDestinoUltrapassagemDemandaForaPonta }}
    15.8 {{ resPriceDestinoUltrapassagemDemandaForaPonta }}

    16.1 Outros
    16.2 'N/D'
    16.3 'N/D'
    16.4 {{ histPriceOutros }}
    16.5 'N/D'
    15.6 {{ resPriceOrigemOutros }}
    16.5 'N/D'
    15.6 {{ resPriceDestinoOutros }}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  #######################################################################################
  */
}
