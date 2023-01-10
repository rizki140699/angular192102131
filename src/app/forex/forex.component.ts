import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';

declare const $ : any;

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {

  table : any

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {

    // mengambil komponen table
    this.table = $('#table-forex').DataTable()

    // mengambil data dari server forex
    this.fetchData()
  }

  /**
   * Mendapatkan data dari server openxchangerate
   */
  async fetchData(){

    // memanggil data
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=3795e1ea244841deb14183d99723324a`)

    // mengubah response request menjadi data json
    const data = await response.json()

    // cek apakah request sukses atau tidak
    if(response.status === 200){

      // jika sukses hitung mata uang X ke idr
      const idr = data.rates.IDR

      Object.keys(data.rates).forEach((items: string, index : number) => {

        // format penomoran mata uang
        const formated_value = formatCurrency(idr / data.rates[items], "en-US", "", items)

        // membuat data untuk datatable
        const data_table = [index + 1, items, formated_value]

        // menggabungkan setiap baris data ke dalam table
        this.table.row.add(data_table)
      })

      this.table.draw(false)

    }
  }

}
