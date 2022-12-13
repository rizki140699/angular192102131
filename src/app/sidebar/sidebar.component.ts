import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

declare const $ : any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @Input() moduleName : string = "";
  
  constructor(private route : Router) { }

  ngOnInit(): void {
    $('#userName').html(sessionStorage.getItem('userId'));
  }

  /**
   * Handling action for log out button
   */
  logOut() : void {
    sessionStorage.removeItem("userId")

    setTimeout(() => {
      this.route.navigate(['/login'])
    }, 1000)
  }
}
