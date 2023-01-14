import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

declare const $:any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})

export class MahasiswaComponent implements OnInit, AfterViewInit {

  data : any;
  table : any;
  
  constructor(private http : HttpClient, private renderer : Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.table = $('#table').DataTable()
    this.bind_mahasiswa()
  }

  bind_mahasiswa(): void {
    this.http.get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
    .subscribe((data :any) => {
      (data || []).forEach((items : any, i : any) => {

        const ttl = `${items.TempatLahir}, ${items.TanggalLahir}`
        const tableRows = [
          i + 1,
          items.NIM,
          items.Nama,
          items.JenisKelamin,
          ttl,
          items.JP,
          items.Alamat,
          items.StatusNikah,
          items.TahunMasuk,
        ]

        this.table.row.add(tableRows)
      })

      this.table.draw(false)
    })
  }

  showTambahModal() : void {
    $('#tambahModal').modal()
  }

  postRecord() : void {
    const data = [
      {
        nama: 'alamat',
        data: $('#alamat').val()
      },
      {
        nama: 'jenisKelamin',
        data : $('#jk').val()
      },
      {
        nama : 'jp',
        data : $('#prodi').val()
      },
      {
        nama : 'nama',
        data : $('#nama').val()
      },
      {
        nama : 'nim',
        data : $('#nim').val()
      },
      {
        nama : 'statusPernikahan',
        data : $('#pernikahan').val()
      },
      {
        nama : 'tahunMasuk',
        data : $('#tm').val(),
      },
      {
        nama : 'tanggalLahir',
        data : $('#tanggal').val()
      },
      {
        nama : 'tempatLahir',
        data : $('#tl').val()
      }
    ]

    // inisialisasi parameter
    let url = 'https://stmikpontianak.net/011100862/tambahMahasiswa.php?'

    // check length of the data
    data.forEach(items => {
      if(items.data.length === 0){
        alert(`data ${items.nama} harus diisi..!`)
        return
      }else{
        url += `${items.nama}=${encodeURIComponent(items.data)}&`
      }
    })

    // remove & (and) symbol in the end of the string
    url = url.slice(0, url.length - 1)

    // send data to the server through GET http
    this.http.get(url)
    .subscribe((data : any) => {

      // show alert message
      alert(`${data.status} -> ${data.message}`)

      // update data on mahasiswa's table with newest data
      this.bind_mahasiswa()

      // close the modal after all processed finished
      $('#tambahModal').modal('hide')
    })
  }
}
