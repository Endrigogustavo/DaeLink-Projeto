import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50
      
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      alignItems: 'center', 
    },
    container: {
      flexGrow: 1,
      height: '100%',
      width: '100%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fcfafa', 
      borderRadius: 10,
      margin: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      
    },
    perfilImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 20,
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#1D3FAD', // Define a cor da borda
      top:10
    },
    bemvindoText: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#2D314B'
    },
    legenda: {
      fontSize: 20,
      color: '#666',
      marginBottom: 10,

      flexWrap: 'wrap',
      
    },
    OqueText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      color: '#2D314B'
      
    },
    estatisticasContainer: {
      flexDirection: 'row',
      justifyContent:'space-between',
      width: '95%',
      marginBottom: 20,
    },
    statBox: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#4369F1',
      borderRadius: 10,
      width: '20%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 2,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    statLabel: {
      fontSize: 14,
      color: '#666',
    },
   
    caixaopcoes1: {
      alignItems: 'flex-start',
      padding: 10,
      backgroundColor: '#F4F4F4',
      borderRadius: 40,
      height: '100%',
      width: '48%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#4369F1', // Define a cor da borda
      overflow: 'hidden'
    },
    caixaopcoes2: {
      alignItems: 'flex-start',
      padding: 10,
      backgroundColor: '#4369F1',
      borderRadius: 40,
      height: '100%',
      width: '48%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 1, // Defina a espessura da borda
      borderColor: '#7E88D2', // Define a cor da borda
      overflow: 'hidden'
    },
    tituloBotao:{
    fontSize:18,
    fontWeight: 'bold',
    color:'#000',
     marginBottom:5,
     marginLeft:8,
     color: '#2D314B'
   },
   tituloBotao2:{
    fontSize:18,
    fontWeight: 'bold',
    color:'#fff',
    marginBottom:5,
    marginLeft:8,
   },
   descricaoBotao:{
    fontSize:14,
    color:'#666',
    marginBottom:8,
    color: '#2D314B'
   },
   descricaoBotao2:{
    fontSize:14,
    color:'#fff',
    marginBottom:8,
   },
   imagemBotao: {
    width: 180, 
    height: 130, 
    resizeMode: 'cover',  
  },

    caixaopcoesCinza: {
      flexDirection: 'row',  
      alignItems: 'center',  
      padding: 18,
      paddingBottom: 10,
      backgroundColor: '#f4f4f4',
      borderRadius: 40,
      marginLeft:'15%',
      width: '70%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      borderWidth: 2,
      borderColor: '#4369F1', 
    },
    opçoesContainer: {
      flexDirection: 'coluns',
      justifyContent: 'space-between',
      width: '100%',
      height: 230,
      alignSelf: 'center'
    }, 
    caixaopcoesAzul: {
      flexDirection: 'row', 
      alignItems: 'center',  
      padding: 18,
      paddingBottom: 10,
      backgroundColor: '#4369F1',
      borderRadius: 40,
      marginLeft:'15%',
      width: '70%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#4369F1', // Define a cor da borda
      
    },

    opcoesText: {
      alignSelf: 'center',
    
      fontSize: 10,
      justifyContent: 'center',
    alignItems: 'center',
    color: '#2D314B'
    
    },

    opcoesText1: {
      alignSelf: 'center',
      color: '#000',
      fontSize: 10,
      marginLeft: '27%',
      fontSize:16,
    
      
    },
    opcoesText4: {
      alignSelf: 'center',
      color: '#fff',
      marginLeft: '20%',
     fontSize:16,
      
    },
    opcoesText2: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 10,
      marginLeft: '35%',
     fontSize:16,
      
    },
    opcoesText3: {
      alignSelf: 'center',
      color: '#000',
      fontSize: 10,
      marginLeft: '15%',
     fontSize:16,
      
    },
  
  });