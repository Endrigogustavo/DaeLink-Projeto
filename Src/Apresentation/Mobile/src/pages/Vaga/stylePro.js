import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  headerTopBar: {
    backgroundColor: '#6AB7E2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTopBarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5, 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5, 
  },
  button: {
    backgroundColor: '#6AB7E2',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userIdText: {
    marginBottom: 10,
  },
  noVaga: {
    textAlign: 'center',
    marginTop: 20,
  },
});
