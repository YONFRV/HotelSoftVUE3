<script setup>
  import { useGetHotelData } from "../../stores/Hotel/ConsultDataHotel";
  import { useHotelDelete } from "../../stores/Hotel/DeleteHotel";
  import { useHotelModal } from "../../stores/Hotel/EditHotel";
  import { useGetCity } from "../../stores/City/ConsultCity";

  import Paginate from 'vuejs-paginate-next';
  import Modal from '../../components/Modal/BaseModel.vue';
  const { deleteHotel } = useHotelDelete();
  const { CityData } = useGetCity();
  const { hotelsData, rows, load, getHotel } = useGetHotelData();
  const { openModal, save, title, form, nameInput, close } = useHotelModal();
  const loadData = () => {
    getHotel(1);
  };
  window.addEventListener('reload-hotel', loadData);
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
    <div class="p-3 bg-light rounded-5">

    <div class="d-flex justify-content-center align-items-center" style="height: 15vh;">
      <h1>HOTELES</h1>
    </div>
    <div class="row">
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
      <table v-if="load" class="table text-center ">
        <thead class="thead-dark">
          <tr >
            <th scope="col" >#</th>
            <th scope="col" >Nombre</th>
            <th scope="col" >Ciudad</th>
            <th scope="col" >Dirección</th>
            <th scope="col" >NIT</th>
            <th scope="col" >Máx. Habitaciones</th>
            <th scope="col" >Total Habitaciones Creadas</th>
            <th scope="col" >Estado</th>
            <th scope="col"  v-if="authStore.user">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hotel, i) in hotelsData" :key="hotel.id" >
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ hotel.name }}</td>
            <td>{{ hotel.city.name }}</td>
            <td>{{ hotel.address }}</td>
            <td>{{ hotel.nit }}</td>
            <td>{{ hotel.max_rooms }}</td>
            <td>{{ hotel.total_rooms_created }}</td>
            <td>{{ hotel.state === "1" ? "Activo" : "Inactivo" }}</td>
            <td v-if="authStore.user">
              <button class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#modal"
                @click="openModal(2,hotel.id,hotel.name,hotel.city.id,hotel.address,hotel.nit,hotel.max_rooms,hotel.state)">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button class="btn btn-danger mx-2" @click="deleteHotel(hotel.id, hotel.name)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate :page-count="rows" :click-handler="getHotel" :prev-text="'Prev'" :next-text="'Next'"
        :container-class="'pagination'">
      </Paginate>
      <div style="height: 4em;"></div>
    </div>
  </div>
</div>
  <Modal :id="'modal'" :title="title">
    <div class="modal-body">
      <form @submit.prevent="save">
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-user"></i>
          </span>
          <input autofocus type="text" v-model="form.name" placeholder="Name" class="form-control" required
            ref="nameInput">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-map-pin"></i>
          </span>
          <select class="form-select" v-model="form.city_id">
            <option value="" disabled>Elige Ciudad</option>
            <option v-for="(city) in CityData" :key="city.id" :value="city.id">{{ city.name }}
            </option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-location-arrow"></i>
          </span>
          <input required type="text" v-model="form.address" placeholder="Address" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-building"></i>
          </span>
          <input required type="text" v-model="form.nit" placeholder="Nit" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-person-booth"></i>
          </span>
          <input required type="number" v-model="form.max_rooms" placeholder="max rooms" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-exclamation"></i>
          </span>
          <select v-model="form.state" class="form-select" >
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