import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {CheckBox, Button, Header} from 'react-native-elements'
import {StackNavigator} from 'react-navigation'
import Task from './Task'

type Props = {};
export default class TaskDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        date: new Date(),
        completed: false,
        sendable: false,
        dateVis: false,
        index: 0,
        isEdit: false,
        isFirst: true
      }
      console.log(this.initialCheck);
  }




  render() {
    //Takes in variable for when editing a task
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var initialCheck = false;
    var initialDate = new Date();
    if( params.item ) {
      this.state.title = params ? params.item.title : '';
      this.state.description = params ? params.item.desc : '';
      this.state.index = params ? params.index : 0;
      this.state.isEdit = true;
      initialCheck = params ? params.item.completed : false;
      initialDate = params ? params.item.date : new Date();
  }
  //This sets initial conditions when the view is first opened
  if(this.state.isFirst) {
    this.setState({
      completed: initialCheck,
      date: initialDate,
      isFirst: false
    })
  }
  //View
    return(
      <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: '#fff',
        onPress: () => this.props.navigation.goBack() }}
        centerComponent={{ text: 'New Task', style: { color: '#fff' } }}
      />
        <View style={styles.sideInput}>
          <Text style={styles.heading}>Name</Text>
          <TextInput style={styles.textInput}
          defaultValue={this.state.title}
          onChangeText={(text) => {
            this.state.title = text
            this.sendable = true
          }}
          />
        </View>
        <View style={styles.descInput}>
          <Text style={styles.heading}>Description</Text>
          <TextInput mulitline={true} numberOfLines={4} style={styles.desc}
          onChangeText={(text) => this.state.description = text}
          value={this.state.description}
          />
        </View>
        <View style={styles.sideInput}>
        <Button
        style={styles.datePicker}
        backgroundColor='rgba(92, 99,216, 0)'
        title='Select Date'
        fontSize={20}
        onPress = { () => this.setState({ dateVis: true }) }
        />
        <DateTimePicker
          isVisible = {this.state.dateVis}
          onConfirm = { (date) => {
            this.state.date = date;
            this.setState({dateVis: false});
          } }
          onCancel = { () => this.setState({ dateVis: false }) }
          date = {this.state.date}
        />
      </View>
      <CheckBox left
        title="Completed"
        checked={this.state.completed}
        onPress={() => {
          this.setState({completed: !this.state.completed});
        }}/>

      <View style={{flexGrow: 1}}/>

      <Button
      backgroundColor='rgba(92, 99,216, 0)'
      title='Save Task'
      style={[styles.saveTask]}
      fontSize={30}
      onPress = {this._saveTask}
      />
      </View>
  );
  }
  /*
  This method returns when save is pressed,
  1. if it is editing a task, it calls method to edit task in TaskList
  2. If it is new and nothing entered, an alert is triggered
  3. If it is new and ready, it is sent to add method of TaskList
  */
  _saveTask = () => {
    var temp = this.state.sendable
    if(this.state.isEdit){
      let newTask = new Task(this.state.date, this.state.title,
      this.state.description, this.state.completed);
      console.log(newTask);
      this.props.navigation.state.params.changeAtIndex(this.state.index, newTask);
      this.props.navigation.goBack();
    }
    else if(!temp) {
      alert('You need to enter a name before you can save a task');
    }
    else {
      let newTask = new Task(this.state.date, this.state.title,
      this.state.description, this.state.completed);
      this.props.navigation.state.params.addTask(newTask);
      this.props.navigation.goBack();
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sideInput: {
    flexDirection: 'row',
    margin: 20
  },
  heading: {
    fontSize: 20,
  },
  textInput: {
    height: 30,
    marginLeft: 15,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#050505',
  },
  descInput: {
    flexDirection: 'column',
    margin: 20,
    borderColor: '#050505'
  },
  desc: {
    borderBottomWidth: 1,
    height: 30,
  },
  datePicker: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 60,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
  },
  saveTask: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: null,
    height: 60,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'space-between'
  }
});
