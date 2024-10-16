import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111827',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      alignItems: 'center', 
    },
    container: {
      flex:1,
      width: '98%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#469DD8', // Define a cor da borda
      borderRadius: 10,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    perfilImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#1D3FAD', // Define a cor da borda
    },
    bemvindoText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    legenda: {
      fontSize: 20,
      color: '#666',
      marginBottom: 20,
      left: '18%',
    },
    estatisticasContainer: {
      flexDirection: 'row',
      justifyContent:'space-between',
      width: '100%',
      marginBottom: 20,
    },
    statBox: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f9f9f9',
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
    opçoesContainer: {
      flexDirection: 'coluns',
      justifyContent: 'space-between',
      width: '100%',
      height: 280,
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
      borderColor: '#1D3FAD', // Define a cor da borda
      overflow: 'hidden'
    },
    caixaopcoes2: {
      alignItems: 'flex-start',
      padding: 10,
      backgroundColor: '#2754f4',
      borderRadius: 40,
      height: '100%',
      width: '48%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 2, // Defina a espessura da borda
      borderColor: '#1D3FAD', // Define a cor da borda
      overflow: 'hidden'
    },
    tituloBotao:{
       fontSize:18,
      fontWeight: 'bold',
      color:'#000',
     marginBottom:3,
   },
   tituloBotao2:{
       fontSize:18,
      fontWeight: 'bold',
      color:'#fff',
     marginBottom:3,
   },
   descricaoBotao:{
    fontSize:14,
    color:'#666',
    marginBottom:8,
   },
   descricaoBotao2:{
    fontSize:14,
    color:'#fff',
    marginBottom:8,
   },
   imagemBotao: {
    width: 170, 
    height: 150, 
    resizeMode: 'cover', 
    alignSelf:'flex-start', 
  },

    caixaopcoesCinza: {
      flexDirection: 'row',  // Alinha o ícone e o texto lado a lado
      alignItems: 'center',  // Alinha o ícone e o texto verticalmente no centro
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
      borderWidth: 4, // Defina a espessura da borda
      borderColor: '#1D3FAD', // Define a cor da borda
    },
    
    caixaopcoesAzul: {
      flexDirection: 'row',  // Alinha o ícone e o texto lado a lado
      alignItems: 'center',  // Alinha o ícone e o texto verticalmente no centro
      padding: 18,
      paddingBottom: 10,
      backgroundColor: '#1D3FAD',
      borderRadius: 40,
      marginLeft:'15%',
      width: '70%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      borderWidth: 4, // Defina a espessura da borda
      borderColor: '#1D3FAD', // Define a cor da borda
    },

    opcoesText: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 10,
      
    },

    opcoesText1: {
      alignSelf: 'center',
      color: '#000',
      fontSize: 10,
      marginLeft: '15%',
     fontSize:16,
      
    },
    opcoesText4: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 10,
      marginLeft: '15%',
     fontSize:16,
      
    },
    opcoesText2: {
      alignSelf: 'center',
      color: '#000',
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