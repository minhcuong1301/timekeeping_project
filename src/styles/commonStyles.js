import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0a2946"
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 2,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginTop: 60,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 40,

  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'black',

  },
  resultTimeKeep:{
    marginTop:30,
    fontWeight: "bold",
    fontSize: 20,
  },
  resultItem:{
    flexDirection: 'row',
     alignItems: 'center',
      marginTop: 10,
  },
  flat:{
    // backgroundColor:"#6750a4",
    padding:10,
    fontWeight:800,
    fontSize:18,
  },
  body: {
    flex: 6,
    padding: 20,
    alignItems: 'center',
    // backgroundColor:"#f5f5f5"
  },
  username: {

    width: "90%",
    marginBottom: 30
  },
  user: {
    justifyContent: 'center',
    alignItems: "center"
  },
  inputitem: {
    flexDirection: "row",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  textinput: {
    marginLeft: 10,
    height: 40,
    width: "100%",
    // backgroundColor:"red"

  },
  password: {

    position: "relative",
    top: 10,
    left: -40
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  timekeeping: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",

  },
  camera: {
    flex: 1,
    // width:30,
    // borderRadius: 20,

  },
  operator: {
    flexDirection: "row",
    justifyContent: "space-between",
    width:"100%",
    paddingLeft:30,
    paddingRight:30,

  },
  textarea: {
    // backgroundColor:"black",
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: "90%",
    padding: 10,
    // height: 100
  },
  radioButtonGroup: {
    flexDirection: 'row',
   
    justifyContent:"space-around",
    gap:50,
    margin: 20,
  },
  radioButtonText: {
    marginRight: 20,
    fontSize: 16,
  },
  radioButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: "14px",
    fontWeight: 500,
    fontStyle: 'italic',
    justifyContent: "center"
  },
  left: {
    color: '#3b47f7'
  },
  right: {
    color: '#ff414d'
  },


  button: {
    backgroundColor: '#0a2946',
    // backgroundColor: '#6750a4',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    margin: 10,
    width: "auto"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    width: "60%",
    height: 100,
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
})

export default commonStyles