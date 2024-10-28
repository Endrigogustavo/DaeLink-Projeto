import { Button, StyleSheet } from 'react-native';

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
  video:{
    width:100,
    height:100,
    resizeMode:'cover',
   },
});