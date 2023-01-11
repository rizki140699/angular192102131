import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

moment.locale("id")

declare const $ : any;

@Component({
  selector: 'app-cuaca',
  templateUrl: './cuaca.component.html',
  styleUrls: ['./cuaca.component.css']
})
export class CuacaComponent implements OnInit {

  table : any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.table = $('#table-cuaca').DataTable({
      "columnDefs": [
        {
          "targets": 0,
          "render": function(data : string){
            const waktu = moment(`${data} UTC`)

            return `${waktu.format("YYYY-MM-DD")} <br/> ${waktu.format("HH:mm")} WIB`
          }
        }
      ]
    })
    this.ambilDataCuaca()
  }

  /**
   * Mengubah suhu dari kelvin ke celcius
   * @param {number} tempratur -> tempratur suhu dalam satuan kelvin
   * @returns {number} temp -> tempratur suhu dalam satuan celcius
   */
  kelvinToCelcius(tempratur : number) : number {
    const suhu = tempratur - 273.15
    return Math.round(suhu)
  }

  /**
   * Mengambil data dari server cuaca
   * Menampilkan setiap baris cuaca ke dalam tampilan tabel
   */
  async ambilDataCuaca(){
    
    // menghubungi server cuaca
    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?id=1630789&appid=5e291b18500c40a33299fa6d0d32189b")

    // mengubah balasan dari server menjadi data json
    const data = await response.json()

    // membuat data untuk ditampilkan kedalam tabel
    data.list.forEach((items : any, i : number) => {

      // format data table (waktu, icon, cuaca, suhu)
      const icon = `<img src='https://openweathermap.org/img/wn/${items.weather[0].icon}.png'/>`
      const cuaca = `<b>${items.weather[0].main}</b><br/>${items.weather[0].description}`
      const suhu = `${this.kelvinToCelcius(items.main.temp_min)}°C - ${this.kelvinToCelcius(items.main.temp_max)}°C`

      // mengubah setiap fields data ke dalam baris tabel
      const rows = [items.dt_txt, cuaca, icon, suhu]

      // menampilkan setiap baris data ke dalam bentuk tabel
      this.table.row.add(rows)
    })

    this.table.draw(false)
  }

}
