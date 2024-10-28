import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5', 
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingBottom: 50,
    top: 45
  },
  headerTopbar: {
    backgroundColor: '#4369F1',
    paddingHorizontal: 12,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 12,
    alignItems: 'center',
    zIndex:99,
    overflow: 'hidden',
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  video:{
   width:160,
   height:100,
   resizeMode:'cover',
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
    flexWrap: 'wrap', 
  },
  cardTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
 
  cardText: {
  fontSize: 14,
   color: '#555',
   marginRight: 10, 
   flexShrink: 1,
   padding: 3,
  },
  
  empresaImage: {
    width: 80, 
    height: 80,
    borderRadius: 25, 
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#555',
    marginEnd:10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4369F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',

  },
  noVaga: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  icon: {
  marginRight: 10, 
  marginStart: 15
},
 
});
