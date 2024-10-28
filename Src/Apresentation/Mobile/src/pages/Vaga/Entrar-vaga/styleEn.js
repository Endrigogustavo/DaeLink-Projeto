import { StyleSheet } from "react-native";

export default StyleSheet.create({

    scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom:10,
  },
  container:{
    flex: 1, 
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
 
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  headerTopBarText:{
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerBarText:{
    marginLeft: 20,
    color: 'white',
    backgroundColor:'#4369F1',
    borderRadius: 30,
    padding: 8,
    marginTop: 10,
  },
  empresaImage: {
    width:80,
    height: 80, 
    borderRadius: 150,
    borderWidth: 5,
    borderColor: '#fff',
    borderWidth: 3,
    borderColor: '#4369F1',
    marginLeft: '8%', 
    marginTop: '15%',
  },
  Informacoes:{
    marginLeft:'4%',
    paddingBottom:15,

  },
  TextInf:{
    paddingBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  inf:{
    paddingBottom:5,
    fontSize:12,
    color: '#777',
    width: '100%', 
    flexShrink: 1
    
  },
  containerForm: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  EntradaText: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      status: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', 
        marginVertical: 10,
      },
      statusLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF', 
        textShadowColor: 'rgba(0, 0, 0, 0.25)', 
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      }, 
      StatusText:{
        color: '#000', 
        fontSize: 18, 
        fontWeight: 'bold', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
      }
})