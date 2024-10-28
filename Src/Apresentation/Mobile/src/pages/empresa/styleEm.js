import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerTopbar: {
    backgroundColor: '#4369F1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
   
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    maxWidth: '48%',
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerLeftBarText:{
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight:10,
    
  },
  video: {
    width: 130,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover', 
    
    
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
  listContainer: {
    paddingBottom: 140,
    flexGrow:1,
    
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems:'center',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4369F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
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
 empresaImage: {
  width: 120,  
  height: 120,  
  marginBottom: 10, 
  alignSelf: 'center',
  borderRadius:75,
  borderWidth: 5,
  borderColor: '#111827',

},
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
 

});
