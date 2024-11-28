import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#828CD9',
  },
  logo: {
    width: '85%',
    height: '45%',
    position: 'relative'
  },
  containerForm: {
    backgroundColor: '#fcfafa',
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    justifyContent: 'center',

  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#828CD9',
    marginBottom: Platform.OS ==='ios'? 0:20,
    textAlign: 'center',
    top: Platform.OS === 'ios'?-100 : 0
  },
  inputArea:{
flexDirection:'row',
width: '100%',
alignItems: 'center',
  },
  input: {
    width: '90%',
    borderBottomWidth: 2, 
    borderBottomColor: '#828CD9', 
    height: 50,
    marginBottom: 12,
    fontSize: 16,
    paddingLeft: 10,
    color: '#828CD9',
    top:Platform.OS === 'ios'?-60 : 0
    
  },
  icon:{
    top: Platform.OS === 'ios'?-70 : 0
    
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#828CD9',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#828CD9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top:'0%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
    marginLeft: 20,
  },
});
