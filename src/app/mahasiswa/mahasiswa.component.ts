import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $:any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})

export class MahasiswaComponent implements OnInit, AfterViewInit {

  data : any;
  table : any;
  
  constructor(private http : HttpClient) { }

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
}
