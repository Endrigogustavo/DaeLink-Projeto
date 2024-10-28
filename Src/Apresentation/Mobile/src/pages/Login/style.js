import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D3FAD',
  },
  logo: {
    width:350,
    height: 200,
    marginTop: 50,
  },
  containerForm: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    justifyContent: 'center',
    borderWidth: 4, 
    borderColor: '#111827', 
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#1D3FAD',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputArea:{
flexDirection:'row',
width: '100%',
alignItems: 'center',
  },
  input: {
    width: '90%',
    borderBottomWidth: 2, 
    borderBottomColor: '#1D3FAD', 
    height: 50,
    marginBottom: 12,
    fontSize: 16,
    paddingLeft: 10,
    color: '#111827',
    
  },
  icon:{
    
    
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1D3FAD',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1D3FAD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top:'15%',
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
