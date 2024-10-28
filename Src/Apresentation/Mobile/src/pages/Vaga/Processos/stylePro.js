import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: '#f0f0f5', 
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 50
  },
  headerTopBar: {
    backgroundColor: '#4369F1',
    paddingHorizontal: 12,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
   headerLeftBarText: {
  color: '#fff',
  flex: 1,
  fontSize: 14,
  marginRight:10,
  },
 listContainer:{
paddingBottom:20,
 },
 card:{
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 3,
 },
 cardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
infoContainer:{
  flex: 1,
},
row:{
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  flexWrap: 'wrap', // Adiciona quebra automática de linha
},
row2:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap', // Adiciona quebra automática de linha
},
cardTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
   cardText: {
  fontSize: 14,
  marginBottom: 5,
  color: '#555',
},
empresaImage: {
     width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginEnd: 10,
},
boldText: {
  fontWeight: 'bold',
  color: '#fff',
  
},
situacao:{
  borderRadius: 40,
  padding: 10,
  
},
button: {
  backgroundColor: '#4369F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
},
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',

  },
  userIdText: {
    marginBottom: 10,
  },
  video:{
    width:100,
    height:100,
    resizeMode:'cover',
   },
  noVaga: {
    textAlign: 'center',
    marginTop: 20,
  },

});
