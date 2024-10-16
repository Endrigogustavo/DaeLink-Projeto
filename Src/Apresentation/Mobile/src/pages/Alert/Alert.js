import { StyleSheet } from "react-native";

export default StyleSheet.create({
modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  cancelButton: {
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButton: {
    alignItems: 'flex-start',
    backgroundColor: '#f00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});