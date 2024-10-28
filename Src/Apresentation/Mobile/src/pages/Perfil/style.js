import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingBottom: 50
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 150,
    marginBottom: -75,
  },
  perfilImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    paddingHorizontal: 20,
  },
  TituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infocaixa: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  opcoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  caixaopcoes: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  opcoesText: {
    color: '#1D3FAD',
    fontSize: 16,
    marginTop: 5,
  },
  TrabContainer: {
    marginBottom: 20,
  },
  caixaTrab: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  TitTrab: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  compTrab: {
    fontSize: 18,
    color: '#666',
  },
  LocalTrab: {
    fontSize: 14,
    color: '#999',
  },
});
