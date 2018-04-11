import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Task from './Task';
import {
  Header,
  List,
  ListItem,
  CheckBox,
  Button,
  TouchableComponent
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

type Props = {};
export default class TaskList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
        tasks: []
      }
      this.getInitialTasks();
  }

  //Render for list item, handls when checkbox is pressed
  _renderItem = ({item}) => (
  <ListItem
    title={item.title}
    subtitle={dateToString(item.date)}
    onPress={() =>
    this.props.navigation.navigate('TaskDetails',
    {item,
    addTask: this.addTask.bind(this),
    changeAtIndex: this.changeAtIndex.bind(this),
    index: this.state.tasks.indexOf(item)}
   )
  }
    rightIcon={
      <CheckBox center
        title="Completed"
        checked={item.completed}
        onPress={() =>{
          item.completed = !item.completed;
          this.changeAtIndex(this.state.tasks.indexOf(item), item); }
        }

      />
    }
  />
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Header
        centerComponent={{ text: 'TASK LIST', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff',
        onPress: () => navigate('TaskDetails', {addTask: this.addTask.bind(this)}) }}
      />
      <FlatList
        data={this.state.tasks}
        extraData={this.state}
        keyExtractor={(item, index) => '' + index}
        renderItem={this._renderItem}
      />
      </View>
    );
  }


  getInitialTasks() {
    var date1 = new Date('December 17, 2018');
    var date2 = new Date('April 12, 2018');
    var date3 = new Date('May 5, 2018');
    var t1 = new Task(date1, 'Buy Christmas Presents', 'Go to Best Buy', false);
    var t2 = new Task(date2, 'Get Groceries', 'Chicken, Eggs, Milk', true);
    var t3 = new Task(date3, 'Cinco de Mayo', 'Get some chips', false);
    this.addTask(t1);
    this.addTask(t2);
    this.addTask(t3);
  }

//Add tasks based on date and completedness
  addTask(task) {
    var curLength = 0;
    curLength += this.state.tasks.length;
    if(this.state.tasks.length < 1)
      this.state.tasks.push(task);
    else {
      var i;
      var max = this.state.tasks.length;
      for(i = 0; i < max; i++) {
        if( task.completed ) {
          if(this.state.tasks[i].completed) {
            if( task.date.getTime() < this.state.tasks[i].date.getTime()) {
              this.state.tasks.splice(i, 0, task);
              break;
            }
          }
        }
        else{
          if( task.date.getTime() < this.state.tasks[i].date.getTime()) {
            this.state.tasks.splice(i, 0, task);
            break;
          }
          else if(this.state.tasks[i].completed){
            this.state.tasks.splice(i, 0, task);
            break;
          }
        }
      }
      if( this.state.tasks.length == curLength )
        this.state.tasks.push(task);
    }
      this.setState({tasks: this.state.tasks});
  }

//When an item is changed, it is removed and re-added to maintain order
  changeAtIndex(index, task){
    this.state.tasks.splice(index, 1);
    this.addTask(task);
  }

}

function dateToString(date) {
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  return month + "-" + day + "-" + year;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  cell: {
    flex: 1,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.4,
    borderColor: '#2b2b2b',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  description: {
    fontSize: 15,
    color: '#2b2b2b',
    marginBottom: 5
  },
  listTitle: {
    color: '#ffffff',
    fontSize: 20
  },
});
