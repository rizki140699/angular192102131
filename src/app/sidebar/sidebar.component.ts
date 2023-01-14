import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';

declare const $ : any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @Input() moduleName : string = "";
  
  constructor(private route : Router, private renderer : Renderer2) { }

  ngOnInit(): void {
    $('#userName').html(sessionStorage.getItem('userId'));
  }

  ngAfterViewInit() : void{
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
  }

  /**
   * Handling action for log out button
   */
  logOut() : void {

    // remove session storage
    sessionStorage.removeItem("userId")

    // wait for 1 second and then redirect to login page
    setTimeout(() => {
      this.route.navigate(['/login'])
    }, 1000)
  }
}
