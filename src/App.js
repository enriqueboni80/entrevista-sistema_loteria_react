import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    numJogos: '',
    numDezenas: '',
    numSorteados: [],
    jogosRealizados: [],
    arrayAcertos: []
  }

  gerarNumerosAleatorios() {
    return Math.floor(Math.random() * 60) + 1
  }

  ehRepetido(jogo, numAleatorio) {
    for (const key in jogo) {
      if (numAleatorio === jogo[key]) {
        return true
      }
    }
    return false
  }

  gerarJogos = (e) => {
    let arrayJogos = []
    for (let indexNumJogos = 0; indexNumJogos < this.state.numJogos; indexNumJogos++) {
      let numAleatorio
      let jogo = []
      let numRepetido
      while (jogo.length < this.state.numDezenas) {
        numAleatorio = this.gerarNumerosAleatorios()
        numRepetido = this.ehRepetido(jogo, numAleatorio)
        if (!numRepetido) {
          jogo.push(numAleatorio)
        }
      }
      arrayJogos.push(jogo)
    }
    this.setState({ jogosRealizados: arrayJogos })
    e.preventDefault()
  }

  sortear = (e) => {
    let numAleatorio
    let jogo = []
    let numRepetido
    while (jogo.length < 6) {
      numAleatorio = this.gerarNumerosAleatorios()
      numRepetido = this.ehRepetido(jogo, numAleatorio)
      if (!numRepetido) {
        jogo.push(numAleatorio)
      }
    }
    this.setState({ numSorteados: jogo })
    e.preventDefault()
  }

  comparar = (e) => {
    var numSorteados = this.state.numSorteados
    var acertos
    var arrayAcertos = []
    this.state.jogosRealizados.map(jogo => {
      acertos = 0
      for (var num of jogo) {
        for (var numSorteado of numSorteados){
            if(num === numSorteado){
              acertos++
            }
        }
      }
      arrayAcertos.push(acertos)
    })
    this.setState({arrayAcertos: arrayAcertos})
    e.preventDefault()
  }

  render() {
    return (
      <>
        <div>
          <h2>Sistema de Loterias em React</h2>
          <form onSubmit={this.gerarJogos}>
            <label for="fname">Numero de jogos</label><br />
            <input type="text" value={this.state.numJogos} onChange={(e) => {
              this.setState({ numJogos: e.target.value })
            }} /><br /><br />
            <label for="fname">Numero de Dezenas por jogo</label><br />
            <input type="text" value={this.state.numDezenas} onChange={(e) => {
              this.setState({ numDezenas: e.target.value })
            }} /><br /><br />
            <button>Gerar Jogos</button>
          </form>
          <button onClick={this.sortear}>Sortear</button>
          <button onClick={this.comparar}>Comparar</button>
        </div>
        <br /><hr />

        {this.state.numSorteados.length === 0 ? 'Numeros ainda não sorteados ' : <h1>Numeros Sorteados</h1>}
        {this.state.numSorteados.map((numSorteado) => {
          return (<td>{numSorteado},</td>)
        })}

        <h1>Jogos Realizados</h1>
        {this.state.jogosRealizados.map((jogos, i) => {
          return (
            <div>
              Jogo{i + 1} ===>
              {jogos.map((num) => {
                return (` ${num},`)
              })}
            </div>
          )
        })}
        <h1>Acertos</h1>
        {this.state.arrayAcertos.map((acertos, i) => {
          return(<div>jogo{i+1} ==> {acertos} acertos</div>)
        })}
      </>
    )
  }
}

export default App;
