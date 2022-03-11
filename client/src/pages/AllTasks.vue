<script setup lang="ts">
import session from "../models/session";
import * as users from "../models/user";
const user = users.list;
</script>

<template>
    <div class="container" onload="loadUsers()">
        <h1 class="title">Welcome {{ session.user?.handle }} Your assigned tasks are:</h1>
        <div class="section">
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            <abbr title="Position">Users</abbr>
                        </th>
                        <th>
                            <abbr title="Played">Tasks</abbr>
                        </th>
                        <th>
                            <abbr title="Won">Date</abbr>
                        </th>
                        <th>
                            <abbr title="Drawn">Assigned By</abbr>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <th v-for="(u,i) in user">{{u}}</th>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
</style>