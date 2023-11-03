<script setup>
  import { useGetRoomData } from "../../stores/Room/ConsultRoom";
  import { useRoomDelete } from "../../stores/Room/DeleteRoom.js";
  import { useRoomModal } from "../../stores/Room/EditRoom.js";

  import { useGetTypeRooms } from "../../stores/TypeRoom/ConsultTypeRooms";
  import { useGetAccommodations } from "../../stores/Accommodation/ConsultAccommodations";
  import { useGetHotels } from "../../stores/Hotel/ConsultHotels";

  import Paginate from 'vuejs-paginate-next';
  import Modal from '../../components/Modal/BaseModel.vue';
  const { deleteRoom } = useRoomDelete();
  const { roomsData, rows, load, getRoom } = useGetRoomData();
  const { typeRoomData } = useGetTypeRooms();
  const { accommodationsData } = useGetAccommodations();
  const { hotelsData } = useGetHotels();
  const { openModal, save, title, form, nameInput, close } = useRoomModal();

  const loadData = () => {
    getRoom(1);
  };

  window.addEventListener('reload-room', loadData);
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
    <div class="d-flex justify-content-center align-items-center" style="height: 15vh">
      <h1>HABITACIONES CON HOTELES</h1>
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
    <div class="table-responsive" rounded-3>
      <table v-if="load" class="table text-center">
        <thead class="thead-dark">
          <tr>
            <th scope="col" >#</th>
            <th scope="col" >Hotel</th>
            <th scope="col" >Tipo Habitación</th>
            <th scope="col" >Acomodación</th>
            <th scope="col" >Cantidad de Habitaciones</th>
            <th scope="col" >Estado</th>
            <th scope="col"  v-if="authStore.user">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, i) in roomsData" :key="room.id" >
            <th scope="row">{{ i + 1 }}</th>
            <td >{{ room.hotel.name }}</td>
            <td >{{ room.type_room.type }}</td>
            <td >{{ room.accommodation.name }}</td>
            <td >{{ room.amount }}</td>
            <td >{{ room.state === "1" ? "Activo" : "Inactivo" }}</td>

            <td v-if="authStore.user">
              <button class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#modal"
                @click="openModal(2,room.id,room.hotel_id,room.type_room.id,room.accommodation.id,room.amount,room.state)">
                <i class="fa-solid fa-edit"></i>
              </button>
              <button class="btn btn-danger mx-2" @click="deleteRoom(room.id, room.name)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate :page-count="rows" :click-handler="getRoom" :prev-text="'Prev'" :next-text="'Next'"
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
            <i class="fa-solid fa-hotel"></i>
          </span>
          <select class="form-select" v-model="form.hotel_id">
            <option value="" disabled>Elige un Hotel</option>
            <option v-for="(hotel) in hotelsData" :key="hotel.id" :value="hotel.id">{{ hotel.name }}</option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-house"></i>
          </span>
          <select class="form-select" v-model="form.typeRoom_id">
            <option value="" disabled>Elige Tipo de Habitación</option>
            <option v-for="(typeRoom) in typeRoomData" :key="typeRoom.id" :value="typeRoom.id">{{ typeRoom.type }}
            </option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-bed"></i>
          </span>
          <select class="form-select" v-model="form.accommodation_id">
            <option value="" disabled>Elige Acomodación</option>
            <option v-for="(accommodation) in accommodationsData" :key="accommodation.id" :value="accommodation.id">{{
              accommodation.name }}</option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-exclamation"></i>
          </span>
          <select class="form-select" v-model="form.state">
            <option value="" disabled>Elige Estado</option>
            <option value="1">True</option>
            <option value="0">False</option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa-solid fa-arrows-rotate"></i>
          </span>
          <input required type="number" v-model="form.amount" placeholder="Número de habitaciones" class="form-control"
            ref="nameInput">
          >
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