<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';


    const message = ref( 'Hello Vue!' );
    const currentTab = ref( 'All' );
    const prompt = ref( 'Waiting for input...' );
    const notifications = reactive( [
        { type: 'primary', message: 'This is a primary notification' },
        { type: 'link', message: 'This is a link notification' },
        { type: 'success', message: 'Yay you did it!' },
        { type: 'warning', message: 'Uh Oh! Watch out!' },
        { type: 'danger', message: 'I cant believe you just did that!' },
    ] );


    function cardClick() {
        message.value = 'You clicked the card!';
    }
    function close(index: number) {
        notifications.splice(index, 1);
    }
                
    onMounted(() => {
        setInterval(() => {
            prompt.value += '.';
        }, 500);
    });


</script>

<template>
                <div class="section">
                <div class="columns">


                    
                       
                   
                </div>
            </div>
  
</template>

<style>
        

</style>