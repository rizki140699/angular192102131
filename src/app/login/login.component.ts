import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
  }

  showAlert(message : string) : void{
    $('#failedModal').modal();
    $('#errorMessage').html(message);
  }

  /**
   * Do authentication using id and password
   * if success redirect to dashboard page
   * if it's not show alert
   */

  signIn() : void {
    
    // get parameter from form
    const email = encodeURIComponent($('#emailForm').val())
    const password = encodeURIComponent($('#passwordForm').val())

    // define url
    const url = `https://stmikpontianak.net/011100862/login.php?id=${email}&password=${password}`

    // send data to server
    this.http.get(url)
    .subscribe((data : any) => {

      // get the first data
      const result = data[0]

      // if result count < 1 show alert and do not redirect to anywhere
      if(result.idCount !== "1"){
        this.showAlert('Id atau password tidak cocok')
      }else{
        // save user info to session storage
        sessionStorage.setItem('userId', email)
  
        // redirect to dashboard
        this.router.navigate(['/dashboard'])
      }
    })
  }

  /**
   * Hiding modal
   */
  hideModal() : void {
    $('#failedModal').modal('hide')
  }

}
