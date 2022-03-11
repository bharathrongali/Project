<script setup lang="ts">
import session from "../models/session";
import { ref, reactive, onMounted } from 'vue';
import * as users from "../models/user"

let currentTab= ref('All');
let newTaskName = ref('');
let dueDate = ref('');
let assignedTo = ref('');
let userTaskArray = session.user?.userTasks; 
let allTasks = reactive(session.user != null?session.user.userTasks:null);
let tasks= reactive(session.user != null?session.user.userTasks:null);
let assignedUser: any;
//let tasks: Array<string>;
console.log(users.list);

function addTask(this: any){
        const user = users.list.find(u => u.id+"" == assignedTo.value);
        assignedUser = session.user?.handle
        console.log(assignedUser);
        console.log(user)
        user?.userTasks.unshift({ 
          task: newTaskName.value,
          dueDate: dueDate.value,
          isCompleted: false,
          assignedBy: assignedUser
        })
        console.log(user)
        if(session.user?.id+"" == assignedTo.value ){
            this.tasks = user?.userTasks;
        }
        
      //   allTasks.unshift({
      //     task: newTaskName.value,
      //     dueDate: dueDate.value,
      //     isCompleted: false
      // });
      //this.tasks = this.allTasks;
}

function taskHandler(this: any, currentTab : any){
  if (this.currentTab.includes('Current')) {
            this.tasks = this.allTasks.filter((task: any) => !task.isCompleted);
          }
          else if (this.currentTab.includes('Completed')) {
            this.tasks = this.allTasks.filter((task: any) => task.isCompleted);
          }
          else {
            this.tasks = this.allTasks;
          }
}



</script>

<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="panel">
            <div class="tabs is-boxed">
              <ul>
                <li :class='{ "is-active": currentTab == "Current" }' @click="currentTab = 'Current',taskHandler('Current')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-clipboard-list" aria-hidden="true"></i>
                    </span>
                    <span>Current</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "Completed" }' @click="currentTab = 'Completed',taskHandler('Completed')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar-times" aria-hidden="true"></i>
                    </span>
                    <span>Completed</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "All" }' @click="currentTab = 'All',taskHandler('All')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar" aria-hidden="true"></i>
                    </span>
                    <span>All</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="panel-block">
              <form style="width: 100%;" @submit.prevent="addTask">
                <div class="field has-addons">
                  <div class="control has-icons-left is-expanded">
                    <input class="input is-primary" type="text" placeholder="New Task" v-model="newTaskName" />
                    <span class="icon is-left">
                      <i class="fas fa-calendar-plus" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control has-icons-left is-expanded">
                    <input class="input is-primary" type="date" placeholder="Date" v-model="dueDate" />
                    <span class="icon is-left">
                      <i class="fa fa-dharmachakra" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control has-icons-left is-expanded">
                    <select class="input is-primary" type="text" placeholder="Select User" v-model="assignedTo">
                      <option v-for="userlst in users.list" :key="userlst.firstName" v-bind:value="userlst.id">{{userlst.firstName}}</option>
                    </select>
                    <span class="icon is-left">
                      <i class="fas fa-book-reader" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control">
                    <button class="button is-primary">Add</button>
                  </div>
                </div>
              </form>
            </div>
            <!-- <a class="panel-block" >
              <input type="checkbox"/>
              <span></span>
            </a> -->
            <table class="table" style="width: 100%;">
             <thead>
                    <tr>
                        <th>
                            <abbr title="title">Title</abbr>
                        </th>
                        <th>
                            <abbr title="dueDate">Due Date(yyyy/mm/dd)</abbr>
                        </th>
                        <th>
                            <abbr title="assignedTo">Assigned To</abbr>
                        </th>
                        <th>
                            <abbr title="assignedBy">Assigned by</abbr>
                        </th>
                        <th>
                            <abbr title="completed">Completed</abbr>
                        </th>
                    </tr>
                </thead>
                   <tbody  v-for="task in tasks" :key="task.title">
             <!-- <a class="panel-block" :class="{ 'is-completed': currentTab != 'Completed' && task.isCompleted }">
                  <input type="checkbox" v-model="task.isCompleted" /> -->
                  <tr>
               
                        <td>{{ task.task }}</td>
                        <td>{{ task.dueDate }}</td>
                        <td>{{session.user?.handle}}</td>
                        <td>{{task.assignedBy}}</td>
                        <td><a class="panel-block" :class="{ 'is-completed': currentTab != 'Completed' && task.isCompleted }"><input type="checkbox" v-model="task.isCompleted" /></a></td>
                  </tr>
                <!-- </a> -->
              </tbody>
                 </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>