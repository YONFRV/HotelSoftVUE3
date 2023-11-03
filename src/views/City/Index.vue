<script setup>
  import { useCityDelete } from "../../stores/City/DeleteCity";
  import { useGetcitysData } from "../../stores/City/CosultDataCity";
  import { useCity } from "../../stores/City/EditCity";
  import Paginate from "vuejs-paginate-next";
  import Modal from '../../components/Modal/BaseModel.vue';

  const { deleteCity } = useCityDelete();
  const { citysData, rows, load, getcitys } = useGetcitysData();
  const { openModal, save, title, form, nameInput, close } = useCity();

  const loadData = () => {
    getcitys(1);
  };
  window.addEventListener('reload-city', loadData);
  import { useAuthStore } from '../../stores/auth';
  const authStore = useAuthStore();
</script>
<template>
  <div class="card border border-white text-center" v-if="!load">
    <div class="card-body">
      <img src="/loading.gif" class="img-fluid" />
    </div>
  </div>
  <div v-else>
    <div class="p-3 bg-light rounded-3">
      <div class="d-flex justify-content-center align-items-center" style="height: 15vh">
        <h1>CIUDADES</h1>
      </div>
      <div class="row" v-if="authStore.user">
        <div class="col-md-4 offset-md-4">
          <div class="d-grid col-10 mx-auto">
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal" @click="openModal(1)">
              <i class="fa-solid fa-circle-plus"></i>Add
            </button>
          </div>
        </div>
      </div>
      <br/>
      <div class="table-responsive rounded-3">
        <table v-if="load" class="table text-center">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col" v-if="authStore.user">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(city, i) in citysData" :key="city.id">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ city.name }}</td>
              <td>{{ city.state === "1" ? "Activo" : "Inactivo" }}</td>
              <td v-if="authStore.user">
                <button class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#modal"
                  @click="openModal(2,city.id,city.name,city.state)">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn btn-danger mx-2" @click="deleteCity(city.id, city.name)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Paginate :page-count="rows" :click-handler="getCity" :prev-text="'Prev'" :next-text="'Next'"
          :container-class="'pagination'">
        </Paginate>
        <div style="height: 4em"></div>
      </div>
    </div>
  </div>
  <Modal :id="'modal'" :title="title">
    <div class="modal-body">
      <form @submit.prevent="save">
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-map-pin"></i>
          </span>
          <input autofocus type="text" v-model="form.name" placeholder="Name" class="form-control" required
            ref="nameInput">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-exclamation"></i>
          </span>
          <select v-model="form.state" class="form-select">
            <option value="" disabled>Elige Estado</option>
            <option value="1">True</option>
            <option value="0">False</option>
          </select>
        </div>
        <div class="d-grid col-10 mx-auto">
          <button class="btn btn-success">
            <i class="fa-solid fa-save"></i> Save</button>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-dark" ref="close" data-bs-dismiss="modal">close</button>
    </div>
  </Modal>
</template>