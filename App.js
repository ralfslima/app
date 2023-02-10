// Importar módulos
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, DataTable, TextInput } from 'react-native-paper';

// Componente
export default function App() {

  // UseState
  const [vetor, setVetor] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  // UseEffect -> Executa após realizar o render
  useEffect(() => {
    fetch('http://10.0.2.2:3000')
    .then(retorno => retorno.json())
    .then(retorno => setVetor(retorno))
    .catch(erro => {Alert.alert(`Falha: ${erro}`)})
  });

  // Função para cadastrar clientes
  const cadastrar = () => {

    // Objeto
    let obj = {
      'nome':nome,
      'idade':idade
    }

    // Requisição
    fetch('http://10.0.2.2:3000',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(obj)
    })
    .then(retorno => retorno.json())
    .then(retorno => console.log(retorno))

    // Limpar campos
    setNome('');
    setIdade('');

    // Mensagem
    Alert.alert('Cliente cadastrado com sucesso!');
  }

  // Retorno
  return (
    <View>

      {/* Formulário de cadastro */}
      <View style={{marginTop:80, width:300, marginLeft:50}}>
        <TextInput placeholder='Nome'  value={nome}  style={{marginTop:10}} onChangeText={setNome}  />
        <TextInput placeholder='Idade' value={idade} style={{marginTop:10}} onChangeText={setIdade} />
        <Button mode="contained" onPress={cadastrar} style={{marginTop:10}}>Cadastrar</Button>
      </View>

      {/* Listagem de clientes */}
      <DataTable style={{marginTop:50}}>

        <DataTable.Header>
          <DataTable.Title>Código</DataTable.Title>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Idade</DataTable.Title>
        </DataTable.Header>

        {vetor.map(cliente => {
          return(
            <DataTable.Row key={cliente.codigo}>
              <DataTable.Cell>{cliente.codigo}</DataTable.Cell>
              <DataTable.Cell>{cliente.nome}</DataTable.Cell>
              <DataTable.Cell>{cliente.idade}</DataTable.Cell>
            </DataTable.Row>
          )
        })}

      </DataTable>
    </View>
  );
}
