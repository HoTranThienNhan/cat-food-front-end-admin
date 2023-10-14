<script setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue';
import { router } from '@/router';

import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const user = authStore?.user;

// methods
const goToSignIn = () => {
    router.push({ name: "signinpage" });
}
const signout = () => {
    try {
        authStore.signoutStore();
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between row">
        <span class="navbar-brand col-2">CATFOOD</span>
        <div class="navbar col-6 row justify-content-center" id="navbarNavDropdown">
            <div class="col-8">
                <ul class="navbar-nav row">
                    <li class="nav-item col-3 active">
                        <router-link :to="{ name: 'homepage' }" class="nav-link">
                            Home <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <li class="nav-item col-3">
                        <router-link :to="{ name: 'menupage' }" class="nav-link">
                            Menu
                        </router-link>
                    </li>
                    <li class="nav-item col-3">
                        <router-link :to="{ name: 'homepage' }" class="nav-link">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item col-3">
                        <router-link :to="{ name: 'homepage' }" class="nav-link">
                            Contact
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-4 row align-items-center">
            <div class="col-6">
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
                </form>
            </div>
            <div class="col-6">
                <button v-if="!user" class="mr-3 p-1 rounded" @click="goToSignIn">
                    Đăng Nhập
                </button>
                <span v-if="user" class="mr-3 p-1" role="button"  @click="signout">
                    {{ user?.email }}
                </span>
                <!-- <div v-if="user" class="dropdown mr-3 p-1">
                    <span class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ user?.email }}
                    </span>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Đăng Xuất</a>
                    </div>
                </div> -->

                <span class="mr-3">
                    <i class="my-2 my-sm-0 fa-solid fa-cart-shopping"></i>
                </span>
                <span class="mr-3">
                    <i class="fa-regular fa-heart"></i>
                </span>
            </div>
        </div>
    </nav>
</template>
