import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sucessoToast: {
    height: 60,
    width: '100%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sucessoText: {
    color: 'white',
    fontSize: 16,
  },
  sucessoSubText: {
    color: 'white',
    fontSize: 14,
  },
  errorToast: {
    height: 60,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
  errorSubText: {
    color: 'white',
    fontSize: 14,
  },


  errorToastLogin: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    width:'70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#ffe6e6', 
  },
  errorTextLogin: {
    fontSize: 18,
    color: '#cc0000',
    fontWeight: '600',
    marginLeft: 12,
  },
  errorSubTextLogin: {
    fontSize: 14,
    color: '#cc0000',
    marginLeft: 12,
    marginTop: 4,
  },


 EnvioToastSenha: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    width:'70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#c6ffea', 
  },
  EnvioTextSenha: {
    fontSize: 18,
    color: '#C1FF00',
    fontWeight: '600',
    marginLeft: 12,
  },
  EnvioSubTextSenha: {
    fontSize: 14,
    color: '#000',
    marginLeft: 12,
    marginTop: 4,
  },

  edicaoToast: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    width:'70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#E9F87C', 
  },
  edicaoText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginLeft: 12,
  },
  edicaoSubText: {
    fontSize: 14,
    color: '#E9F87C',
    marginLeft: 12,
    marginTop: 4,
  },

  DocToast: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    width:'70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 5, // Defina a espessura da borda
    borderColor: '#2754f4', 
  },
  DocText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginLeft: 12,
  },
  DocSubText: {
    fontSize: 14,
    color: '#2754f4',
    marginLeft: 12,
    marginTop: 4,
  },
});
