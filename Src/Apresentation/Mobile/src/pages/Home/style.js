import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    container: {
      alignItems: 'center',
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
    perfilImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    bemvindoText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    legenda: {
      fontSize: 18,
      color: '#666',
      marginBottom: 20,
    },
    estatisticasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    statBox: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      width: '30%',
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    caixaopcoes: {
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#007bff',
      borderRadius: 10,
      width: '30%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    opcoesText: {
      color: '#fff',
      fontSize: 10,
      marginTop: 5,
    },

  
  });