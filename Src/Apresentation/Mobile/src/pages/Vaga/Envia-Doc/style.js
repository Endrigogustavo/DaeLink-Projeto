import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    
  },
  container: {
    padding: 20,
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  

  headerTopBar: {
    backgroundColor: '#4369F1',
    paddingHorizontal: 12,
    elevation: 2,
    marginBottom: 12,
    alignItems: 'center',
    width: '95%',
    xIndex:99,
    marginTop:10,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft:8,
  },
  headerTopBarText: {
    marginTop:10,
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
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap', // Adiciona quebra automática de linha
  },
  inputContainer:{
   flexDirection: 'row',
   width: '100%',
   alignItems: 'center',
   borderColor: '#4369F1',
   borderWidth:1,
   borderRadius:30,
   padding: 5,
   marginBottom: 10,
   borderWidth:2,
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width:30,
    height:30,
    borderRadius:30,
    backgroundColor: '#4369F1',
    

  },
  EntradaText: {
   flex: 1,
   height: 45,
   fontSize: 16,
  },
  video:{
    width:100,
    height:100,
    resizeMode:'cover',
   },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
 },
 logo: {
  width: 150,
    height: 100,
    alignSelf: 'center',
},
  TextImg: {
  color: 'blue',
  textAlign: 'center',
  marginVertical: 10,
},
label: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#4369F1', 
  marginBottom: 10,
},
imageContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginVertical: 10,
},
imageButton: {
  width: 100,
  height: 100,
  backgroundColor: '#4369F1',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10, 
  shadowColor: '#4369F1',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 8,
  borderWidth: 1,
  borderColor: '#4369F1', 
},
uploadIcon: {
  width: 35,
  height: 35,
  color: '#fff', 
},
Imagem: {
  width: '50%',
  height: 100,
 
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
  shadowColor: '#4369F1',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 8,
},
submitButton: {
  backgroundColor: '#4369F1',  // Botão de envio com cor vibrante
  padding: 15,
  borderRadius: 10,
  shadowColor: '#4369F1',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 8,
  marginTop: 20,
},
submitButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 18,
},
  errorText: {
  color: '#ff375b',
  fontSize: 12,
  marginTop: 3,
  marginLeft:10,
},

});