import React, { Component } from 'react'
import CardEvent from '../components/CardEvent'
import $ from 'jquery';

class AgendaEvent extends Component {
  constructor(){
    super()
    this.state = {
      event : [
        {
          no: "1",
          judul : "Valorant Challengers",
          tanggal: "15 April 2022 -  30 juni 2022",
          keterangan: "Turnamen VCT 2022 Stage 2 Indonesia akhirnya telah mengumumkan roadmap atau susunan jadwal penyelenggaraannya.",
          tanggalupdate : "Updated 7 days ago",
          gambar: "https://assets.skor.id/crop/0x0:0x0/x/photo/2022/01/19/3673420058.png"
        },
      ],

      action: "",
      no: "",
      judul: "",
      tanggal: "",
      keterangan: "",
      tanggalupdate: "",
      gambar: "",
      selectedItem: null
    }

  }

  //ini fungsi untuk menambah
  Add = () => {
    //menampilkan komponen modal
    $("#modal_agenda").show()
    this.setState({
      no: Math.random(1, 1000000),
      judul: "",
      tanggal: "",
      keterangan: "",
      tanggalupdate: "",
      gambar: "",
      action: "insert"
    })
  }

  //ini fungsi untuk edit
  Edit = (item) => {
    $("#modal_agenda").show()
    this.setState({
      no: item.no,
      judul: item.judul,
      tanggal: item.tanggal,
      keterangan: item.keterangan,
      tanggalupdate: item.tanggalupdate,
      gambar: item.gambar,
      action: "update",
      selectedItem: item
    })
  }

  //ini buat untuk menyimpan perubahan data
  Save = (event) => {
    event.preventDefault();
    //menampung data state buku
    let tempEvent = this.state.event

    if(this.state.action === "insert"){
      //menambah data baru
      tempEvent.push({
        no: this.state.no,
        judul: this.state.judul,
        tanggal: this.state.tanggal,
        keterangan: this.state.keterangan,
        tanggalupdate: this.state.tanggalupdate,
        gambar: this.state.gambar

      })
    }else if(this.state.action === "update"){
      //menyimpan perubahan data
      let index = tempEvent.indexOf(this.state.selectedItem)

      tempEvent[index].no = this.state.no
      tempEvent[index].judul = this.state.judul
      tempEvent[index].tanggal = this.state.tanggal
      tempEvent[index].keterangan = this.state.keterangan
      tempEvent[index].tanggalupdate = this.state.tanggalupdate
      tempEvent[index].gambar = this.state.gambar
    }

    this.setState({event : tempEvent})

    //menutup komponen modal_event
    $("#modal_agenda").hide()

    
  }

  //ini untuk menghapus event didalam array
  Drop = (item) => {
    //beri confirm
    if(window.confirm("Apakah anda ingin menghapus data ini?")){
      let tempEvent = this.state.event
      let index = tempEvent.indexOf(item)

      tempEvent.splice(index, 1)

      this.setState({event: tempEvent})
    }
  }

  Close = () => {
    $("#modal_agenda").hide()
}


  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.event.map( (item, index) => (
            <CardEvent
              judul={item.judul}
              tanggal = {item.tanggal}
              keterangan = {item.keterangan}
              tanggalupdate = {item.tanggalupdate}
              gambar = {item.gambar}
              onEdit={ () => this.Edit(item)}
              onDrop={ () => this.Drop(item)}

            />
          ))}
        </div>

        <div>
          <button class="bg-green-500 w-11/12 text-blue-50 rounded-lg py-2 px-4 ml-14 mt-3" onClick={ () => this.Add() }>Tambah</button>
        </div>
        
        {/* component modal sbg control manipulasi data */}
        <div className="modal" id="modal_agenda">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* modal header */}
              <div className="modal-header">
                Form Event
              </div>

              {/* modal body */}
              <div className="modal-body">
                <form onSubmit={ev => this.Save(ev) }>
                  Judul Event
                  <input type="text" className="form-control mb-2"
                  value={this.state.judul}
                  onChange={ ev => this.setState({judul: ev.target.value})}
                  required />

                  Tanggal 
                  <input type="text" className="form-control mb-2"
                  value={this.state.tanggal}
                  onChange={ ev => this.setState({tanggal: ev.target.value})}
                  required />

                  Keterangan
                  <input type="text" className="form-control mb-2"
                  value={this.state.keterangan}
                  onChange={ ev => this.setState({keterangan: ev.target.value})}
                  required />

                  Tanggal Update 
                  <input type="date" className="form-control mb-2"
                  value={this.state.tanggalupdate}
                  onChange={ ev => this.setState({tanggalupdate: ev.target.value})}
                  required />

                  File Gambar
                  <input type="text" className="form-control mb-2"
                  value={this.state.gambar}
                  onChange={ ev => this.setState({gambar: ev.target.value})}
                  required />

                  <button className="btn btn-info btn-block" type="submit">
                      Simpan
                  </button>
                  <button type="button" className="btn btn-danger btn-block ml-1" data-dismiss="modal" onClick={() => this.Close()}>
                      Close
                  </button>
                </form>

              </div>

            </div>

          </div>

        </div>
        

      </div>
    )
  }
}

export default AgendaEvent
